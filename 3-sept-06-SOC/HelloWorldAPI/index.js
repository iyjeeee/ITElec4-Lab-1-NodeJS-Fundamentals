// index.js
import express from 'express';
import productRoutes from './src/routes/product.routes.js';

const app = express();
const port = 3000;

app.use(express.json());

// Mount the product routes
app.use('/products', productRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});