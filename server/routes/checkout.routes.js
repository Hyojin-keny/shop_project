// server/routes/checkout.routes.js
import express from "express";
import checkoutCtrl from "../controllers/checkout.controller.js";
// import authCtrl from "../controllers/auth.controller.js"; // Uncomment when you want to add authentication

const router = express.Router();

// Create a new order (checkout)
router.route("/")
  .post(checkoutCtrl.create);

// Get all orders (admin functionality)
router.route("/orders")
  .get(checkoutCtrl.list);

// Get, update, or delete a specific order
router.route("/orders/:orderId")
  .get(checkoutCtrl.read)
  .put(checkoutCtrl.update)
  .delete(checkoutCtrl.remove);

// Parameter middleware to load order by ID
router.param("orderId", checkoutCtrl.orderByID);

export default router;
