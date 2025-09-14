const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  id_producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Productos', // Referencia al modelo 'Productos'
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema({
  id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios', // Referencia al modelo 'Usuarios'
    required: true,
  },
  items: [cartItemSchema],
});

// El nombre de la colección debe coincidir exactamente con el de la base de datos
const Cart = mongoose.model('Carrito De Compras', cartSchema);

module.exports = Cart;
