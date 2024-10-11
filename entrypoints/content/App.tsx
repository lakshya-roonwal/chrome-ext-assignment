import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import ReactDOM from "react-dom/client";
import { AIIcon, SendIcon, DownArrow, Regenarate } from "./Icons";

interface MessageInputHandler {
  inputElement: HTMLElement;
  iconButton: HTMLButtonElement;
}

const Modal = ({
  onClose,
  onInsert,
}: {
  onClose: () => void;
  onInsert: (text: string) => void;
}) => {
  const [command, setCommand] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  const handleGenerate = () => {
    const dummyResponse =
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
    setGeneratedText(dummyResponse);
  };

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "24px",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          gap: "16px",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        {!generatedText && (
          <>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Enter your command..."
              style={{
                width: "100%",
                minHeight: "60px",
                padding: "16px",
                border: "1px solid #C0C6C7",
                outline: "none",
                outlineWidth: 0,
                borderRadius: "8px",
                fontSize: "18px",
                color: "#666D80",
                resize: "none",
                fontFamily: "sans-serif",
              }}
            />

            <button
              onClick={handleGenerate}
              disabled={command.length === 0}
              style={{
                backgroundColor: command.length === 0? "#94999D":"#3b82f6",
                color: "white",
                borderRadius: "8px",
                fontSize: "24px",
                padding: "12px 24px",
                marginBottom: "1rem",
                border: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <SendIcon />
              Generate
            </button>
          </>
        )}

        {generatedText && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                padding: "16px",
                gap: "4px",
                width: "472px",
                height: "68px",
                background: "#DFE1E7",
                borderRadius: "12px",
                color: "#666D80",
                fontSize: "24px",
                lineHeight: "36px",
              }}
            >
              {command}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "16px",
                  justifySelf: "start",
                  gap: "4px",
                  width: "631px",
                  height: "140px",
                  background: "#DBEAFE",
                  borderRadius: "12px",
                  color: "#666D80",
                  fontSize: "24px",
                  lineHeight: "36px",
                }}
              >
                {generatedText}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                gap: "26px",
              }}
            >
              <input
                type="text"
                placeholder="Your prompt"
                style={{
                  boxSizing: "border-box",
                  width: "100%",
                  height: "61px",
                  background: "#FFFFFF",
                  border: "1px solid #C1C7D0",
                  borderRadius: "8px",
                  padding: "0 16px",
                  fontSize: "24px",
                  color: "#A4ACB9",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  width: "100%",
                  gap: "16px",
                }}
              >
                <button
                  onClick={() => onInsert(generatedText)}
                  style={{
                    width: "129px",
                    height: "53px",
                    border: "2px solid #666D80",
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    background: "transparent",
                    color: "#666D80",
                    fontSize: "24px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  <DownArrow /> Insert
                </button>
                <button
                  style={{
                    width: "212px",
                    height: "53px",
                    background: "#3B82F6",
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    border: "none",
                    color: "#FFFFFF",
                    fontSize: "24px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  <Regenarate /> Regenerate
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

const App: React.FC = () => {
  const [messageInputs, setMessageInputs] = useState<MessageInputHandler[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [activeInput, setActiveInput] = useState<HTMLElement | null>(null);

  const handleMessageInputs = useCallback(() => {
    const inputs = document.querySelectorAll<HTMLElement>(
      ".msg-form__contenteditable"
    );

    inputs.forEach((input) => {
      if (!input.getAttribute("data-ai-assistant")) {
        input.setAttribute("data-ai-assistant", "true");

        const iconButton = document.createElement("button");
        iconButton.style.position = "absolute";
        iconButton.style.right = "12px";
        iconButton.style.bottom = "12px";
        iconButton.style.display = "none";

        const inputContainer = input.parentElement;
        if (inputContainer) {
          inputContainer.style.position = "relative";
          inputContainer.appendChild(iconButton);

          const root = ReactDOM.createRoot(iconButton);
          root.render(<AIIcon />);

          setMessageInputs((prev) => [
            ...prev,
            { inputElement: input, iconButton },
          ]);
        }
      }
    });
  }, []);

  useEffect(() => {
    handleMessageInputs();

    const observer = new MutationObserver(() => {
      handleMessageInputs();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [handleMessageInputs]);

  useEffect(() => {
    messageInputs.forEach(({ inputElement, iconButton }) => {
      const showIcon = () => (iconButton.style.display = "block");
      const hideIcon = (e: FocusEvent) => {
        if (!e.relatedTarget?.closest("button")) {
          iconButton.style.display = "none";
        }
      };
      const handleIconClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveInput(inputElement);
        setShowModal(true);
      };

      inputElement.addEventListener("focus", showIcon);
      inputElement.addEventListener("blur", hideIcon);
      iconButton.addEventListener("click", handleIconClick);

      return () => {
        inputElement.removeEventListener("focus", showIcon);
        inputElement.removeEventListener("blur", hideIcon);
        iconButton.removeEventListener("click", handleIconClick);
      };
    });
  }, [messageInputs]);

  const handleInsert = (text: string) => {
    if (activeInput) {
      activeInput.focus();
      document.execCommand("insertText", false, text);
      setShowModal(false);
      setActiveInput(null);
    }
  };

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} onInsert={handleInsert} />
      )}
    </>
  );
};

export default App;
