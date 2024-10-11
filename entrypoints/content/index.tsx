import "./style.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";


export default defineContentScript({
  matches: ["*://www.linkedin.com/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    console.log("LinkedIn AI Assistant: Content script started");

    // Create a container for our React app
    const container = document.createElement('div');
    container.id = 'linkedin-ai-assistant-root';
    document.body.appendChild(container);

    // Mount our React app
    const root = ReactDOM.createRoot(container);
    root.render(<App />);
  },
});