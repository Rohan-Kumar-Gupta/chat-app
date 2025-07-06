import React, { useRef, useEffect } from "react";
import { useChat } from "../context/ChatContext";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { ACTION_TYPES, strings } from "../utils/constants";
import Avatar from "./Avataar";

export default function ChatWindow() {
  const { state, dispatch } = useChat();
  const chat = state.chats.find((c) => c.id === state.selectedChatId);

  const messagesEndRef = useRef(null);

  const handleDeleteMessage = (id) => {
    dispatch({
      type: ACTION_TYPES.DELETE_MESSAGE,
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
      <div className="flex flex-col w-3/4 h-full justify-center  align-center bg-gray-800 text-white p-4 text-md font-semibold">
        <div className="flex items-center justify-center align-center ">
          <img
            src="/chitChatImage.png"
            alt="New Chat"
            height={260}
            width={260}
            className={"rounded-full"}
          />
        </div>
        <div className="flex items-center justify-center align-center text-md">
          {strings.select_a_chat}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col flex-1 h-screen bg-gray-800 text-white">
      <div className="flex items-center align-center border-b border-gray-700">
        <div className="ml-4">
          <Avatar name={chat.name} size={40} />
        </div>
        <div className="p-4 font-bold">{chat.name}</div>
      </div>
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
