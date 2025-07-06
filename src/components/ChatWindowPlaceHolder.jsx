import { strings } from "../utils/constants";

export default function ChatWindowPlaceHolder() {
  return (
    <div className="flex flex-col w-3/4 h-full justify-center  align-center bg-gray-800 text-white p-4 text-md font-semibold">
      <div className="flex items-center justify-center align-center  ">
        <img
          src="/chitChatImage.png"
          alt="New Chat"
          height={300}
          width={400}
          className={"rounded-full h-[300]"}
        />
      </div>
      <div className="flex items-center justify-center align-center text-md">
        {strings.select_a_chat}
      </div>
    </div>
  );
}
