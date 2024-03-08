// src/components/Chatbot.js

import React, { useState } from 'react';


const Chatbot = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleChatbot = () => {
    setCollapsed(!collapsed);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, type: 'user' }]);
      setInputValue('');
      // Simulate bot response (you can replace this with your actual bot logic)
      setTimeout(() => {
        setMessages([...messages, { text: 'Bot response', type: 'bot' }]);
      }, 500);
    }
  };

  return (
    <div
      className={`"fixed bottom-0   right-0 p-4 bg-gray-300 rounded  border-gray-500"`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-bold">Chatbot</span>
        <button onClick={toggleChatbot}>
          {collapsed ? 'Open' : 'Close'}
        </button>
      </div>
      {!collapsed && (
        <>
          <div
            className="border border-gray-500 p-2 mb-2 max-h-40 overflow-y-auto"
            style={{ minHeight: '100px' }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${message.type ==="user"?"text-right":"text-left"} `}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="flex-1 border p-2 text-black"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
