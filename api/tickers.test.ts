import axiosInstance from './config';
import { getTickers, TickersParams } from './tickers';

jest.mock('./config', () => ({
  get: jest.fn(),
}));

const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe('getTickers', () => {
  it('should fetch tickers successfully with default parameters', async () => {
    const mockResponse = {
      data: {
        results: [
          {
            ticker: "A",
            name: "Agilent Technologies Inc.",
            market: "stocks",
            locale: "us",
            primary_exchange: "XNYS",
            type: "CS",
            active: true,
            currency_name: "usd",
            cik: "0001090872",
            composite_figi: "BBG000C2V3D6",
            share_class_figi: "BBG001SCTQY4",
            last_updated_utc: "2024-05-17T00:00:00Z"
          },
          {
            ticker: "AA",
            name: "Alcoa Corporation",
            market: "stocks",
            locale: "us",
            primary_exchange: "XNYS",
            type: "CS",
            active: true,
            currency_name: "usd",
            cik: "0001675149",
            composite_figi: "BBG00B3T3HD3",
            share_class_figi: "BBG00B3T3HF1",
            last_updated_utc: "2024-05-31T00:00:00Z"
          }
        ],
        status: "OK",
        request_id: "2960107cb49ed8b80990784bf7e1d297",
        count: 2,
        next_url: "https://api.polygon.io/v3/reference/tickers?cursor=..."
      }
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await getTickers();

    expect(mockedAxios.get).toHaveBeenCalledWith('/reference/tickers', { params: {} });
    expect(result).toEqual(mockResponse.data);
  });

  it('should fetch tickers with given parameters', async () => {
    const mockResponse = {
      data: {
        results: [
          {
            ticker: "AAA",
            name: "Alternative Access First Priority CLO Bond ETF",
            market: "stocks",
            locale: "us",
            primary_exchange: "ARCX",
            type: "ETF",
            active: true,
            currency_name: "usd",
            cik: "0001776878",
            composite_figi: "BBG01B0JRCS6",
            share_class_figi: "BBG01B0JRCT5",
            last_updated_utc: "2024-05-31T00:00:00Z"
          },
          {
            ticker: "AAAIF",
            name: "ALTERNATIVE INVSTMENT TR",
            market: "otc",
            locale: "us",
            type: "FUND",
            active: true,
            currency_name: "USD",
            last_updated_utc: "2022-08-26T05:00:07.114Z"
          }
        ],
        status: "OK",
        request_id: "2960107cb49ed8b80990784bf7e1d297",
        count: 2,
        next_url: "https://api.polygon.io/v3/reference/tickers?cursor=..."
      }
    };

    const params: TickersParams = { market: 'otc' };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await getTickers(params);

    expect(mockedAxios.get).toHaveBeenCalledWith('/reference/tickers', { params });
    expect(result).toEqual(mockResponse.data);
  });

  it('should throw an error when the request fails', async () => {
    const errorMessage = 'Network Error';
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getTickers()).rejects.toThrow(errorMessage);
  });
});
