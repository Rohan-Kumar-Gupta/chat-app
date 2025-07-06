import React, { useState } from "react";
import { formatTime } from "../utils/functionUtils";
import { strings } from "../utils/constants";

export default function Message({ message, onDelete }) {
  const isYou = message.user === "You";
  const [showMessageMenu, setShowMessageMenu] = useState(false);

  const toggleMessageMenu = () => {
    setShowMessageMenu((prev) => !prev);
  };
  const handleDeleteMessage = () => {
    onDelete(message.id);
    setShowMessageMenu(false);
  };
  const handleCopyText = () => {
    navigator.clipboard.writeText(message.text)
      .then(() => {
        console.log("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
    setShowMessageMenu(false);
  };

  return (
    <div
      className={`group relative flex ${
        isYou ? "justify-end" : "justify-start"
      } px-2`}
      onMouseLeave={() => setShowMessageMenu(false)}
    >
      <div
        className={`relative flex items-start justify-between px-3 py-2 m-1 rounded-lg max-w-md  ${
          isYou
            ? "bg-[#056162] text-white rounded-br-none"
            : "bg-gray-700 text-white rounded-bl-none"
        }`}
      >
        <div className="flex-1">
          <div className="text-md whitespace-pre-wrap break-words">
            {message.text}
          </div>
          <div className="flex items-center justify-end space-x-1 text-xs text-gray-300 mt-1">
            <span>{formatTime(message.timestamp)}</span>
          </div>
        </div>

        <div className="relative mx-1">
          <button
            onClick={toggleMessageMenu}
            className=" hidden absolute group-hover:block text-gray-300 hover:text-white"
          >
            ⋮
          </button>

          {showMessageMenu && (
            <div className={`absolute right-0 top-6 whitespace-nowrap bg-gray-900 text-white text-sm rounded shadow-lg z-[999] ${!isYou && 'border'}`}>
              <button
                onClick={handleDeleteMessage}
                className="w-full flex text-center px-3 py-2  hover:bg-gray-700 rounded"
              >
                {strings.delete_message}
              </button>
              <button
                onClick={handleCopyText}
                className="w-full flex text-center px-3 py-2  hover:bg-gray-700 rounded"
              >
                {strings.copy_text}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
