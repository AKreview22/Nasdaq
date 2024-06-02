import axiosInstance from './config';

export interface TickerDetailsParams {
    date?: string; 
  }

  
  export const getTickerDetails = async (ticker: string, params: TickerDetailsParams = {}) => {
    try {
      const response = await axiosInstance.get(`/reference/tickers/${ticker.toUpperCase()}`, { params });
      return response.data;  
    } catch (error) {
      console.error('Error fetching ticker details:', error); 
      throw error;  
    }
  };