import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import "./config/db.js";

import productRoutes from "./routes/productRoutes.js";

import authRoutes from "./routes/authRoutes.js";

import orderRoutes from "./routes/orderRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/index.html")
  );
});

app.get("/cart", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/cart.html")
  );
});

app.get("/product/:id", (req, res) => {

  res.sendFile(
    path.join(__dirname, "../views/product.html")
  );

});

app.get("/register", (req, res) => {

  res.sendFile(
    path.join(__dirname, "../views/register.html")
  );

});

app.get("/login", (req, res) => {

  res.sendFile(
    path.join(__dirname, "../views/login.html")
  );

});

app.get("/checkout", (req, res) => {

  res.sendFile(
    path.join(__dirname, "../views/checkout.html")
  );

});

app.get("/admin", (req, res) => {

  res.sendFile(
    path.join(__dirname, "../views/admin.html")
  );

});

export default app;