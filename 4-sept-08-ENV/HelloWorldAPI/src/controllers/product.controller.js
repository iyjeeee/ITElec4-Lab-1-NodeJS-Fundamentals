// src/controllers/product.controller.js
import * as productService from '../services/product.service.js';

export const getAllProducts = (req, res) => {
    const products = productService.getAllProducts();
    res.status(200).json(products);
};

export const getProductById = (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = productService.getProductById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
};

export const createProduct = (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({ message: 'Name and price are required.' });
    }
    const newProduct = productService.createProduct({ name, price });
    res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({ message: 'Name and price are required.' });
    }
    const product = productService.updateProduct(productId, { name, price });
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
};

export const deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const success = productService.deleteProduct(productId);
    if (!success) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send();
};
