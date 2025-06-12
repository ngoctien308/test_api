import express from 'express';
import {
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct
} from '../controllers/productController.js';
import { protect } from '../controllers/authController.js';

const router = express.Router();

router.route('/').get(getAllProducts);
router
  .route('/:id')
  .get(protect, getProduct)
  .patch(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;
