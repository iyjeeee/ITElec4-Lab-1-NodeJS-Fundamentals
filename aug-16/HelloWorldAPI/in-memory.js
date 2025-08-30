import express from 'express';
const app = express();
const port = 3000;

let products = [
    {"id": 1, "name": "Laptop", "price": 1000},
    {"id": 2, "name": "Smartphone", "price": 500},
    {"id": 3, "name": "Tablet", "price": 300}
];

// ENDPOINT TO GET ALL PRODUCTS
app.get('/products', (req, res) => {
    res.status(200).json(products);
});

// ENDPOINT TO GET A PRODUCT BY ID
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const searchProduct = products.find(product => product.id === id);
    console.log(searchProduct);

    if (!searchProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(searchProduct);
});



app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));