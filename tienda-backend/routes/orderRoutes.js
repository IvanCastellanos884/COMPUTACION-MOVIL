const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// @route   GET /api/orders
// @desc    Obtener todos los pedidos
// @access  Private (solo para el administrador)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/orders
// @desc    Crear un nuevo pedido
// @access  Public
router.post('/', async (req, res) => {
  const { usuario_id, productos, total, estado, metodo_pago } = req.body;
  const newOrder = new Order({
    usuario_id,
    productos,
    total,
    estado,
    metodo_pago
  });

  try {
    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
