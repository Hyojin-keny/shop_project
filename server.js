import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";
import authRoutes from "./server/routes/auth.routes.js";

console.log("cwd:", process.cwd());
console.log("MONGODB_URI:", process.env.MONGODB_URI);

mongoose.Promise = global.Promise;

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });

app.use("/", authRoutes); 

app.get("/", (req, res) => {
  res.json({ message: "Welcome to User application." });
});

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});

console.log("MONGODB_URI:", config.mongoUri);

app.get("/hello", (req, res) => {
  res.send("hello");
});