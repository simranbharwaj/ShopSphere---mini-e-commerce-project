import db from "../config/db.js";

export const getProducts = async (
  req,
  res
) => {

  try {

    const [products] = await db.query(
      "SELECT * FROM products"
    );

    res.status(200).json(products);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

export const getCategories = async (
  req,
  res
) => {

  try {

    const [categories] = await db.query(

      `SELECT DISTINCT category
       FROM products`

    );

    res.status(200).json(categories);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

export const getSingleProduct = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const [product] = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    res.json(product[0]);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

export const addProduct = async (
  req,
  res
) => {

  try {

    const {
      name,
      price,
      image,
      category,
      description
    } = req.body;

    await db.query(

      `INSERT INTO products
      (
        name,
        price,
        image,
        category,
        description
      )
      VALUES (?, ?, ?, ?, ?)`,

      [
        name,
        price,
        image,
        category,
        description
      ]

    );

    res.status(201).json({
      message: "Product added successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

export const deleteProduct = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    await db.query(

      "DELETE FROM products WHERE id = ?",

      [id]

    );

    res.json({
      message: "Product deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

export const updateProduct = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const {
      name,
      price,
      image,
      category,
      description
    } = req.body;

    await db.query(

      `UPDATE products
      SET
        name = ?,
        price = ?,
        image = ?,
        category = ?,
        description = ?
      WHERE id = ?`,

      [
        name,
        price,
        image,
        category,
        description,
        id
      ]

    );

    res.json({
      message: "Product updated"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};