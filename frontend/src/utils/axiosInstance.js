// utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://e-commerce-toko-sembako.vercel.app/api', // Sesuaikan dengan URL backend Anda
  withCredentials: true, // Izinkan pengiriman cookie
});

export default axiosInstance;
