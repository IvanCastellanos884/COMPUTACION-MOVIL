const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa la librería cors

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Habilita CORS para todas las solicitudes
app.use(express.json());

// Conexión a la base de datos
const mongoURI = 'mongodb://127.0.0.1:27017/tienda';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch(err => console.error('Error de conexión a la base de datos:', err));

// Define tus rutas aquí
// CORRECCIÓN: El nombre del archivo de rutas es `productRoutes.js`, no `products.js`
const productsRouter = require('./routes/productRoutes');
app.use('/api/products', productsRouter);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor de la tienda en línea en funcionamiento!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
