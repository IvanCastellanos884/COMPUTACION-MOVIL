const mongoose = require('mongoose');

// Definir el esquema para la colección de productos
const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  tallas_disponibles: {
    type: [String],
    required: true,
  },
  colores: {
    type: [String],
    required: true,
  },
  url_imagen: {
    type: String,
    required: true,
  },
  cantidad_en_stock: {
    type: Number,
    required: true,
  },
});

// El nombre de la colección debe coincidir exactamente con el de la base de datos
const Product = mongoose.model('Productos', productSchema);

module.exports = Product;
