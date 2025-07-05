import React, { useState } from "react";

export default function Message({ message, onDelete }) {
  const isYou = message.user === "You";
  const [showMenu, setShowMenu] = useState(false);

  const formatTime = (time) => {
    if (!time) return "";
    const date = new Date(time);
    if (isNaN(date)) return "";
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div
      className={`group relative flex ${
        isYou ? "justify-end" : "justify-start"
      } px-2`}
      onMouseLeave={() => setShowMenu(false)}
    >
      <div
        className={`relative flex items-start justify-between px-3 py-2 m-1 rounded-lg max-w-md  ${
          isYou
            ? "bg-[#056162] text-white rounded-br-none"
            : "bg-gray-700 text-white rounded-bl-none"
        }`}
      >
        {/* Message text & time */}
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
            onClick={() => setShowMenu((prev) => !prev)}
            className=" hidden absolute group-hover:block text-gray-300 hover:text-white"
          >
            ⋮
          </button>

          {showMenu && (
            <div className="absolute right-0 top-6 whitespace-nowrap bg-gray-900 text-white text-sm rounded shadow-lg z-10">
              <button
                onClick={() => onDelete(message.id)}
                className="w-full flex text-left px-3 py-1  hover:bg-gray-700 rounded"
              >
                Delete Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
