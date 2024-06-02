import axiosInstance from "./config";
import { getTickerDetails, TickerDetailsParams } from "./tickerDetails";

jest.mock("./config", () => ({
  get: jest.fn(),
}));

const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("getTickerDetails", () => {
  it("should fetch ticker details successfully with default parameters", async () => {
    const mockResponse = {
      data: {
        request_id: "d6fee3ded4d713676fc3fc9fbfea7e30",
        results: {
          ticker: "AAPL",
          name: "Apple Inc.",
          market: "stocks",
          locale: "us",
          primary_exchange: "XNAS",
          type: "CS",
          active: true,
          currency_name: "usd",
          cik: "0000320193",
          composite_figi: "BBG000B9XRY4",
          share_class_figi: "BBG001S5N8V8",
          market_cap: 2947977264500,
          phone_number: "(408) 996-1010",
          address: {
            address1: "ONE APPLE PARK WAY",
            city: "CUPERTINO",
            state: "CA",
            postal_code: "95014",
          },
          description:
            "Apple is among the largest companies in the world, with a broad portfolio of hardware and software products targeted at consumers and businesses. Apple's iPhone makes up a majority of the firm sales, and Apple's other products like Mac, iPad, and Watch are designed around the iPhone as the focal point of an expansive software ecosystem. Apple has progressively worked to add new applications, like streaming video, subscription bundles, and augmented reality. The firm designs its own software and semiconductors while working with subcontractors like Foxconn and TSMC to build its products and chips. Slightly less than half of Apple's sales come directly through its flagship stores, with a majority of sales coming indirectly through partnerships and distribution.",
          sic_code: "3571",
          sic_description: "ELECTRONIC COMPUTERS",
          ticker_root: "AAPL",
          homepage_url: "https://www.apple.com",
          total_employees: 161000,
          list_date: "1980-12-12",
          branding: {
            logo_url:
              "https://api.polygon.io/v1/reference/company-branding/YXBwbGUuY29t/images/2024-06-01_logo.svg",
            icon_url:
              "https://api.polygon.io/v1/reference/company-branding/YXBwbGUuY29t/images/2024-06-01_icon.jpeg",
          },
          share_class_shares_outstanding: 15334080000,
          weighted_shares_outstanding: 15334082000,
          round_lot: 100,
        },
        status: "OK",
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await getTickerDetails("AAPL");

    expect(mockedAxios.get).toHaveBeenCalledWith("/reference/tickers/AAPL", {
      params: {},
    });
    expect(result).toEqual(mockResponse.data);
  });

  it("should fetch ticker details with given parameters", async () => {
    const mockResponse = {
      data: {
        request_id: "d6fee3ded4d713676fc3fc9fbfea7e30",
        results: {
          ticker: "TSLA",
          name: "Tesla Inc.",
          market: "stocks",
          locale: "us",
          primary_exchange: "XNAS",
          type: "CS",
          active: true,
          currency_name: "usd",
          cik: "0001318605",
          composite_figi: "BBG000N9MNX3",
          share_class_figi: "BBG001S5N8V9",
          market_cap: 1000000000000,
          phone_number: "(123) 456-7890",
          address: {
            address1: "3500 Deer Creek Road",
            city: "Palo Alto",
            state: "CA",
            postal_code: "94304",
          },
          description:
            "Tesla, Inc. is an American electric vehicle and clean energy company based in Palo Alto, California. Tesla's current products include electric cars, battery energy storage from home to grid-scale, solar panels and solar roof tiles, as well as other related products and services.",
          sic_code: "3711",
          sic_description: "MOTOR VEHICLES & PASSENGER CAR BODIES",
          ticker_root: "TSLA",
          homepage_url: "https://www.tesla.com",
          total_employees: 70000,
          list_date: "2010-06-29",
          branding: {
            logo_url:
              "https://api.polygon.io/v1/reference/company-branding/YXNsdC5jb20/images/2024-06-01_logo.svg",
            icon_url:
              "https://api.polygon.io/v1/reference/company-branding/YXNsdC5jb20/images/2024-06-01_icon.jpeg",
          },
          share_class_shares_outstanding: 1000000000,
          weighted_shares_outstanding: 1000000200,
          round_lot: 100,
        },
        status: "OK",
      },
    };

    const params: TickerDetailsParams = { date: "2024-01-01" };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await getTickerDetails("TSLA", params);

    expect(mockedAxios.get).toHaveBeenCalledWith("/reference/tickers/TSLA", {
      params,
    });
    expect(result).toEqual(mockResponse.data);
  });

  it("should throw an error when the request fails", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getTickerDetails("AAPL")).rejects.toThrow(errorMessage);
  });
});
