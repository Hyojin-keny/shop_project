import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxlength: [50, "First name cannot exceed 50 characters"]
  },
  lastname: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    maxlength: [50, "Last name cannot exceed 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
  },
  number: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"]
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
    maxlength: [1000, "Message cannot exceed 1000 characters"]
  },
  status: {
    type: String,
    enum: ["new", "read", "replied", "resolved"],
    default: "new"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  }
});

// Update the updatedAt field before saving
ContactSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better query performance
ContactSchema.index({ email: 1 });
ContactSchema.index({ status: 1 });
ContactSchema.index({ createdAt: -1 });

const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;
