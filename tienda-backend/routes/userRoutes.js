const express = require('express');
const router = express.Router();
const User = require('../models/user');

// @route   GET /api/users
// @desc    Obtener todos los usuarios
// @access  Public (solo para fines de prueba, luego cambiar a privado)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/users
// @desc    Crear un nuevo usuario
// @access  Public
router.post('/', async (req, res) => {
  const { nombre_completo, email, contrasena, rol, direccion_envio } = req.body;
  const newUser = new User({
    nombre_completo,
    email,
    contrasena,
    rol,
    direccion_envio
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
