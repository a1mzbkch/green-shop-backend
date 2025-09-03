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
 *   description: API для управления продуктами (создание, просмотр, поиск по ID)
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Получить все продукты
 *     description: Возвращает список всех доступных продуктов
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Успешный ответ со списком продуктов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Уникальный идентификатор продукта
 *                     example: "1"
 *                   name:
 *                     type: string
 *                     example: "Яблоко"
 *                   price:
 *                     type: number
 *                     example: 100
 *                   description:
 *                     type: string
 *                     example: "Свежие красные яблоки"
 *                   image:
 *                     type: string
 *                     example: "uploads/apple.jpg"
 */
router.get("/", getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Получить продукт по ID
 *     description: Возвращает подробную информацию о продукте по его уникальному ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Уникальный идентификатор продукта
 *         schema:
 *           type: string
 *           example: "2"
 *     responses:
 *       200:
 *         description: Продукт найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "2"
 *                 name:
 *                   type: string
 *                   example: "Апельсин"
 *                 price:
 *                   type: number
 *                   example: 120
 *                 description:
 *                   type: string
 *                   example: "Сочные апельсины из Турции"
 *                 image:
 *                   type: string
 *                   example: "uploads/orange.jpg"
 *       404:
 *         description: Продукт не найден
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Добавить новый продукт
 *     description: Создает новый продукт с названием, ценой, описанием и изображением
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
 *                 description: Название продукта
 *                 example: "Банан"
 *               price:
 *                 type: number
 *                 description: Цена продукта
 *                 example: 80
 *               description:
 *                 type: string
 *                 description: Описание продукта
 *                 example: "Спелые бананы из Эквадора"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Изображение продукта
 *     responses:
 *       201:
 *         description: Продукт успешно создан
 */
router.post("/", upload.single("image"), createProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Удалить продукт по id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *     tags: [Products]
 *     summary: Удалить все продукты
 *     responses:
 *       200:
 *         description: Все продукты успешно удалены
 */
router.delete("/", deleteAllProducts);

export default router;
