import express from 'express';
// import { createProduct } from '../controllers/productController';
import * as productController from '../controllers/productController.js';
// import { upload } from '../helpers/cloudinary.js';
import {upload} from '../helpers/cloudinary.js'

const router = express.Router();

//= ===============================
// Admin routes
//= ===============================
// router.get('/allUsers', userController.allUsers);
router.post('/product',upload.single('image'),productController.createProduct)
router.get('/products',productController.getAllProducts)
router.get('/product/:id', productController.getProductById);
router.put('/product/:id',upload.single('image'), productController.updateProduct);
router.delete('/product/:id',productController.deleteProduct);



module.exports = router;
