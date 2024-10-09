import "./style.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

export default defineContentScript({
  matches: ["*://www.linkedin.com/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    console.log("LinkedIn AI Assistant: Content script started");

    // Function to handle message input fields
    const handleMessageInputs = () => {
      const messageInputs = document.querySelectorAll('.msg-form__contenteditable');
      
      messageInputs.forEach(input => {
        if (!input.getAttribute('data-ai-assistant')) {
          input.setAttribute('data-ai-assistant', 'true');
          
          // Create icon button
          const iconButton = document.createElement('button');
          iconButton.className = 'ai-assistant-icon hidden';
          iconButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `;
          
          // Add icon next to input
          const inputContainer = input.parentElement;
          if (inputContainer) {
            inputContainer.style.position = 'relative';
            inputContainer.appendChild(iconButton);
          }

          // Show/hide icon based on focus
          input.addEventListener('focus', () => {
            iconButton.classList.remove('hidden');
          });

          input.addEventListener('blur', (e) => {
            // Don't hide if clicking the icon
            if (!e.relatedTarget?.closest('.ai-assistant-icon')) {
              iconButton.classList.add('hidden');
            }
          });

          // Handle icon click
          iconButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showModal(input as HTMLElement);
          });
        }
      });
    };

    // Create and mount modal
    const showModal = (inputField: HTMLElement) => {
      const modalRoot = document.getElementById('ai-assistant-modal-root');
      if (modalRoot) {
        modalRoot.remove();
      }

      const modalContainer = document.createElement('div');
      modalContainer.id = 'ai-assistant-modal-root';
      document.body.appendChild(modalContainer);

      const root = ReactDOM.createRoot(modalContainer);
      root.render(
        <App 
          onClose={() => modalContainer.remove()}
          onInsert={(text) => {
            inputField.focus();
            document.execCommand('insertText', false, text);
            modalContainer.remove();
          }}
        />
      );
    };

    // Set up observer for dynamic content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          handleMessageInputs();
        }
      });
    });

    // Start observing
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial check for inputs
    handleMessageInputs();
  },
});