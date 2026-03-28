import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    setLoading(true);
    api.get("/admin/all-orders")
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleShipOrder = async (orderId) => {
    if (!window.confirm("Mark this order as shipped?")) return;
    
    try {
      await api.put(`/admin/order/${orderId}/ship`);
      alert("Order status updated to Shipped!");
      fetchOrders(); 
    } catch (err) {
      alert("Failed to update order status.");
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f3ee' }}>
      <div className="admin-spinner" />
    </div>
  );

  return (
    <div className="admin-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;700&display=swap');
        .admin-root { min-height: 100vh; background: #f5f3ee; padding: 4rem 2rem; font-family: 'DM Sans', sans-serif; }
        .admin-container { max-width: 1200px; margin: 0 auto; }
        .admin-header { margin-bottom: 3rem; border-left: 4px solid #c8a96e; padding-left: 1.5rem; }
        .admin-title { font-family: 'Playfair Display', serif; font-size: 2.8rem; color: #1a3a5c; margin: 0; }
        .admin-subtitle { color: #7a8a9a; margin-top: 0.5rem; font-size: 0.95rem; }
        .order-table-wrapper { background: #fff; border-radius: 1.5rem; overflow: hidden; box-shadow: 0 10px 40px rgba(26,58,92,0.06); border: 1px solid rgba(26,58,92,0.05); }
        .order-table { width: 100%; border-collapse: collapse; text-align: left; }
        .order-table th { background: #1a3a5c; color: #c8a96e; padding: 1.25rem 1.5rem; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.15em; }
        .order-table td { padding: 1.5rem; border-bottom: 1px solid #f0f0f0; vertical-align: top; }
        .customer-info .name { color: #1a3a5c; font-weight: 700; font-size: 1rem; margin-bottom: 0.2rem; }
        .customer-info .phone { color: #c8a96e; font-size: 0.85rem; font-weight: 600; }
        .book-info { font-weight: 600; color: #1a3a5c; font-size: 0.95rem; }
        .address-box { font-size: 0.88rem; color: #5a6a7a; line-height: 1.6; max-width: 300px; }
        .pincode-tag { background: #f5f3ee; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700; color: #1a3a5c; font-size: 0.8rem; }
        .ship-btn { background: #1a3a5c; color: #f5f3ee; border: none; padding: 0.7rem 1.2rem; border-radius: 100px; cursor: pointer; font-weight: 700; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em; transition: all 0.2s; }
        .ship-btn:hover { background: #c8a96e; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(200,169,110,0.3); }
        .admin-spinner { width: 40px; height: 40px; border: 4px solid rgba(26,58,92,0.1); border-top-color: #1a3a5c; border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="admin-container">
        <header className="admin-header">
          <h1 className="admin-title">Order Fulfillment</h1>
          <p className="admin-subtitle">Manage shipping details for physical book publications.</p>
        </header>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', background: '#fff', borderRadius: '1.5rem', color: '#9aabb8' }}>
            <p>No pending shipments found at this time.</p>
          </div>
        ) : (
          <div className="order-table-wrapper">
            <table className="order-table">
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Publication</th>
                  <th>Shipping Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <div className="customer-info">
                        <div className="name">{order.userId?.name || order.shippingDetails?.fullName}</div>
                        <div className="phone">📞 {order.shippingDetails?.phone}</div>
                      </div>
                    </td>
                    <td>
                      <div className="book-info">{order.itemId?.title || "Book Title Missing"}</div>
                      <div style={{ fontSize: '0.75rem', color: '#9aabb8', marginTop: '0.3rem' }}>
                        Order ID: {order.orderId}
                      </div>
                    </td>
                    <td>
                      <div className="address-box">
                        {order.shippingDetails?.addressLine}<br />
                        {order.shippingDetails?.city}, {order.shippingDetails?.state} <br />
                        <span className="pincode-tag">PIN: {order.shippingDetails?.pincode}</span>
                      </div>
                    </td>
                    <td>
                      <button 
                        className="ship-btn"
                        onClick={() => handleShipOrder(order._id)}
                      >
                        Mark as Shipped
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}