// controllers/technicianController.js
import { Technician } from "../models";
import { validationResult } from "express-validator";

export const registerTechnician = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    firstName,
    lastName,
    phone,
    email,
    address,
    employmentDate,
    availabilityStatus,
  } = req.body;
  try {
    const existingUser = await Technician.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new technician
    const newTechnician = await Technician.create({
      firstName,
      lastName,
      phone,
      email,
      address,
      employmentDate,
      availabilityStatus,
    });

    return res.status(201).json({
      message: "Technician registered successfully",
      technician: newTechnician,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error registering technician",
      error: error.message,
    });
  }
};

export const getAllTechnicians = async (req, res) => {
  try {
    // Fetch all technicians from the Technicians table
    const technicians = await Technician.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "phone",
        "email",  
      ],
      order: [["createdAt", "DESC"]], // Order by creation date, latest first
    });

    // Respond with success and the list of technicians
    return res.status(200).json({
      message: "List of all technicians",
      data: technicians,
    });
  } catch (error) {
    console.error("Error fetching technicians:", error);
    return res.status(500).json({
      message: "Error fetching technicians",
      error: error.message,
    });
  }
};