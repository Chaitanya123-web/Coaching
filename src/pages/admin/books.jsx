import { useState, useEffect } from "react";
import api from "../../services/api";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: "", price: "", description: "", stock: "" });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => { fetchBooks(); }, []);

  const fetchBooks = async () => {
    try {
      const data = await api.get("/books");
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      showToast("Failed to load inventory", "error");
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("stock", formData.stock);
    if (image) data.append("image", image);

    try {
      await api.post("/books/add", data);
      showToast("Publication added to repository");
      setFormData({ title: "", price: "", description: "", stock: "" });
      setImage(null);
      setImagePreview(null);
      fetchBooks();
    } catch (err) {
      showToast("Failed to add publication", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/books/delete/${id}`);
      setBooks(books.filter((b) => b._id !== id));
      showToast("Publication removed");
    } catch (err) {
      showToast("Delete failed", "error");
    } finally {
      setDeleteConfirm(null);
    }
  };

  const field = (label, content) => (
    <div style={styles.fieldGroup}>
      <label style={styles.label}>{label}</label>
      {content}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .ab-input { width:100%; padding:0.85rem 1rem; background:#f5f3ee; border:1.5px solid transparent; border-radius:0.75rem; outline:none; font-family:'DM Sans',sans-serif; font-size:0.9rem; color:#1a3a5c; transition:border-color 0.2s, box-shadow 0.2s; }
        .ab-input::placeholder { color:#aab8c4; }
        .ab-input:focus { border-color:#1a3a5c; box-shadow:0 0 0 3px rgba(26,58,92,0.07); background:#fff; }
        .ab-textarea { resize:vertical; min-height:90px; }
        .ab-book-card { background:#fff; border-radius:1rem; border:1px solid rgba(26,58,92,0.07); padding:1.1rem; display:flex; gap:1rem; align-items:flex-start; position:relative; transition:box-shadow 0.25s, transform 0.25s; }
        .ab-book-card:hover { box-shadow:0 8px 28px rgba(26,58,92,0.1); transform:translateY(-2px); }
        .ab-del-btn { position:absolute; top:0.75rem; right:0.75rem; width:30px; height:30px; border-radius:0.5rem; border:none; background:transparent; cursor:pointer; display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity 0.2s, background 0.2s; }
        .ab-book-card:hover .ab-del-btn { opacity:1; }
        .ab-del-btn:hover { background:#fef2f2; }
        .ab-submit-btn { width:100%; padding:1rem; background:#1a3a5c; color:#f5f3ee; border:none; border-radius:0.85rem; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:0.78rem; font-weight:600; letter-spacing:0.15em; text-transform:uppercase; transition:background 0.2s, transform 0.15s, box-shadow 0.2s; box-shadow:0 4px 16px rgba(26,58,92,0.2); }
        .ab-submit-btn:hover:not(:disabled) { background:#2a5a7c; box-shadow:0 6px 20px rgba(26,58,92,0.28); }
        .ab-submit-btn:active:not(:disabled) { transform:scale(0.99); }
        .ab-submit-btn:disabled { opacity:0.65; cursor:not-allowed; }
        .ab-file-input { width:100%; padding:0.75rem 1rem; background:#f5f3ee; border:1.5px dashed #c8d8e4; border-radius:0.75rem; font-family:'DM Sans',sans-serif; font-size:0.85rem; color:#5a7a8a; cursor:pointer; transition:border-color 0.2s; }
        .ab-file-input:hover { border-color:#1a3a5c; }
        .ab-file-input::file-selector-button { margin-right:0.75rem; padding:0.3rem 0.9rem; border-radius:100px; border:none; background:#1a3a5c; color:#f5f3ee; font-size:0.7rem; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; }
        @keyframes slideIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .ab-toast { animation: slideIn 0.25s ease; }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .ab-overlay { animation: fadeIn 0.15s ease; }
      `}</style>

      {/* TOAST */}
      {toast && (
        <div className="ab-toast" style={{
          position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 9999,
          background: toast.type === "error" ? "#fef2f2" : "#f0fdf4",
          border: `1px solid ${toast.type === "error" ? "#fca5a5" : "#86efac"}`,
          color: toast.type === "error" ? "#b91c1c" : "#15803d",
          padding: "0.8rem 1.25rem", borderRadius: "0.75rem",
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 500,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          {toast.type === "error"
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          }
          {toast.message}
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteConfirm && (
        <div className="ab-overlay" onClick={() => setDeleteConfirm(null)} style={{
          position:"fixed", inset:0, background:"rgba(10,25,45,0.45)", backdropFilter:"blur(4px)",
          zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem"
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background:"#fff", borderRadius:"1.25rem", padding:"2rem", maxWidth:"380px", width:"100%",
            boxShadow:"0 20px 60px rgba(10,25,45,0.25)", fontFamily:"'DM Sans',sans-serif"
          }}>
            <div style={{ width:48, height:48, background:"#fef2f2", borderRadius:"0.75rem", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"1rem" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </div>
            <p style={{ fontWeight:700, color:"#1a3a5c", fontSize:"1rem", marginBottom:"0.4rem" }}>Remove Publication?</p>
            <p style={{ color:"#6a8a9a", fontSize:"0.85rem", lineHeight:1.6, marginBottom:"1.5rem" }}>
              This will permanently delete <strong style={{color:"#1a3a5c"}}>{deleteConfirm.title}</strong> from the repository. This action cannot be undone.
            </p>
            <div style={{ display:"flex", gap:"0.75rem" }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ flex:1, padding:"0.75rem", background:"#f5f3ee", border:"none", borderRadius:"0.75rem", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600, color:"#5a7a8a", fontSize:"0.85rem" }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm._id)} style={{ flex:1, padding:"0.75rem", background:"#dc2626", border:"none", borderRadius:"0.75rem", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600, color:"#fff", fontSize:"0.85rem" }}>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* PAGE HEADER */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontSize:"0.65rem", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"#c8a96e", marginBottom:"0.4rem" }}>
            Admin Panel
          </p>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:900, color:"#1a3a5c", margin:0, letterSpacing:"-0.02em" }}>
            Inventory Management
          </h1>
          <p style={{ color:"#7a8a9a", fontSize:"0.85rem", marginTop:"0.35rem" }}>
            {books.length} publication{books.length !== 1 ? "s" : ""} in repository
          </p>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:"2rem" }}>

          {/* ADD BOOK FORM */}
          <div style={{ background:"#fff", borderRadius:"1.25rem", border:"1px solid rgba(26,58,92,0.08)", overflow:"hidden", boxShadow:"0 2px 12px rgba(26,58,92,0.05)" }}>
            {/* Form Header */}
            <div style={{ padding:"1.5rem 2rem", borderBottom:"1px solid rgba(26,58,92,0.07)", display:"flex", alignItems:"center", gap:"0.75rem" }}>
              <div style={{ width:36, height:36, background:"#f0f4f8", borderRadius:"0.6rem", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1a3a5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </div>
              <div>
                <p style={{ fontWeight:700, color:"#1a3a5c", fontSize:"0.95rem", margin:0 }}>Add New Publication</p>
                <p style={{ color:"#9aabb8", fontSize:"0.75rem", margin:0 }}>Fill in the details below to add to repository</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ padding:"1.75rem 2rem" }}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:"1.25rem", marginBottom:"1.25rem" }}>

                {field("Book Title",
                  <input type="text" className="ab-input" placeholder="e.g. UPSC GS Paper I" required
                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                )}

                {field("Price (₹)",
                  <input type="number" className="ab-input" placeholder="0" required min="0"
                    value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                )}

                {field("Stock Units",
                  <input type="number" className="ab-input" placeholder="0" required min="0"
                    value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                )}

                {field("Cover Image",
                  <input type="file" accept="image/*" className="ab-file-input" onChange={handleImageChange} />
                )}
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div style={{ marginBottom:"1.25rem", display:"flex", alignItems:"center", gap:"1rem", padding:"0.85rem 1rem", background:"#f5f3ee", borderRadius:"0.75rem", border:"1px solid rgba(26,58,92,0.08)" }}>
                  <img src={imagePreview} alt="Preview" style={{ width:52, height:62, objectFit:"cover", borderRadius:"0.5rem", border:"1px solid rgba(26,58,92,0.1)" }} />
                  <div>
                    <p style={{ fontWeight:600, color:"#1a3a5c", fontSize:"0.82rem", margin:0 }}>{image?.name}</p>
                    <p style={{ color:"#9aabb8", fontSize:"0.73rem", margin:0 }}>{(image?.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button type="button" onClick={() => { setImage(null); setImagePreview(null); }} style={{ marginLeft:"auto", background:"none", border:"none", cursor:"pointer", color:"#9aabb8", fontSize:"1.1rem", lineHeight:1 }}>×</button>
                </div>
              )}

              {field("Description",
                <textarea className="ab-input ab-textarea" placeholder="Detailed description of the publication, topics covered, target audience..."
                  rows={3} value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})} />
              )}

              <div style={{ marginTop:"1.5rem" }}>
                <button type="submit" className="ab-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation:"spin 0.8s linear infinite" }}>
                        <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
                      </svg>
                      Uploading…
                    </span>
                  ) : "Upload to Repository"}
                </button>
              </div>
            </form>
          </div>

          {/* INVENTORY LIST */}
          <div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1rem" }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.2rem", fontWeight:700, color:"#1a3a5c", margin:0 }}>
                Current Inventory
              </h2>
              {books.length > 0 && (
                <span style={{ background:"#f0f4f8", color:"#3a5a7a", fontSize:"0.7rem", fontWeight:600, padding:"0.3rem 0.8rem", borderRadius:"100px", letterSpacing:"0.08em" }}>
                  {books.length} items
                </span>
              )}
            </div>

            {books.length === 0 ? (
              <div style={{ background:"#fff", borderRadius:"1rem", border:"1px dashed #c8d8e4", padding:"3rem 2rem", textAlign:"center" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c8d8e4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin:"0 auto 0.75rem" }}>
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
                <p style={{ color:"#9aabb8", fontSize:"0.85rem", margin:0 }}>No publications yet. Add one above.</p>
              </div>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:"1rem" }}>
                {books.map((b) => (
                  <div key={b._id} className="ab-book-card">
                    {/* Cover */}
                    <div style={{ width:60, height:72, background:"linear-gradient(145deg,#f0ede4,#e8e4d8)", borderRadius:"0.6rem", overflow:"hidden", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {b.image
                        ? <img src={b.image} alt={b.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                        : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b8c8d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                      }
                    </div>
                    {/* Info */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontWeight:700, color:"#1a3a5c", fontSize:"0.85rem", margin:"0 0 0.3rem", lineHeight:1.3, paddingRight:"1.5rem" }}
                         title={b.title}>
                        {b.title.length > 40 ? b.title.slice(0, 40) + "…" : b.title}
                      </p>
                      <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", marginBottom:"0.5rem" }}>
                        <span style={{ width:6, height:6, borderRadius:"50%", background: b.stock > 5 ? "#4caf86" : b.stock > 0 ? "#f59e0b" : "#ef4444", display:"inline-block" }} />
                        <span style={{ fontSize:"0.68rem", color:"#7a8a9a", fontWeight:500 }}>
                          {b.stock > 0 ? `${b.stock} in stock` : "Out of stock"}
                        </span>
                      </div>
                      <p style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.1rem", fontWeight:700, color:"#1a3a5c", margin:0 }}>
                        ₹{Number(b.price).toLocaleString("en-IN")}
                      </p>
                    </div>
                    {/* Delete */}
                    <button className="ab-del-btn" onClick={() => setDeleteConfirm(b)} title="Remove">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}

const styles = {
  fieldGroup: { display:"flex", flexDirection:"column", gap:"0.45rem" },
  label: { fontSize:"0.65rem", fontWeight:700, color:"#9aabb8", textTransform:"uppercase", letterSpacing:"0.18em", paddingLeft:"0.2rem" },
};