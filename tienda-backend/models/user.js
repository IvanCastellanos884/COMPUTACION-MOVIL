const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Esto asegura que cada email sea único
  },
  contrasena: {
    type: String,
    required: true,
  },
  fecha_registro: {
    type: Date,
    default: Date.now,
  },
  rol: {
    type: String,
    enum: ['cliente', 'administrador'],
    default: 'cliente',
  },
});

// El nombre de la colección debe coincidir exactamente con el de la base de datos
const User = mongoose.model('Usuarios', userSchema);

module.exports = User;
