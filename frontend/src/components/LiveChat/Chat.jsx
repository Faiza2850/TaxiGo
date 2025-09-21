import React, { useState } from "react";
import imgC from "../../assets/img C.svg";
import imgX from "../../assets/img X.svg";
import emoji from "../../assets/emoji.svg";
import imgblock from "../../assets/imgblock.svg";
import sendmsg from "../../assets/sendmsg.svg";
import agentimg from "../../assets/agentimg.svg";
import { ref, push } from "firebase/database"; 
import { database } from "../../firebase"; 
import getMessages from "../getMessages";
function Chat({ onClose , email }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleMessages = React.useCallback((fetchedMessages) => {
    setMessages(fetchedMessages);
  }, []);

  const sanitizedEmail = email.replace(/[.#$[\]]/g, '_');

  React.useEffect(() => {
    getMessages(sanitizedEmail, handleMessages);
  }, [ sanitizedEmail,handleMessages]);
  console.log(messages);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const timeDiff = now - messageTime;

    return timeDiff < 60000
      ? "just now"
      : messageTime.toLocaleTimeString([], { hour: "numeric", minute: "numeric", hour12: true });
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "") return; 

    const messageData = {
      user: "Customer", 
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    // Push the message to the Firebase database
    const messagesRef = ref(database, sanitizedEmail);
    await push(messagesRef, messageData);

    // Clear the input field after sending
    setNewMessage("");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-start">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      
      
      <div className="relative w-[400px] lg:w-[500px] md:w-[400px] h-auto rounded-lg overflow-hidden bg-white shadow-xl m-10">
        
        <div className="w-full h-[185px] bg-div">
          <div className="p-4 flex justify-between">
            <img src={imgC} alt="Chat Logo" />
            <img
              onClick={onClose} 
              src={imgX}
              alt="Close"
              className="cursor-pointer"
            />
          </div>
          <div className="mx-8">
            <h1 className="font-bold text-3xl text-white">Live Chat</h1>
            <p className="text-white my-2">
              Seamless, natural communication and connection.
            </p>
          </div>
        </div>

        
        <div className="bg-[#0D082C] text-white p-4">
          {messages.map((chat, index) => (
            <div
              key={index}
              className={`flex items-start my-2 ${
                chat.user === "Customer" ? "justify-end" : "justify-start"
              }`}
            >
              {chat.user !== "Customer" && (
                <img
                  src={agentimg}
                  alt="Agent"
                  className="w-[40px] h-[40px] rounded-full"
                />
              )}
              <div className="max-w-xs px-4 py-2 rounded-lg">
                {chat.user !== "Customer" && <div className="font-semibold mb-1">Agent</div>}
                <div
                  className={`px-4 py-2 ${
                    chat.user === "Customer" ? "bg-[#3b82f6]" : "bg-[#FFCA09]"
                  } rounded-lg`}
                >
                  {chat.message}
                </div>
                {chat.message !== "..." && (
                  <div className="text-xs text-gray-400 flex">
                    {formatTimestamp(chat.timestamp)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        
        <div className="bg-[#0D082C] border-t p-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 text-[#667085]">
              <img src={emoji} alt="Emoji" />
              <textarea
                placeholder="Reply..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="bg-[#0D082C] text-white p-2 rounded-md resize-none h-[40px] w-full"
              />
            </div>
            <div className="flex gap-4">
              <img src={imgblock} alt="Block" />
              <img
                src={sendmsg}
                alt="Send"
                className="bg-[#FFCA09] h-10 w-10 p-1 rounded-full cursor-pointer"
                onClick={sendMessage} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
