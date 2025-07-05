import React, { useState } from "react";
import { useChat } from "../context/ChatContext";

export default function ChatItem({ chat }) {
  const { state, dispatch } = useChat();
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = () => {
    dispatch({ type: "DELETE_CHAT", id: chat.id });
    setShowMenu(false);
  };

  return (
    <div
      className={`group relative p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-800 ${
        state.selectedChatId === chat.id ? "bg-gray-800" : ""
      }`}
      onClick={() => dispatch({ type: "SELECT_CHAT", id: chat.id })}
      onMouseLeave={() => setShowMenu(false)}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold">{chat.name}</div>
          <div className="text-gray-400 text-sm">
            {chat.messages[chat.messages.length - 1]?.text || "No messages yet"}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu((prev) => !prev);
            }}
            className=" hidden group-hover:block text-gray-400 hover:text-white px-2"
          >
            ⋮
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-700 rounded shadow-lg z-10">
              <button
                onClick={handleDelete}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Delete Chat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
