/**
 * The Indofrench IAS — Learning Platform
 * Designed & Developed by Chaitanya Bishnoi
 */

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Chat from "./pages/chat";
import Course from "./pages/course";
import Video from "./pages/video";
import Forgotpassword from "./pages/forgotpassword";
import Profile from "./pages/profile";
import Methodology from "./pages/methodology";
import Resetpassword from "./pages/resetpassword";
import AdminLayout from "./pages/admin/adminlayout";
import AdminChats from "./pages/admin/chats";
import AdminBatches from "./pages/admin/batches";
import Contact from "./pages/contact";
import AdminContactMessages from "./pages/admin/contactmessages";
import AdminBooks from "./pages/admin/books";
import Shop from "./pages/shop";
import AdminOrders from "./pages/admin/AdminOrders";

export default function App() {
  useEffect(() => {
    const keys = [];
    const handler = (e) => {
      keys.push(e.key.toLowerCase());
      if (keys.slice(-2).join("") === "cb") {
        console.log(
          "%c Built by Chaitanya Bishnoi",
          "color: #c8a96e; font-size: 1.2rem; font-weight: bold; font-family: serif;"
        );
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/resetpassword/:token" element={<Resetpassword />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />

      
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/course/:courseid" element={<Course />} />
          <Route path="/video/:videoid" element={<Video />} />

          <Route path="/admin" element={<AdminLayout />}>

            <Route index element={<AdminBatches />} /> 
            
            <Route path="batches" element={<AdminBatches />} />
            <Route path="chats" element={<AdminChats />} />
            <Route path="contact" element={<AdminContactMessages />} />
            <Route path="books" element={<AdminBooks />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}