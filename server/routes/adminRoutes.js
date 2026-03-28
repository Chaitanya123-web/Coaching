import express from "express";
import Order from "../models/order.js";
const router = express.Router();

router.get("/all-orders", async (req, res) => {
  try {
    const orders = await Order.find({ status: "paid" })
      .populate("userId", "name email") 
      .populate("itemId", "title")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// Route to mark as shipped
router.put("/order/:id/ship", async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { status: "shipped" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
});

export default router;