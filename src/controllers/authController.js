import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await db.query(

      `INSERT INTO users
      (name, email, password)
      VALUES (?, ?, ?)`,

      [name, email, hashedPassword]

    );

    res.status(201).json({
      message: "Registration successful"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

export const loginUser = async (
  req,
  res
) => {

  try {

    const {
      email,
      password
    } = req.body;

    const [user] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {

      return res.status(400).json({
        message: "Invalid credentials"
      });

    }

    const validPassword =
      await bcrypt.compare(
        password,
        user[0].password
      );

    if (!validPassword) {

      return res.status(400).json({
        message: "Invalid credentials"
      });

    }

    const token = jwt.sign(

      {
        id: user[0].id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );

    res.status(200).json({

      token,

      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email
      }

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};