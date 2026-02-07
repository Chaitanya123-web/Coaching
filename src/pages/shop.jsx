import { useEffect, useState } from "react";
import api from "../services/api";

export default function Shop() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // API call to fetch public books
    api.get("/books").then((data) => setBooks(Array.isArray(data) ? data : []));
  }, []);

  const handleWhatsAppBuy = (book) => {
    const msg = `Hello! I want to buy "${book.title}" for ₹${book.price}.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#f8f7eb] pt-32 px-6">
      <h1 className="text-4xl font-black text-[#0b2a4a] text-center mb-12">Books & Study Material</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {books.map((book) => (
          <div key={book._id} className="bg-white p-6 rounded-[2rem] shadow-xl border border-[#0b2a4a]/5">
            <img src={book.image} alt={book.title} className="h-48 w-full object-contain mb-4" />
            <h2 className="font-bold text-lg text-[#0b2a4a]">{book.title}</h2>
            <p className="text-xl font-black text-[#1f4f5a] my-3">₹{book.price}</p>
            <button 
              onClick={() => handleWhatsAppBuy(book)}
              className="w-full bg-[#0b2a4a] text-white py-3 rounded-xl font-bold hover:bg-[#1f4f5a] transition-all"
            >
              Buy on WhatsApp
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}