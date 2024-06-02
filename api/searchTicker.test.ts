import { Ticker } from "@/types/Ticker";
import { getTickers, TickersParams } from "./tickers";
import { searchTicker, SearchTickerParams } from "./searchTicker";

jest.mock("./tickers", () => ({
  getTickers: jest.fn(),
}));

const mockedGetTickers = getTickers as jest.MockedFunction<typeof getTickers>;

describe("searchTicker", () => {
  it("should search tickers successfully with a query", async () => {
    const mockResponse = {
      results: [
        {
          ticker: "SONY",
          name: "Sony Group Corporation American Depositary Shares (Each Representing One Share of Dollar Validated Common Stock)",
          market: "stocks",
          locale: "us",
          primary_exchange: "XNYS",
          type: "ADRC",
          active: true,
          currency_name: "usd",
          cik: "0000313838",
          composite_figi: "BBG000BT7ZK6",
          share_class_figi: "BBG001S5W6H8",
          last_updated_utc: "2024-05-31T00:00:00Z",
        },
        {
          ticker: "SNEJF",
          name: "SONY CORP ORD",
          market: "otc",
          locale: "us",
          type: "OS",
          active: true,
          currency_name: "USD",
          last_updated_utc: "2022-10-26T05:00:43.176Z",
        },
        {
          ticker: "SNE",
          name: "SONY CORP ADR",
          market: "stocks",
          locale: "us",
          primary_exchange: "XNYS",
          type: "CS",
          active: true,
          currency_name: "usd",
          composite_figi: "BBG000BT7ZK6",
          share_class_figi: "BBG001S5W6H8",
          last_updated_utc: "2016-05-18T00:00:00Z",
        },
      ],
      status: "OK",
      request_id: "ece78362538b5b4805bc42558b9f6867",
      count: 3,
    };

    mockedGetTickers.mockResolvedValue(mockResponse);

    const searchParams: SearchTickerParams = { query: "sony" };
    const result = await searchTicker(searchParams);

    const expectedParams: TickersParams = {
      search: "sony",
      ...searchParams,
    };

    expect(mockedGetTickers).toHaveBeenCalledWith(expectedParams);
    expect(result).toEqual(mockResponse.results);
  });

  it("should search tickers with additional parameters", async () => {
    const mockResponse = {
      results: [
        {
          ticker: "SONY",
          name: "Sony Group Corporation American Depositary Shares (Each Representing One Share of Dollar Validated Common Stock)",
          market: "stocks",
          locale: "us",
          primary_exchange: "XNYS",
          type: "ADRC",
          active: true,
          currency_name: "usd",
          cik: "0000313838",
          composite_figi: "BBG000BT7ZK6",
          share_class_figi: "BBG001S5W6H8",
          last_updated_utc: "2024-05-31T00:00:00Z",
        },
      ],
      status: "OK",
      request_id: "ece78362538b5b4805bc42558b9f6867",
      count: 1,
    };

    mockedGetTickers.mockResolvedValue(mockResponse);

    const searchParams: SearchTickerParams = {
      query: "sony",
      market: "stocks",
    };
    const result = await searchTicker(searchParams);

    const expectedParams: TickersParams = {
      search: "sony",
      market: "stocks",
      ...searchParams,
    };

    expect(mockedGetTickers).toHaveBeenCalledWith(expectedParams);
    expect(result).toEqual(mockResponse.results);
  });

  it("should throw an error when the request fails", async () => {
    const errorMessage = "Network Error";
    mockedGetTickers.mockRejectedValue(new Error(errorMessage));

    const searchParams: SearchTickerParams = { query: "sony" };

    await expect(searchTicker(searchParams)).rejects.toThrow(errorMessage);
  });
});
