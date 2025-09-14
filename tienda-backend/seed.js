const mongoose = require('mongoose');
const Product = require('./models/Product');

// URL de conexión a tu base de datos MongoDB
const mongoURI = 'mongodb://127.0.0.1:27017/tienda';

// Productos de ejemplo para agregar a la base de datos
const sampleProducts = [
  {
    nombre: 'Chaqueta de Cuero',
    descripcion: 'Chaqueta de cuero genuino, ideal para cualquier clima.',
    precio: 150,
    imagen: 'https://placehold.co/600x400/000000/FFFFFF?text=Chaqueta',
    tallas: ['S', 'M', 'L', 'XL'],
    cantidad_en_stock: 20, // Agregado
    url_imagen: 'https://placehold.co/600x400/000000/FFFFFF?text=Chaqueta' // Agregado
  },
  {
    nombre: 'Jeans Clásicos',
    descripcion: 'Jeans ajustados de color azul, cómodos y versátiles.',
    precio: 75,
    imagen: 'https://placehold.co/600x400/4F46E5/FFFFFF?text=Jeans',
    tallas: ['28', '30', '32', '34'],
    cantidad_en_stock: 50, // Agregado
    url_imagen: 'https://placehold.co/600x400/4F46E5/FFFFFF?text=Jeans' // Agregado
  },
  {
    nombre: 'Sudadera con Capucha',
    descripcion: 'Sudadera de algodón con capucha y bolsillo frontal.',
    precio: 50,
    imagen: 'https://placehold.co/600x400/EF4444/FFFFFF?text=Sudadera',
    tallas: ['S', 'M', 'L'],
    cantidad_en_stock: 35, // Agregado
    url_imagen: 'https://placehold.co/600x400/EF4444/FFFFFF?text=Sudadera' // Agregado
  },
  {
    nombre: 'Camiseta de Manga Larga',
    descripcion: 'Camiseta básica de algodón, ideal para el día a día.',
    precio: 30,
    imagen: 'https://placehold.co/600x400/10B981/FFFFFF?text=Camiseta',
    tallas: ['M', 'L', 'XL'],
    cantidad_en_stock: 100, // Agregado
    url_imagen: 'https://placehold.co/600x400/10B981/FFFFFF?text=Camiseta' // Agregado
  }
];

// Función para conectar a la base de datos y agregar productos
const seedDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conexión a la base de datos exitosa.');

    await Product.deleteMany({});
    console.log('Productos existentes eliminados.');

    await Product.insertMany(sampleProducts);
    console.log('Productos de ejemplo agregados exitosamente.');

    await mongoose.disconnect();
    console.log('Conexión a la base de datos cerrada.');

  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
  }
};

seedDatabase();

