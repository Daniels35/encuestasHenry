const express = require('express');
const path = require('path');
const corsMiddleware = require('./src/middleware/corsMiddleware');
const encuestasRoutes = require('./src/controllers/encuestasController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsMiddleware);
app.use(express.json());

// Configurar rutas
app.use('/encuestas', encuestasRoutes); 

// Configurar el servidor estático
app.use(express.static(path.join(__dirname, 'build')));

// Configurar la conexión a la base de datos
const db = require('./src/config/db');

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
