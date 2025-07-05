import React from "react";

export default function Message({ message }) {
  const isYou = message.user === "You";

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
    <div className={`flex ${isYou ? "justify-end" : "justify-start"} px-2`}>
      <div
        className={`relative max-w-xs px-3 py-2 m-1 rounded-lg ${
          isYou
            ? "bg-[#056162] text-white rounded-br-none"
            : "bg-gray-700 text-white rounded-bl-none"
        }`}
      >
        <div className="text-md whitespace-pre-wrap">{message.text}</div>
        <div className="flex items-center justify-end space-x-1 text-xs text-gray-300">
          <span>{formatTime(message.timestamp)}</span>
        </div>
      </div>
    </div>
  );
}
