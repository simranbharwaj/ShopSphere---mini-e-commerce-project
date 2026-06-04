import express from "express";

import {

  getProducts,
  getCategories,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct

} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/categories/all", getCategories);

router.post("/", addProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.get("/:id", getSingleProduct);

export default router;