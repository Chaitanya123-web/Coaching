import { useEffect, useState } from "react";
import api from "../services/api";
import { Modal, Button, TextField, Box, Typography } from "@mui/material";

export default function Shop() {
  const [books, setBooks] = useState([]);
  const [payingId, setPayingId] = useState(null);
  
  // --- New State for Shipping ---
  const [openModal, setOpenModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    addressLine: "",
    city: "",
    state: ""
  });

  useEffect(() => {
    api.get("/books")
      .then(data => setBooks(Array.isArray(data) ? data : []))
      .catch(err => console.error("Failed to load inventory:", err));
  }, []);

  // Step 1: Open Modal instead of Razorpay immediately
  const handleOrderInitiation = (book) => {
    setSelectedBook(book);
    setOpenModal(true);
  };

  // Step 2: Final Payment Trigger
  const handleRazorpay = async () => {
    if (!address.fullName || !address.phone || !address.addressLine) {
      return alert("Please fill in the required shipping details.");
    }

    setOpenModal(false); // Close address modal
    setPayingId(selectedBook._id);

    try {
      const { orderId, amount, currency } = await api.post("/payment/create-order", {
        type: "book",
        itemId: selectedBook._id,
        shippingDetails: address, // Passing address to backend
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "The Indofrench IAS",
        description: `Purchase: ${selectedBook.title}`,
        order_id: orderId,
        handler: async (response) => {
          try {
            const result = await api.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              type: "book",
              itemId: selectedBook._id,
            });
            if (result.success) {
              alert(`✓ Order placed! Payment ID: ${response.razorpay_payment_id}`);
              const updated = await api.get("/books");
              setBooks(Array.isArray(updated) ? updated : []);
            }
          } catch {
            alert("Payment verification failed. Contact support.");
          } finally {
            setPayingId(null);
          }
        },
        prefill: { name: address.fullName, contact: address.phone },
        theme: { color: "#1a3a5c" },
        modal: { ondismiss: () => setPayingId(null) },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => { alert("Payment failed. Please try again."); setPayingId(null); });
      rzp.open();
    } catch (err) {
      console.error("Payment init error:", err);
      alert("Could not initiate payment. Please try again.");
      setPayingId(null);
    }
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 450 },
    bgcolor: 'background.paper',
    borderRadius: '1.5rem',
    boxShadow: 24,
    p: 4,
    fontFamily: "'DM Sans', sans-serif"
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes spin { to { transform:rotate(360deg); } }
        .shop-root { min-height:100vh; background:#f5f3ee; padding-top:5rem; padding-bottom:5rem; font-family:'DM Sans',sans-serif; }
        .shop-inner { max-width:1100px; margin:0 auto; padding:0 1.5rem; }
        .shop-header { text-align:center; margin-bottom:5rem; }
        .shop-eyebrow { display:inline-flex; align-items:center; gap:0.6rem; background:#1a3a5c; color:#c8a96e; font-size:0.62rem; font-weight:600; letter-spacing:0.25em; text-transform:uppercase; padding:0.45rem 1.1rem; border-radius:100px; margin-bottom:1.5rem; }
        .shop-eyebrow::before,.shop-eyebrow::after { content:''; display:block; width:18px; height:1px; background:#c8a96e; opacity:0.6; }
        .shop-title { font-family:'Playfair Display',serif; font-size:clamp(2.6rem,6vw,4.2rem); font-weight:900; color:#1a3a5c; line-height:1.05; letter-spacing:-0.02em; margin:0 0 1rem; }
        .shop-title em { font-style:italic; color:#c8a96e; }
        .shop-subtitle { color:#7a8a9a; font-size:0.9rem; max-width:420px; margin:0 auto; line-height:1.7; }
        .header-rule { width:48px; height:2px; background:linear-gradient(90deg,#c8a96e,transparent); margin:1.5rem auto 0; border-radius:2px; }
        .book-list { display:flex; flex-direction:column; gap:2.5rem; }
        .book-card { background:#fff; border-radius:1.5rem; overflow:hidden; border:1px solid rgba(26,58,92,0.07); box-shadow:0 2px 12px rgba(26,58,92,0.04); display:flex; flex-direction:column; transition:box-shadow 0.35s,transform 0.35s; }
        .book-card:hover { box-shadow:0 8px 32px rgba(26,58,92,0.1); transform:translateY(-3px); }
        @media(min-width:900px){ .book-card { flex-direction:row; min-height:440px; } }
        .book-image-panel { flex-shrink:0; position:relative; background:linear-gradient(145deg,#f0ede4,#e8e4d8); display:flex; align-items:center; justify-content:center; padding:3rem 2.5rem; }
        @media(min-width:900px){ .book-image-panel { width:38%; padding:3.5rem 3rem; } }
        .book-badge { position:absolute; top:1.25rem; left:1.25rem; background:#1a3a5c; color:#c8a96e; font-size:0.58rem; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; padding:0.35rem 0.85rem; border-radius:100px; }
        .book-stock-dot { position:absolute; top:1.25rem; right:1.25rem; display:flex; align-items:center; gap:0.4rem; background:rgba(255,255,255,0.85); backdrop-filter:blur(8px); border:1px solid rgba(26,58,92,0.1); border-radius:100px; padding:0.3rem 0.7rem; font-size:0.62rem; font-weight:600; color:#1a3a5c; }
        .stock-indicator { width:6px; height:6px; border-radius:50%; background:#4caf86; box-shadow:0 0 0 2px rgba(76,175,134,0.25); }
        .book-img { height:280px; width:100%; object-fit:contain; filter:drop-shadow(0 16px 40px rgba(26,58,92,0.2)); transition:transform 0.55s; }
        .book-card:hover .book-img { transform:scale(1.04) translateY(-4px); }
        @media(min-width:900px){ .book-img { height:340px; } }
        .book-content-panel { flex:1; display:flex; flex-direction:column; justify-content:space-between; padding:2.5rem; }
        @media(min-width:900px){ .book-content-panel { padding:3rem 3.5rem; } }
        .book-meta { display:flex; align-items:center; gap:0.5rem; margin-bottom:1rem; }
        .meta-tag { font-size:0.62rem; font-weight:600; letter-spacing:0.15em; text-transform:uppercase; color:#7a8a9a; }
        .meta-dot { width:3px; height:3px; background:#c8a96e; border-radius:50%; }
        .book-title { font-family:'Playfair Display',serif; font-size:clamp(1.6rem,3vw,2.4rem); font-weight:700; color:#1a3a5c; line-height:1.15; letter-spacing:-0.01em; margin:0 0 1.5rem; }
        .book-description { color:#5a6a7a; font-size:0.92rem; line-height:1.8; margin:0 0 2rem; padding-left:1rem; border-left:2px solid #c8a96e; }
        .book-features { display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:2rem; }
        .feature-chip { background:#f5f3ee; border:1px solid rgba(26,58,92,0.08); color:#3a5a7a; font-size:0.68rem; font-weight:500; letter-spacing:0.06em; padding:0.35rem 0.85rem; border-radius:100px; }
        .book-purchase-row { display:flex; flex-direction:column; gap:1.25rem; padding-top:1.75rem; border-top:1px solid rgba(26,58,92,0.07); align-items:flex-start; }
        @media(min-width:600px){ .book-purchase-row { flex-direction:row; align-items:center; justify-content:space-between; } }
        .price-label { font-size:0.62rem; font-weight:600; color:#9aabb8; letter-spacing:0.18em; text-transform:uppercase; margin-bottom:0.2rem; }
        .price-value { font-family:'Playfair Display',serif; font-size:2.4rem; font-weight:900; color:#1a3a5c; line-height:1; letter-spacing:-0.02em; }
        .price-value sup { font-size:1.1rem; font-weight:600; vertical-align:super; margin-right:0.1rem; }
        .buy-btn { display:inline-flex; align-items:center; gap:0.6rem; background:#1a3a5c; color:#f5f3ee; padding:0.95rem 2.2rem; border-radius:100px; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:0.72rem; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; transition:background 0.2s,transform 0.15s,box-shadow 0.2s; box-shadow:0 4px 16px rgba(26,58,92,0.22); white-space:nowrap; width:100%; justify-content:center; }
        @media(min-width:600px){ .buy-btn { width:auto; } }
        .buy-btn:hover:not(:disabled) { background:#2a5a7c; box-shadow:0 8px 28px rgba(26,58,92,0.32); transform:translateY(-1px); }
        .buy-btn:disabled { opacity:0.6; cursor:not-allowed; transform:none; }
        .empty-state { text-align:center; padding:6rem 2rem; color:#9aabb8; }
        .empty-state p { font-size:0.95rem; margin-top:0.75rem; }
      `}</style>

      {/* --- Shipping Address Modal --- */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 2, color: "#1a3a5c", fontWeight: 700 }}>Shipping Details</Typography>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <TextField fullWidth label="Full Name" size="small" variant="outlined" 
              onChange={(e) => setAddress({...address, fullName: e.target.value})} />
            <TextField fullWidth label="Phone Number" size="small" variant="outlined"
              onChange={(e) => setAddress({...address, phone: e.target.value})} />
            <TextField fullWidth label="Complete Address (House No, Street)" size="small" variant="outlined" multiline rows={2}
              onChange={(e) => setAddress({...address, addressLine: e.target.value})} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <TextField label="City" size="small" onChange={(e) => setAddress({...address, city: e.target.value})} />
              <TextField label="Pincode" size="small" onChange={(e) => setAddress({...address, pincode: e.target.value})} />
            </div>
            <Button fullWidth variant="contained" 
              sx={{ bgcolor: "#1a3a5c", borderRadius: "100px", py: 1.5, mt: 1 }}
              onClick={handleRazorpay}>
              Continue to Payment
            </Button>
          </div>
        </Box>
      </Modal>

      <div className="shop-root">
        <div className="shop-inner">
          <div className="shop-header">
            <div className="shop-eyebrow">Official Publications</div>
            <h1 className="shop-title">Academy <em>Repository</em></h1>
            <p className="shop-subtitle">Curated study materials and publications crafted for serious civil services aspirants.</p>
            <div className="header-rule" />
          </div>

          {books.length === 0 ? (
            <div className="empty-state">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin:"0 auto" }}>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <p>No publications available at the moment.</p>
            </div>
          ) : (
            <div className="book-list">
              {books.map((book) => (
                <div key={book._id} className="book-card">
                  <div className="book-image-panel">
                    <span className="book-badge">Premium Edition</span>
                    <span className="book-stock-dot">
                      <span className="stock-indicator" style={{ background: book.stock > 0 ? "#4caf86" : "#ef4444" }} />
                      {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}
                    </span>
                    <img src={book.image} alt={book.title} className="book-img" />
                  </div>
                  <div className="book-content-panel">
                    <div>
                      <div className="book-meta">
                        <span className="meta-tag">Physical Copy</span>
                        <span className="meta-dot" />
                        <span className="meta-tag">Latest Edition</span>
                        <span className="meta-dot" />
                        <span className="meta-tag">Free Shipping</span>
                      </div>
                      <h2 className="book-title">{book.title}</h2>
                      <p className="book-description">{book.description}</p>
                      <div className="book-features">
                        {["UPSC Focused", "Expert Authored", "Exam-Ready Format", "Updated Content"].map(f => (
                          <span key={f} className="feature-chip">{f}</span>
                        ))}
                      </div>
                    </div>
                    <div className="book-purchase-row">
                      <div>
                        <p className="price-label">Total Payable</p>
                        <p className="price-value"><sup>₹</sup>{book.price.toLocaleString("en-IN")}</p>
                      </div>
                      {/* --- Updated onClick to open Modal --- */}
                      <button className="buy-btn" onClick={() => handleOrderInitiation(book)} disabled={payingId === book._id || book.stock === 0}>
                        {payingId === book._id ? (
                          <>
                            <div style={{ width:13, height:13, border:"2px solid rgba(245,243,238,0.35)", borderTopColor:"#f5f3ee", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} />
                            Processing…
                          </>
                        ) : book.stock === 0 ? "Out of Stock" : (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                            </svg>
                            Proceed to Payment
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}