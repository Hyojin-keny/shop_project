import mongoose from "mongoose";

const PaymentInfoSchema = new mongoose.Schema({
  nameOnCard: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expirationDate: { type: String, required: true }, // Changed from expiry to match frontend
  cvv: { type: String, required: true },
  method: { type: String, enum: ["visa", "mastercard", "amex", "paypal"], default: "visa" }
});

const ShippingInfoSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true }, // Changed from phone to match frontend
  city: { type: String, required: true },
  province: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, default: "Canada" },
  email: { type: String } // Made optional, can be retrieved from user
});

const CartItemSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Changed from productId to match frontend
  name: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 }
});

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Made optional for guest checkout
  paymentInfo: { type: PaymentInfoSchema, required: true },
  shippingInfo: { type: ShippingInfoSchema, required: true },
  items: [CartItemSchema], // Changed from cartItems to match frontend
  total: { type: Number, required: true, min: 0 }, // Changed from totalPrice to match frontend
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "processing", "shipped", "delivered", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
OrderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
