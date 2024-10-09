import React, { useState } from 'react';

interface AppProps {
  onClose: () => void;
  onInsert: (text: string) => void;
}

const App: React.FC<AppProps> = ({ onClose, onInsert }) => {
  const [command, setCommand] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleGenerate = () => {
    const dummyResponse = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
    setGeneratedText(dummyResponse);
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">AI Message Assistant</h2>
        
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter your command..."
          className="w-full p-2 border rounded mb-4"
        />
        
        <button
          onClick={handleGenerate}
          className="w-full bg-blue-500 text-white rounded p-2 mb-4"
        >
          Generate
        </button>
        
        {generatedText && (
          <>
            <div className="border p-2 rounded mb-4">
              {generatedText}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => onInsert(generatedText)}
                className="flex-1 bg-green-500 text-white rounded p-2"
              >
                Insert
              </button>
              <button
                className="flex-1 bg-gray-500 text-white rounded p-2"
                disabled
              >
                Regenerate
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;