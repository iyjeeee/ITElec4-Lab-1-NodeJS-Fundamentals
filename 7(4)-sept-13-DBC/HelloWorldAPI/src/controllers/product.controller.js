// src/controllers/product.controller.js
import * as productService from '../services/product.service.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);
        const product = await productService.getProductById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required.' });
        }
        const newProduct = await productService.createProduct({ name, price });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);
        const { name, price } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required.' });
        }
        const product = await productService.updateProduct(productId, { name, price });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);
        const success = await productService.deleteProduct(productId);
        if (!success) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
