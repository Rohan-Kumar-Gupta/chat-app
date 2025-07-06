import React, { createContext, useReducer, useContext } from "react";
import { ACTION_TYPES } from "../utils/constants";

const ChatContext = createContext();

const initialState = {
  chats: [],
  selectedChatId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.CREATE_CHAT:
      const newChat = {
        id: Date.now().toString(),
        name: action.name,
        type: action.chatType,
        messages: [],
      };
      return {
        ...state,
        chats: [newChat, ...state.chats],
        selectedChatId: newChat.id,
      };
    case ACTION_TYPES.DELETE_CHAT:
      const filtered = state.chats.filter((c) => c.id !== action.id);
      return {
        ...state,
        chats: filtered,
        selectedChatId:
          state.selectedChatId === action.id ? null : state.selectedChatId,
      };
    case ACTION_TYPES.SELECT_CHAT:
      return { ...state, selectedChatId: action.id };
    case ACTION_TYPES.SEND_MESSAGE:
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.id === state.selectedChatId
            ? {
                ...chat,
                messages: [...chat.messages, action.message],
              }
            : chat
        ),
      };
    case ACTION_TYPES.DELETE_MESSAGE:
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.id === action.payload.chatId
            ? {
                ...chat,
                messages: chat.messages.filter(
                  (msg) => msg.id !== action.payload.messageId
                ),
              }
            : chat
        ),
      };
    default:
      return state;
  }
}

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
