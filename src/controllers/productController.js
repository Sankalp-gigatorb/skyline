
import { upload, imageUploadUtil } from '../helpers/cloudinary.js';
import { Product, ProductImage } from '../models';
// Get all products
export const getAllProducts = async (req, res) => {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: ProductImage,
            as: 'images',
            attributes: ['image_url'],  // Only select the image URL
          },
        ],
      });
  
      res.status(200).json({
        message: "Products retrieved successfully",
        products,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve products" });
    }
  };
  // Get product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
      const product = await Product.findOne({
          where: { id },
          include: [
              {
                  model: ProductImage,
                  as: 'images',
                  attributes: ['image_url'],  // Only select the image URL
              },
          ],
      });

      if (!product) {
          return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
          message: "Product retrieved successfully",
          product,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve product" });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
    
    try {
      const {
        productName,
        category,
        description,
        price,
        stockQuantity,
        warrantyPeriod,
        is_active,
        userId
      } = req.body;
  
      // If an image is uploaded
      let imageUrl = null;
      if (req.file) {
        const cloudinaryResult = await imageUploadUtil(req.file.buffer);
        imageUrl = cloudinaryResult.secure_url;
      }
  
      // Create a new product
      const newProduct = await Product.create({
        productName,
        category,
        description,
        price,
        stockQuantity,
        warrantyPeriod,
        is_active,
        userId
      });
  
      // If image URL is available, create a ProductImage entry
      if (imageUrl) {
        await ProductImage.create({
          productId: newProduct.id,
          image_url: imageUrl
        });
      }
  
      res
        .status(201)
        .json({ message: "Product created successfully", product: newProduct, imageUrl: imageUrl});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create product" });
    }
  };

// Update product by ID
// exports.updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title,
//       category,
//       description,
//       brand,
//       price,
//       salePrice,
//       totalStock,
//       averageReview, } = req.body;

//     const product = await Product.findByPk(id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // If a new image is provided
//     if (req.file) {
//       const cloudinaryResult = await imageUploadUtil(req.file.buffer);
//       product.image = cloudinaryResult.secure_url;
//     }

//     // Update other fields
//     product.title = title || product.title;
//     product.category = category || product.category;
//     product.description = description || product.description;
//     product.brand = brand || product.brand;
//     product.price = price || product.price;
//     product.salePrice = salePrice || product.salePrice;
//     product.totalStock = totalStock || product.totalStock;
//     product.averageReview = averageReview || product.averageReview;


//     await product.save();
//     res.status(200).json({ message: "Product updated successfully", product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to update product" });
//   }
// };
// Update product by ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
      productName,
      category,
      description,
      price,
      stockQuantity,
      warrantyPeriod,
      is_active,
      userId
  } = req.body;

  try {
      // Find the existing product
      const product = await Product.findByPk(id);

      if (!product) {
          return res.status(404).json({ message: "Product not found" });
      }

      // If a new image is uploaded
      let imageUrl = null;
      if (req.file) {
          const cloudinaryResult = await imageUploadUtil(req.file.buffer);
          imageUrl = cloudinaryResult.secure_url;

          // Update or create the associated ProductImage
          const [productImage, created] = await ProductImage.findOrCreate({
              where: { productId: id },
              defaults: { image_url: imageUrl }
          });

          if (!created) {
              // If the image already exists, update it
              productImage.image_url = imageUrl;
              await productImage.save();
          }
      }

      // Update product details
      await product.update({
          productName,
          category,
          description,
          price,
          stockQuantity,
          warrantyPeriod,
          is_active,
          userId
      });

      res.status(200).json({
          message: "Product updated successfully",
          product,
          imageUrl: imageUrl || product.ProductImage?.image_url
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update product" });
  }
};

// Delete product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
      // Find the product
      const product = await Product.findByPk(id);

      if (!product) {
          return res.status(404).json({ message: "Product not found" });
      }

      // Delete associated images
      await ProductImage.destroy({ where: { productId: id } });

      // Delete the product
      await product.destroy();

      res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete product" });
  }
};

