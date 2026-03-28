import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  orderId: { type: String, required: true },
  paymentId: { type: String }, 
  amount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["pending", "paid", "shipped", "cancelled"], 
    default: "pending" 
  },
  shippingDetails: {
    fullName: String,
    phone: String,
    addressLine: String,
    city: String,
    pincode: String,
    state: String
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);