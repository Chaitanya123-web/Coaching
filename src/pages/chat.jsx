import Chatbox from "../components/chatbox";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Chat() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/login";
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f7eb] flex items-center justify-center py-20 sm:py-24 px-4 sm:px-6">
      <div className="w-full flex justify-center">
        <Chatbox />
      </div>
    </div>
  );
}