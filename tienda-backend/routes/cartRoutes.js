const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// @route   GET /api/carts/:userId
// @desc    Obtener el carrito de un usuario
// @access  Private
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ usuario_id: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/carts
// @desc    Crear o actualizar un carrito
// @access  Private
router.post('/', async (req, res) => {
  const { usuario_id, productos } = req.body;

  try {
    let cart = await Cart.findOne({ usuario_id });
    if (cart) {
      // Si el carrito existe, lo actualiza
      cart.productos = productos;
      cart = await cart.save();
      res.json(cart);
    } else {
      // Si no existe, crea uno nuevo
      const newCart = new Cart({ usuario_id, productos });
      cart = await newCart.save();
      res.status(201).json(cart);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
