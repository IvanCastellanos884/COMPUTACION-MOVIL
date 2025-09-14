const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  id_producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Productos', // Referencia al modelo 'Productos'
    required: true,
  },
  nombre: String,
  precio_unitario: Number,
  cantidad: Number,
});

// El nombre de la colección debe coincidir exactamente con el de la base de datos
const orderSchema = new mongoose.Schema({
  id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios', // Referencia al modelo 'Usuarios'
    required: true,
  },
  fecha_pedido: {
    type: Date,
    default: Date.now,
  },
  estado_pedido: {
    type: String,
    enum: ['pendiente', 'enviado', 'entregado', 'cancelado'],
    default: 'pendiente',
  },
  total: {
    type: Number,
    required: true,
  },
  items: [orderItemSchema],
});

const Order = mongoose.model('Pedidos', orderSchema);

module.exports = Order;
