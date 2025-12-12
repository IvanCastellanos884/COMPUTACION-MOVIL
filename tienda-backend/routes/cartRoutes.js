const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cart = require('../models/Cart');

// @route   GET /api/carts/:userId
// @desc    Obtener el carrito de un usuario
// @access  Private
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // ✅ Validar que el userId sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    // ✅ Usar el valor validado en la consulta
    const cart = await Cart.findOne({ usuario_id: userId }).exec();

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/carts
// @desc    Crear o actualizar un carrito
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { usuario_id, productos } = req.body;

    // ✅ Validar que el usuario_id sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(usuario_id)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    // ✅ Crear o actualizar el carrito de forma segura
    const cart = await Cart.findOneAndUpdate(
      { usuario_id },
      { $set: { productos } },
      { new: true, upsert: true } // upsert crea si no existe
    ).exec();

    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
