import React, { useRef, useEffect } from "react";
import { useChat } from "../context/ChatContext";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { strings } from "../utils/constants";

export default function ChatWindow() {
  const { state, dispatch } = useChat();
  const chat = state.chats.find((c) => c.id === state.selectedChatId);

  const messagesEndRef = useRef(null);

  const handleDeleteMessage = (id) => {
    dispatch({
      type: "DELETE_MESSAGE",
      payload: { chatId: chat.id, messageId: id },
    });
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat?.messages]);

  if (!chat)
    return (
      <div className="flex-1 bg-gray-800 text-white p-4">
        {strings.select_a_chat}
      </div>
    );

  return (
    <div className="flex flex-col flex-1 h-screen bg-gray-800 text-white">
      <div className="p-4 border-b border-gray-700 font-bold">{chat.name}</div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chat.messages.map((msg) => (
          <Message
            key={msg.id}
            message={msg}
            onDelete={(id) => handleDeleteMessage(id)}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput />
    </div>
  );
}
