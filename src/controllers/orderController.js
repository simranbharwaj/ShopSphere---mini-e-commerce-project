import db from "../config/db.js";

export const placeOrder = async (
  req,
  res
) => {

  try {

    const {
      user_id,
      customer_name,
      customer_email,
      address,
      total_amount
    } = req.body;

    await db.query(

      `INSERT INTO orders
      (
        user_id,
        customer_name,
        customer_email,
        address,
        total_amount
      )
      VALUES (?, ?, ?, ?, ?)`,

      [
        user_id,
        customer_name,
        customer_email,
        address,
        total_amount
      ]

    );

    res.status(201).json({
      message: "Order placed successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};