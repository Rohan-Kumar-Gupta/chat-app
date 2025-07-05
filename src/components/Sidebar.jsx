import React, { useState, useRef, useEffect } from "react";
import { useChat } from "../context/ChatContext";
import ChatItem from "./ChatItem";
import { ACTION_TYPES, strings } from "../utils/constants";

export default function Sidebar() {
  const { state, dispatch } = useChat();
  const [showNewChatInput, setShowNewChatInput] = useState(false);
  const [chatName, setChatName] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (showNewChatInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showNewChatInput]);

  const handleCreateChat = () => {
    if (!chatName.trim()) return;
    dispatch({ type: ACTION_TYPES.CREATE_CHAT, name: chatName });
    setChatName("");
    setShowNewChatInput(false);
  };

  const toggleNewChatInput = () => {
    setShowNewChatInput((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreateChat();
    }
  };

  return (
    <div className="bg-gray-900 text-white w-1/4 h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{strings.heading}</h1>
          <button
            onClick={toggleNewChatInput}
            className="flex items-center justify-center hover:bg-gray-800 h-14 w-14 rounded-full"
          >
            <img src="/newChat.png" alt="New Chat" className="h-8 w-8 " />
          </button>
        </div>
        {showNewChatInput && (
          <div className="space-y-2 mt-4">
            <input
              ref={inputRef}
              className="w-full p-2 rounded bg-gray-800"
              placeholder="Enter new chat name"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {state.chats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}
