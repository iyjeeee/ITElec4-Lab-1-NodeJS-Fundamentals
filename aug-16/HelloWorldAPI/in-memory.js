import express from 'express';

const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

let products =[
    {"id": 1, "name": "Laptop", "price": 1000},
    {"id": 2, "name": "Smartphone", "price": 500},
    {"id": 3, "name": "Tablet", "price": 300}
];

// endpoint to GET all products
app.get('/products', (req, res) => {
    res.status(200).json(products);
});

// endpoint to GET a product by ID
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const searchProduct = products.find(product => product.id === id);
    console.log(searchProduct);

    if (!searchProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(searchProduct);
});

// endpoint to CREATE a new product (POST METHOD)
app.post('/products', (req, res) => {
    // Find the highest existing ID to generate a new one
    console.log(req.body);


     const newId = Math.max(...products.map(p => p.id)) + 1;

     const newProduct = {
         id: newId,
         name: req.body.name,
         price: req.body.price
    };

     products.push(newProduct);
     res.status(201).json(newProduct);
});

// endpoint to UPDATE a product by ID
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    products[productIndex].name = req.body.name;
    products[productIndex].price = req.body.price;

    res.status(200).json(products[productIndex]);
});

// endpoint to DELETE a product by ID
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    products.splice(productIndex, 1);
    res.status(204).send();
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));