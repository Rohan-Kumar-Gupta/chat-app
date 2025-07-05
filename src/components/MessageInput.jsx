import React, { useState, useRef, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useChat } from "../context/ChatContext";
import { ACTION_TYPES, strings } from "../utils/constants";

export default function MessageInput() {
  const [text, setText] = useState("");
  const { state, dispatch } = useChat();

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.selectedChatId]);

  const handleSend = () => {
    if (!text.trim()) return;
    dispatch({ type: ACTION_TYPES.SEND_MESSAGE, text });
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-gray-700 flex">
      <TextareaAutosize
        minRows={1}
        maxRows={6}
        ref={inputRef}
        className="flex-1 p-2 rounded bg-gray-700 resize-none"
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />

      <div className="flex items-center h-full">
        <button
          onClick={handleSend}
          className="ml-2 bg-green-600 px-4 h-10 rounded "
        >
          {strings.send}
        </button>
      </div>
    </div>
  );
}
