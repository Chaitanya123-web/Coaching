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
      fetchBooks();
    } catch (err) {
      alert("Error adding book");
    }
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-black text-[#0b2a4a]">Inventory Management 📖</h1>
      
      {/* ADD BOOK FORM */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-xl border border-[#0b2a4a]/5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <input type="text" placeholder="Book Title" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="p-4 bg-[#f8f7eb] rounded-xl outline-none" />
        <input type="number" placeholder="Price (₹)" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="p-4 bg-[#f8f7eb] rounded-xl outline-none" />
        <input type="number" placeholder="Stock Quantity" required value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="p-4 bg-[#f8f7eb] rounded-xl outline-none" />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="p-4 bg-[#f8f7eb] rounded-xl outline-none" />
        <textarea placeholder="Description" className="p-4 bg-[#f8f7eb] rounded-xl outline-none md:col-span-2" rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
        <button type="submit" className="md:col-span-2 bg-[#0b2a4a] text-white py-4 rounded-xl font-bold hover:bg-[#1f4f5a] transition-all">Upload Book</button>
      </form>

      {/* CURRENT INVENTORY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((b) => (
          <div key={b._id} className="bg-white p-4 rounded-2xl shadow border flex gap-4 items-center">
            <img src={b.image} className="w-16 h-16 object-cover rounded-lg" alt="" />
            <div>
              <p className="font-bold text-[#0b2a4a]">{b.title}</p>
              <p className="text-sm text-[#1f4f5a]">₹{b.price} | Stock: {b.stock}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}