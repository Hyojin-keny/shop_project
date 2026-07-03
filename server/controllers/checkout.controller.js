import mongoose from "mongoose";
import Order from "../models/order.model.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  try {
    const { items, total, paymentInfo, shippingInfo, orderDate } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: "Order must contain at least one item"
      });
    }

    if (!paymentInfo || !shippingInfo) {
      return res.status(400).json({
        error: "Payment and shipping information are required"
      });
    }

    // Validate total amount
    if (!total || total <= 0) {
      return res.status(400).json({
        error: "Order total must be greater than 0"
      });
    }

    // Create order data - the structure now matches the frontend exactly
    const orderData = {
      // userId can be added later when authentication is implemented
      // userId: req.user ? req.user._id : null,
      paymentInfo: {
        nameOnCard: paymentInfo.nameOnCard,
        cardNumber: paymentInfo.cardNumber,
        expirationDate: paymentInfo.expirationDate,
        cvv: paymentInfo.cvv,
        method: "visa" // Default, you can determine this from card number later
      },
      shippingInfo: {
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        address: shippingInfo.address,
        phoneNumber: shippingInfo.phoneNumber,
        city: shippingInfo.city,
        province: shippingInfo.province,
        postalCode: shippingInfo.postalCode,
        country: shippingInfo.country || "Canada"
      },
      items: items,
      total: total,
      orderDate: orderDate ? new Date(orderDate) : new Date(),
      status: "pending"
    };

    const order = new Order(orderData);
    const savedOrder = await order.save();

    return res.status(200).json({
      message: "Order successfully created!",
      orderId: savedOrder._id,
      order: savedOrder
    });

  } catch (err) {
    console.error("Order creation error:", err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const list = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const read = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('userId', 'name email');
    
    if (!order) {
      return res.status(404).json({
        error: "Order not found"
      });
    }
    
    res.json(order);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const orderByID = async (req, res, next, id) => {
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        error: "Order not found"
      });
    }
    req.order = order;
    next();
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const update = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!order) {
      return res.status(404).json({
        error: "Order not found"
      });
    }
    
    res.json(order);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const remove = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    
    if (!order) {
      return res.status(404).json({
        error: "Order not found"
      });
    }
    
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

export default {
  create,
  list,
  read,
  update,
  remove,
  orderByID
};
