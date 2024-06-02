import axiosInstance from "./config";

export interface TickersParams {
  ticker?: string;
  type?: string;
  market?: string;
  exchange?: string;
  cusip?: string;
  cik?: string;
  date?: string;
  search?: string;
  active?: boolean;
  order?: string;
  limit?: number;
  sort?: string;
}

export const getTickers = async (params: TickersParams = {}) => {
  try {
    const response = await axiosInstance.get("/reference/tickers", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching tickers:", error);
    throw error;
  }
};
