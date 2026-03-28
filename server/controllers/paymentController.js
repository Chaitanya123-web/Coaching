import Razorpay from "razorpay";
import crypto from "crypto";
import Enroll from "../models/enroll.js";
import Course from "../models/course.js";
import Book from "../models/book.js";
import Order from "../models/order.js"; 

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { type, itemId, shippingDetails } = req.body; 

    if (!type || !itemId) {
      return res.status(400).json({ message: "type and itemId are required" });
    }

    let amount;

    if (type === "course") {
      const course = await Course.findById(itemId);
      if (!course) return res.status(404).json({ message: "Course not found" });
      amount = course.price;
    } else if (type === "book") {
      const book = await Book.findById(itemId);
      if (!book) return res.status(404).json({ message: "Book not found" });
      if (book.stock <= 0) return res.status(400).json({ message: "Out of stock" });
      amount = book.price;
    } else {
      return res.status(400).json({ message: "Invalid type" });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `order_${Date.now()}`.substring(0, 40), // Shortened for safety
      notes: {
        type,
        itemId,
        userId: req.user._id.toString(),
      },
    };

    const order = await razorpay.orders.create(options);

    if (type === "book") {
      await Order.create({
        userId: req.user._id,      
        itemId: itemId,              
        orderId: order.id,           
        amount: amount,
        shippingDetails: shippingDetails 
      });
    }

    res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    console.error("Razorpay order creation error:", err);
    res.status(500).json({ message: "Failed to create payment order" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      type,
      itemId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    if (type === "course") {
      const already = await Enroll.findOne({
        user: req.user._id,
        course: itemId,
      });

      if (!already) {
        await Enroll.create({ user: req.user._id, course: itemId });
      }

      return res.json({
        success: true,
        message: "Payment verified. Enrolled successfully!",
        redirect: `/course/${itemId}`,
      });
    }

    if (type === "book") {
      await Order.findOneAndUpdate(
        { orderId: razorpay_order_id }, 
        { status: "paid", paymentId: razorpay_payment_id }
      );

      const book = await Book.findById(itemId);
      if (!book) return res.status(404).json({ success: false, message: "Book not found" });
      
      await Book.findByIdAndUpdate(itemId, { $inc: { stock: -1 } });

      return res.json({
        success: true,
        message: "Payment verified. Order placed!",
        paymentId: razorpay_payment_id,
      });
    }

    res.json({ success: true, message: "Payment verified." });
  } catch (err) {
    console.error("Razorpay verify error:", err);
    res.status(500).json({ success: false, message: "Server error during verification" });
  }
};