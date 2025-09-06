import express from "express";
import multer from "multer";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  deleteAllProducts,
} from "../controllers/productController.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary:
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Успешный ответ со списком продуктов
 */
router.get("/", getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary:
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Продукт найден
 *       404:
 *         description: Продукт не найден
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary:
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               size:
 *                 type: string
 *               category:
 *                 type: string
 *               tags:
 *                 type: string
 *               sku:
 *                 type: string
 *               rating:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Список изображений продукта
 *     responses:
 *       201:
 *         description: Продукт успешно создан
 *       400:
 *         description: Ошибка при создании продукта
 */
router.post("/", upload.array("images", 5), createProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary:
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Продукт успешно удален
 *       404:
 *         description: Продукт не найден
 */
router.delete("/:id", deleteProduct);

/**
 * @swagger
 * /products:
 *   delete:
 *     summary:
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Все продукты успешно удалены
 */
router.delete("/", deleteAllProducts);

export default router;
