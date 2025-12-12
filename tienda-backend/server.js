import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productsRouter from './routes/productRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Habilita CORS para todas las solicitudes
app.use(express.json());

// Conexión a la base de datos con top-level await
const mongoURI = 'mongodb://127.0.0.1:27017/tienda';

try {
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Conexión a la base de datos exitosa');
} catch (err) {
  console.error('Error de conexión a la base de datos:', err);
  process.exit(1); // salir si no conecta
}

// Define tus rutas aquí
app.use('/api/products', productsRouter);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor de la tienda en línea en funcionamiento!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
