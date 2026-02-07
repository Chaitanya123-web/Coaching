import { Routes, Route } from "react-router-dom";

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
import AdminBooks from "./pages/admin/books"
import Shop from "./pages/shop";



export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-28">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/course/:courseid" element={<Course />} />
        <Route path="/video/:videoid" element={<Video />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="/resetpassword/:token" element={<Resetpassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />


        {/* ✅ ADMIN SECTION */}
        
        <Route path="/admin" element={<AdminLayout />}>
          {/* default */}
          <Route index element={<AdminBatches />} />

          {/* pages */}
          <Route path="batches" element={<AdminBatches />} />
          <Route path="chats" element={<AdminChats />} />
          <Route path="contact" element={<AdminContactMessages />} />
          <Route path="books" element={<AdminBooks />} />
          

        </Route>
      </Routes>

      </main>

      <Footer />
    </div>
  );
}