import { useEffect, useState } from "react";
import api from "../services/api";

export default function Shop() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await api.get("/books");
        setBooks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load inventory:", err);
      }
    };
    fetchBooks();
  }, []);

  const handleRazorpay = (book) => {
    // Razorpay checkout flow initiation
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", 
      amount: book.price * 100, 
      currency: "INR",
      name: "The Indofrench IAS",
      description: `Purchase: ${book.title}`,
      handler: function (response) {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Student Name",
        email: "student@example.com",
      },
      theme: { color: "#0b2a4a" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-[#f8f7eb] pt-32 pb-20 px-4 sm:px-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-[#0b2a4a] uppercase tracking-tighter italic">
            Academy Repository
          </h1>
          <p className="text-[#6fa6b2] text-[10px] font-black uppercase tracking-[0.4em] mt-4">
            Official Publications & Study Modules
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16">
          {books.map((book) => (
            <div key={book._id} className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl shadow-black/[0.04] border border-[#0b2a4a]/5 flex flex-col lg:flex-row group transition-all duration-500 hover:shadow-black/[0.1]">
              
              {/* EXPANDED IMAGE VIEW */}
              <div className="lg:w-[45%] bg-[#f2f1d5]/40 p-12 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[#0b2a4a]/5 relative overflow-hidden">
                <div className="absolute top-8 left-8">
                    <span className="bg-[#0b2a4a] text-[#f2f1d5] px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-lg">
                        Premium Edition
                    </span>
                </div>
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="h-96 md:h-[500px] w-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
              </div>

              {/* DETAILED INFORMATION SECTION */}
              <div className="lg:w-[55%] p-10 md:p-16 flex flex-col justify-between bg-gradient-to-br from-white to-[#f8f7eb]/20">
                <div>
                  <h2 className="text-3xl md:text-5xl font-black text-[#0b2a4a] uppercase leading-tight tracking-tighter mb-8">
                    {book.title}
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-[#0b2a4a]/80 text-base md:text-lg font-bold leading-relaxed border-l-4 border-[#0b2a4a] pl-6 py-2">
                      {book.description}
                    </p>
                    <div className="flex items-center gap-4 text-[#6fa6b2] text-[10px] font-black uppercase tracking-widest">
                        <span>Physical Copy</span>
                        <span className="w-1.5 h-1.5 bg-[#6fa6b2] rounded-full"></span>
                        <span>Latest Edition</span>
                        <span className="w-1.5 h-1.5 bg-[#6fa6b2] rounded-full"></span>
                        <span>Stock: {book.stock} Units</span>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-10 border-t border-[#0b2a4a]/10 flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] font-black text-[#6fa6b2] uppercase tracking-[0.3em] mb-2">Total Payable Amount</p>
                    <p className="text-5xl font-black text-[#0b2a4a]">₹{book.price}</p>
                  </div>
                  <button 
                    onClick={() => handleRazorpay(book)}
                    className="w-full sm:w-auto bg-[#0b2a4a] text-[#f2f1d5] px-14 py-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.25em] hover:bg-[#1f4f5a] transition-all shadow-2xl shadow-[#0b2a4a]/30 active:scale-95 flex items-center justify-center gap-3"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}