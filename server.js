import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import userRoutes from './src/routes/userRoutes.js';

dotenv.config();

const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'));

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Swagger Docs en http://localhost:${PORT}/api-docs`);
});
