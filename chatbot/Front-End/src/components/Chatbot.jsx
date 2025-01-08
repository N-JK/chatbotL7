import React, { useState } from 'react';
import { FaComments } from 'react-icons/fa';
import ChatApp from './chat';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div>
      <button
        onClick={toggleChat}
        type="button"
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        <FaComments size={24} />
      </button>
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-[60vh] bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex justify-between items-center bg-blue-600 text-white p-3">
            <h2>Ladder7 Chat</h2>
            <button onClick={toggleChat} type="button" className="text-white">X</button>
          </div>
          <div className="h-full overflow-y-auto">
            <ChatApp />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
