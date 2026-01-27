import Chatbox from "../components/chatbox";

export default function Chat() {
  return (
    <div className="min-h-screen bg-[#f8f7eb] flex items-center justify-center py-20 sm:py-24 px-4 sm:px-6">
      <div className="w-full flex justify-center">
        <Chatbox />
      </div>
    </div>
  );
}