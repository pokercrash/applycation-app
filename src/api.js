import axios from "axios";

const API_URL = "https://api.com";

export const registerUser = async (userData) => {
    try {
        return true;
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data; 
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Login User API Request
export const loginUser = async (credentials) => {
    try {
        return true;
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data; 
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};
