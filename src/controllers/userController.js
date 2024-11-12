// controllers/userController.js
"use strict";
import { User } from "../models"; // Ensure correct path
import { Role } from "../models"; // Ensure correct path
import { Address } from "../models"; // Ensure correct path
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const JWT_SECRET_KEY = process.env.SECRET;

export const register = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    firstName,
    lastName,
    phone,
    email,
    password,
    roleId,
    addressId,
    street,
    city,
    state,
    postalCode,
    country,
  } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if the provided role exists or create a new one
    let role;
    if (roleId) {
      role = await Role.findByPk(roleId);
      if (!role) {
        return res.status(400).json({ message: "Role not found" });
      }
    } else {
      // If roleId is not provided, create a default role
      role = await Role.create({ role: "user" }); // Default role
    }

    // Check if the provided address exists or create a new one
    let address;
    if (addressId) {
      address = await Address.findByPk(addressId);
      if (!address) {
        return res.status(400).json({ message: "Address not found" });
      }
    } else {
      // If addressId is not provided, create a new address
      address = await Address.create({
        street,
        city,
        state,
        postalCode,
        country,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user and associate with role and address
    const newUser = await User.create({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword, // Save the hashed password
      roleId: role.id, // Associate role with user
      addressId: address.id, // Associate address with user
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, roleId: user.roleId }, // Payload (user data to be encoded in JWT)
      JWT_SECRET_KEY, // Secret key for signing the token
      { expiresIn: "1h", algorithm: "HS256" } // Expiration time for the token
    );

    // Return the token to the client
    return res.status(200).json({
      message: "Login successful",
      token, // Send the token back in the response
      userId: user.id,
      roleId: user.roleId,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    // Fetch the user by ID, including the role and address associations
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "role"], // adjust fields as needed
        },
        {
          model: Address,
          as: "address",
          attributes: ["street", "city", "state", "postalCode", "country"], // adjust fields as needed
        },
      ],
    });

    // Check if user was found
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Respond with user details
    return res.status(200).json({
      message: "User details",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({
      message: "Error fetching user details",
      error: error.message,
    });
  }
};
