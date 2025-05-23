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
    },

    // Create a new CoffretsCadeaux product
    createCoffretCadeau: async (productData) => {
        try {
            const response = await api.post('/api/cadeaux', {
                nom: productData.nom,
                description: productData.description,
                prix: productData.prix,
                image_url: productData.image_url,
                stock: productData.stock,
                categorie: productData.categorie,
                disponible: productData.disponible
            });
            return response.data;
        } catch (error) {
            console.error('Error creating CoffretsCadeaux product:', error);
            throw error;
        }
    },

    // Update an existing CoffretsCadeaux product
    updateCoffretCadeau: async (id, productData) => {
        try {
            const response = await api.put(`/api/cadeaux/${id}`, {
                nom: productData.nom,
                description: productData.description,
                prix: productData.prix,
                image_url: productData.image_url,
                stock: productData.stock,
                categorie: productData.categorie,
                disponible: productData.disponible
            });
            return response.data;
        } catch (error) {
            console.error('Error updating CoffretsCadeaux product:', error);
            throw error;
        }
    },

    // Delete a CoffretsCadeaux product
    deleteCoffretCadeau: async (id) => {
        try {
            const response = await api.delete(`/api/cadeaux/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting CoffretsCadeaux product:', error);
            throw error;
        }
    },

    // Get all CoffretsCadeaux products
    getCoffretsCadeaux: async () => {
        try {
            const response = await api.get('/api/cadeaux');
            return response.data.filter(product => 
                product.categorie === 'CoffretsCadeaux' || 
                (product.nom && product.nom.includes('CoffretsCadeaux'))
            );
        } catch (error) {
            console.error('Error fetching CoffretsCadeaux products:', error);
            throw error;
        }
    },

    // Get all Cadeau products
    getCadeauxProducts: async () => {
        try {
            console.log('Fetching cadeaux products from:', `${API_URL}/cadeaux`);
            const response = await api.get('/cadeaux');  // Changed from /api/cadeaux to /cadeaux
            console.log('Raw API Response:', response);
            
            if (!response.data) {
                throw new Error('No data received from the API');
            }

            const filteredProducts = response.data.filter(product => 
                product.categorie === 'CadeauxAnniversaire' || 
                (product.nom && product.nom.includes('CadeauxAnniversaire'))
            );
            
            console.log('Filtered Products:', filteredProducts);
            return filteredProducts;
        } catch (error) {
            console.error('Detailed API Error:', {
                message: error.message,
                response: error.response,
                status: error.response?.status,
                data: error.response?.data
            });
            throw new Error(`Failed to fetch cadeaux products: ${error.message}`);
        }
    },

    // Get all products from cadeau table
    getCadeauProducts: async () => {
        try {
            const API_ENDPOINT = '/cadeaux';  // Changed from '/cadeau' to '/cadeaux'
            console.log('Attempting to fetch from:', `${API_URL}${API_ENDPOINT}`);
            
            const response = await api.get(API_ENDPOINT);
            console.log('Full API Response:', {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                data: response.data
            });
            
            if (!response.data) {
                throw new Error('No data received from the API');
            }

            if (!Array.isArray(response.data)) {
                console.warn('API response is not an array:', response.data);
                throw new Error('Invalid data format received from API');
            }
            
            return response.data;
        } catch (error) {
            console.error('API Error Details:', {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                config: {
                    url: error.config?.url,
                    method: error.config?.method,
                    headers: error.config?.headers
                }
            });

            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
            } else if (error.request) {
                // The request was made but no response was received
                throw new Error('No response received from server. Please check if the server is running.');
            } else {
                // Something happened in setting up the request that triggered an Error
                throw new Error(`Request Error: ${error.message}`);
            }
        }
    }
};

export default api; 