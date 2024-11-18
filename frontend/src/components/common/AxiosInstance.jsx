import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: 'http://localhost:5001',  // Your backend server URL
   headers: {
      'Content-Type': 'application/json',
   },
});

export default axiosInstance;
