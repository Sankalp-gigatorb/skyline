import express from "express";
import validate from "express-validation";

import  * as userController from "../controllers/userController.js"


const router = express.Router();

// = ===============================
// API routes
// = ===============================


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get("/getUserById/:id", userController.getUserById);





module.exports = router;