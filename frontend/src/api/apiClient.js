import axios from 'axios';


export const API_BASE_URL='http://localhost:9001';
// Create a reusable Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:9001', // Replace with your API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token if it exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Replace 'token' with your token key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if(error?.response?.status == 401){
      console.log("Unauthorized request")
    }
    return Promise.reject(error);
  }
)

export default apiClient;
