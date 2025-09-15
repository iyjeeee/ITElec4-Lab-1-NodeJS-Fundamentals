// src/services/product.service.js

let products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Smartphone", price: 500 },
    { id: 3, name: "Tablet", price: 300 }
];
let nextId = 4;

export const getAllProducts = () => {
    return products;
};

export const getProductById = (id) => {
    return products.find(p => p.id === id);
};

export const createProduct = (productData) => {
    const newProduct = { id: nextId++, ...productData };
    products.push(newProduct);
    return newProduct;
};

export const updateProduct = (id, productData) => {
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
        return null;
    }
    products[productIndex] = { ...products[productIndex], ...productData };
    return products[productIndex];
};

export const deleteProduct = (id) => {
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
        return false;
    }
    products.splice(productIndex, 1);
    return true;
};
