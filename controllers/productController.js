import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: Number(req.params.id) });
    if (!product) return res.status(404).json({ message: "Продукт не найден" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndDelete({ id: id });

    if (!product) {
      return res.status(404).json({ message: "Продукт не найден" });
    }

    res.json({ message: "Продукт успешно удален" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: "Все продукты удалены" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const count = await Product.countDocuments();
    const newProduct = await Product.create({
      id: count + 1,
      name,
      price,
      description,
      image: req.file ? req.file.path : null,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
