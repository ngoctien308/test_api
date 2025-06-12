import express from 'express';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// middlewares
app.use(express.json());

// routes
app.use('/users', userRouter);
app.use('/products', productRouter);

app.listen(3000, () => {
  console.log('Server đang chạy tại cổng 3000.');
});
