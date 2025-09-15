// index.js
import express from 'express';
import morgan from 'morgan'; // Import morgan
import productRoutes from './src/routes/product.routes.js';
import config from './src/config/index.js';

const app = express();
// Use the PORT from centralized config
const port = config.port;

// Middlewares
// Environment-specific logging
if (config.nodeEnv === 'development') {
    app.use(morgan(config.morganFormat)); // Use configurable morgan format
}
app.use(express.json());

// Mount the product routes
app.use('/products', productRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});