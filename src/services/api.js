import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const productService = {
    getAllProducts: async () => {
        try {
            const response = await api.get('/produits');
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    getProduct: async (id) => {
        try {
            const response = await api.get(`/produits/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    },

    getProductsByCategory: async (category) => {
        try {
            const response = await api.get('/produits');
            const products = response.data;
            return products.filter(product => product.category === category);
        } catch (error) {
            console.error('Error fetching products by category:', error);
            throw error;
        }
    },

    getProductById: async (id) => {
        try {
            const response = await api.get(`/produits/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            throw error;
        }
    }
};

export default api; 