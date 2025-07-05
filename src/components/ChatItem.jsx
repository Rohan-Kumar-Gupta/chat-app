import React, { useState } from "react";
import { useChat } from "../context/ChatContext";
import { ACTION_TYPES, strings } from "../utils/constants";
import { truncate } from "../utils/functionUtils";

export default function ChatItem({ chat }) {
  const { state, dispatch } = useChat();
  const [showChatMenu, setShowChatMenu] = useState(false);

  const handleSelectChat = () => {
    dispatch({ type: ACTION_TYPES.SELECT_CHAT, id: chat.id });
  };
  const handleDelete = () => {
    dispatch({ type: ACTION_TYPES.DELETE_CHAT, id: chat.id });
    setShowChatMenu(false);
  };
  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowChatMenu((prev) => !prev);
  };

  return (
    <div
      className={`group relative p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-800 ${
        state.selectedChatId === chat.id ? "bg-gray-800" : ""
      }`}
      onClick={handleSelectChat}
      onMouseLeave={() => setShowChatMenu(false)}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-4">
            <img
              src="/profileIcon.jpg"
              alt="New Chat"
              className="h-10 w-10 background-cover rounded-full "
            />
          </div>
          <div>
            <div className="font-semibold">{chat.name}</div>
            <div className="text-gray-400 text-sm">
              {truncate(chat.messages[chat.messages.length - 1]?.text, 25) ||
                strings.no_messages_yet}
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={(e) => toggleMenu(e)}
            className=" hidden group-hover:block text-gray-400 hover:text-white px-2"
          >
            ⋮
          </button>

          {showChatMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-700 rounded shadow-lg z-10">
              <button
                onClick={handleDelete}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                {strings.delete_chat}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
