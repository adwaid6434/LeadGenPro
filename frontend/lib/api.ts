import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const startScrape = async (keyword: str) => {
  const response = await api.post('/start-scrape', { keyword });
  return response.data;
};

export const fetchLeads = async (limit: number = 50) => {
  const response = await api.get(`/leads?limit=${limit}`);
  return response.data;
};
