import { useState, useEffect } from "react";
import api from "../../services/api";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: "", price: "", description: "", stock: "" });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const data = await api.get("/books");
    setBooks(Array.isArray(data) ? data : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("stock", formData.stock);
    if (image) data.append("image", image);

    try {
      await api.post("/books/add", data);
      alert("Book Added Successfully!");
      setFormData({ title: "", price: "", description: "", stock: "" });
      setImage(null);
      fetchBooks();
    } catch (err) {
      alert("Error adding book");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this book from the inventory?")) {
      try {
        await api.delete(`/books/delete/${id}`);
        setBooks(books.filter((b) => b._id !== id));
      } catch (err) {
        alert("Delete failed. Please try again.");
      }
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-[#0b2a4a] uppercase tracking-tight">Inventory Management</h1>
      </div>
      
      {/* ADD BOOK FORM */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-xl border border-[#0b2a4a]/5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-[#6fa6b2] uppercase ml-2 tracking-widest">Book Title</label>
          <input type="text" placeholder="e.g. UPSC GS Module" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-4 bg-[#f8f7eb] rounded-xl outline-none border border-transparent focus:border-[#0b2a4a] transition-all" />
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] font-black text-[#6fa6b2] uppercase ml-2 tracking-widest">Price (₹)</label>
          <input type="number" placeholder="0" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full p-4 bg-[#f8f7eb] rounded-xl outline-none border border-transparent focus:border-[#0b2a4a] transition-all" />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-[#6fa6b2] uppercase ml-2 tracking-widest">Stock Units</label>
          <input type="number" placeholder="0" required value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full p-4 bg-[#f8f7eb] rounded-xl outline-none border border-transparent focus:border-[#0b2a4a] transition-all" />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-[#6fa6b2] uppercase ml-2 tracking-widest">Cover Image</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full p-4 bg-[#f8f7eb] rounded-xl outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-[#0b2a4a] file:text-white" />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-black text-[#6fa6b2] uppercase ml-2 tracking-widest">Description</label>
          <textarea placeholder="Provide detailed book information..." className="w-full p-4 bg-[#f8f7eb] rounded-xl outline-none border border-transparent focus:border-[#0b2a4a] transition-all resize-none" rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
        </div>

        <button type="submit" className="md:col-span-2 bg-[#0b2a4a] text-[#f2f1d5] py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-[#1f4f5a] transition-all shadow-lg active:scale-95">
          Upload to Repository
        </button>
      </form>

      {/* CURRENT INVENTORY LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((b) => (
          <div key={b._id} className="bg-white p-6 rounded-[2rem] shadow-md border border-[#0b2a4a]/5 flex gap-4 items-center group relative hover:shadow-xl transition-all">
            <img src={b.image} className="w-20 h-24 object-contain rounded-lg bg-[#f8f7eb] p-2" alt={b.title} />
            <div className="flex-1">
              <p className="font-black text-[#0b2a4a] uppercase text-sm leading-tight mb-1">{b.title}</p>
              <p className="text-[10px] font-black text-[#6fa6b2] uppercase tracking-widest mb-2">Stock: {b.stock} Units</p>
              <p className="text-lg font-black text-[#1f4f5a]">₹{b.price}</p>
            </div>
            
            {/* DELETE BUTTON */}
            <button 
              onClick={() => handleDelete(b._id)}
              className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-red-50 rounded-lg"
              title="Delete Book"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}