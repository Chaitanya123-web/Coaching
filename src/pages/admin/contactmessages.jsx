import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminContactMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api.get("/contact/admin").then((data) => {
      setMessages(Array.isArray(data) ? data : []);
    });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-black mb-8">
        Contact Messages 📩
      </h1>

      {messages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m._id}
              className="bg-white p-6 rounded-2xl shadow border"
            >
              <p className="font-bold">{m.name}</p>
              <p className="text-sm text-gray-500">{m.email}</p>
              <p className="mt-3">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}