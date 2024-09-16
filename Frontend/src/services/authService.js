import axios from 'axios';

// Define the API URL directly
const API_URL_LOGIN = 'http://localhost:5000/api/auth/login';

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(API_URL_LOGIN, { email, password });

        // Check if the response data contains a token
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);  // Store the token in localStorage
            return { success: true, token: response.data.token, role: response.data.role };  // Include role in the return statement
        } else {
            // Handle cases where the response doesn't contain the expected data
            return { success: false, message: response.data.message || 'Invalid credentials' };
        }
    } catch (error) {
        console.error('Login error:', error);

        // Handle server error or network error
        let errorMessage = 'An error occurred during login';

        // Check if error response exists
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }

        return { success: false, message: errorMessage };
    }
};
