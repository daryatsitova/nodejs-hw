import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRouter from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;


// Глобальні middleware
app.use(logger);
app.use(cors());
app.use(express.json());

// // Корневой маршрут
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Server is running!' });
// });


app.use(authRoutes);
app.use(notesRouter);

// 404 — якщо маршрут не знайдено
app.use(notFoundHandler);

app.use(errors());

// Error — якщо під час запиту виникла помилка
app.use(errorHandler);




await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


