const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Importa el modelo de Producto

// @route   GET /api/products
// @desc    Obtener todos los productos
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/products/:id
// @desc    Obtener un producto por su ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/products
// @desc    Crear un nuevo producto
// @access  Public (se podría cambiar a 'private' para el administrador)
router.post('/', async (req, res) => {
  const { nombre, descripcion, precio, tallas_disponibles, colores, url_imagen, cantidad_en_stock } = req.body;
  const newProduct = new Product({
    nombre,
    descripcion,
    precio,
    tallas_disponibles,
    colores,
    url_imagen,
    cantidad_en_stock
  });

  try {
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
