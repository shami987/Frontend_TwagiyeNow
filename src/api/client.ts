import axios from 'axios';
import { Platform } from 'react-native';

const BASE_URL = Platform.OS === 'web'
  ? 'http://localhost:5000/api'
  : process.env.EXPO_PUBLIC_API_BASE_URL || 'http://10.250.211.167:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default api;
