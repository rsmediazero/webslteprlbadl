import axios from 'axios';

const API_BASE_URL = 'https://dbox-token.vercel.app/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API Functions
export const dramaboxAPI = {
  // Get home page dramas
  getHomeDramas: async () => {
    try {
      const response = await api.get('/home');
      return response.data;
    } catch (error) {
      console.error('Error fetching home dramas:', error);
      throw error;
    }
  },

  // Get latest dramas
  getLatestDramas: async (page = 1) => {
    try {
      const response = await api.get(`/latest?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching latest dramas:', error);
      throw error;
    }
  },

  // Get popular dramas
  getPopularDramas: async (page = 1) => {
    try {
      const response = await api.get(`/populer?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching popular dramas:', error);
      throw error;
    }
  },

  // Get ranked dramas
  getRankedDramas: async (ranktype = 1) => {
    try {
      const response = await api.get(`/rankdrama?ranktype=${ranktype}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching ranked dramas:', error);
      throw error;
    }
  },

  // Search dramas
  searchDramas: async (query) => {
    try {
      const response = await api.get(`/search?query=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching dramas:', error);
      throw error;
    }
  },

  // Get streaming data
  getStreamData: async (bookid, episode = 1) => {
    try {
      const response = await api.get(`/stream?bookid=${bookid}&episode=${episode}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stream data:', error);
      throw error;
    }
  }
};

export default api;
