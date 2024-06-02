export enum Locale {
    US = "us",
    Global = "global"
}

export enum Market {
    Stocks = "stocks",
    Crypto = "crypto",
    FX = "fx",
    OTC = "otc",
    Indices = "indices"
}

export interface Address {
    address1?: string;
    city?: string;
    state?: string;
    postal_code?: string;
}

export interface Branding {
    logo_url?: string;
    icon_url?: string;
}

export interface Ticker {
    name?: string;
    ticker?: string;
    active?: boolean;
    cik?: string;
    composite_figi?: string;
    currency_name?: string;
    delisted_utc?: string;
    last_updated_utc?: string;
    locale?: Locale;
    market?: Market;
    primary_exchange?: string;
    share_class_figi?: string;
    type?: string;
    market_cap?: number;
    phone_number?: string;
    address?: Address;
    description?: string;
    sic_code?: string;
    sic_description?: string;
    ticker_root?: string;
    homepage_url?: string;
    total_employees?: number;
    list_date?: string;
    branding?: Branding;
    share_class_shares_outstanding?: number;
    weighted_shares_outstanding?: number;
    round_lot?: number;
}
