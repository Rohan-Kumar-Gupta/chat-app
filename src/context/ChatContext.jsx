import React, { createContext, useReducer, useContext } from "react";

const ChatContext = createContext();

const initialState = {
  chats: [],
  selectedChatId: "1",
};

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_CHAT":
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
    case "DELETE_CHAT":
      const filtered = state.chats.filter((c) => c.id !== action.id);
      return {
        ...state,
        chats: filtered,
        selectedChatId:
          state.selectedChatId === action.id ? null : state.selectedChatId,
      };
    case "SELECT_CHAT":
      return { ...state, selectedChatId: action.id };
    case "SEND_MESSAGE":
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.id === state.selectedChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: Date.now().toString(),
                    user: "You",
                    text: action.text,
                    timestamp: new Date().toISOString(),
                  },
                ],
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
