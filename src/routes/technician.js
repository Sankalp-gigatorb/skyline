import express from "express";
import validate from "express-validation";

import * as technicianController from "../controllers/technicianController";
import { authenticateToken } from "../middleware/apiAuth"; 

const router = express.Router();

// = ===============================
// API routes
// = ===============================

router.post("/technicianRegister", technicianController.registerTechnician);
router.get("/getAllRegister", technicianController.getAllTechnicians);


module.exports = router;
