// index.js
import express from 'express';
import postRoutes from './src/routes/post.routes.js';
import userRoutes from './src/routes/user.routes.js';
import { testConnection } from './src/config/db.js';
import { errorHandler } from './src/middlewares/errorHandler.middleware.js';

const app = express();
const port = 3000;

app.use(express.json());

// Mount the post routes
app.use('/api/posts', postRoutes);

// Mount the user routes
app.use('/api/users', userRoutes);

// CENTRAL ERROR HANDLER MIDDLEWARE
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    testConnection(); // Test the database connection on startup
});