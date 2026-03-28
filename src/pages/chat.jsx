import Chatbox from "../components/chatbox";
import { useEffect } from "react";

export default function Chat() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/login";
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #f5f3ee 0%, #eceae0 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "5rem 1rem 2rem",
    }}>
      <Chatbox />
    </div>
  );
}