import axios from 'axios';
import { Platform } from 'react-native';

const BASE_URL = Platform.OS === 'web'
  ? 'http://localhost:5000/api'
  : 'http://192.168.1.66:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default api;
