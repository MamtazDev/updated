import React, { useEffect, useState } from "react";

const Chatting = ({ setShow }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      const userMessage = { text: inputText, from: "user" };
      setMessages([...messages, userMessage]);
      setInputText("");
    }
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].from === "user") {
      // Simulate bot response after a brief delay
      setTimeout(() => {
        const botResponse = {
          text: "Hello, I'm a bot. How can I assist you?",
          from: "bot",
        };
        setMessages([...messages, botResponse]);
      }, 1000);
    }
  }, [messages]);

  return (
    <div className="chatting shadow">
      <h4 onClick={() => setShow(false)} className="shadow-sm cursor-pointer">
        Message Us
      </h4>
      <div className="chatting_body">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.from} `}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatting_footer">
        <input
          className="w-100 border-0 bg-transparent p-3 border-top border-black"
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Send a message"
        />
        <div className="d-flex justify-content-between p-3">
          <button className="border-0 bg-transparent">
            <i className="fa-solid fa-image text-secondary"></i>
          </button>
          <button
            onClick={handleSendMessage}
            className="border-0 bg-transparent"
          >
            <i className="fa-solid fa-paper-plane text-secondary"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatting;
