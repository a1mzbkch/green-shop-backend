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
 *   description: API для управления продуктами (создание, просмотр, поиск по ID, удаление)
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Получить все продукты
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
 *     summary: Получить продукт по ID
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
 *     summary: Добавить новый продукт
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
 *                 example: "Банан"
 *               price:
 *                 type: number
 *                 example: 80
 *               description:
 *                 type: string
 *                 example: "Спелые бананы из Эквадора"
 *               size:
 *                 type: string
 *                 example: "M"
 *               category:
 *                 type: string
 *                 example: "Fruits"
 *               tags:
 *                 type: string
 *                 example: "organic,sweet,yellow"
 *               sku:
 *                 type: string
 *                 example: "BAN-001"
 *               rating:
 *                 type: number
 *                 example: 4.5
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
 *     summary: Удалить продукт по ID
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
 *     summary: Удалить все продукты
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Все продукты успешно удалены
 */
router.delete("/", deleteAllProducts);

export default router;
