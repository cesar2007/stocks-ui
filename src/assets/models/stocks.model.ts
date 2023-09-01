
export interface StockData {
    meta:   Meta;
    values: Value[];
    status: string;
}

export interface Meta {
    symbol:            string;
    interval:          string;
    currency:          string;
    exchange_timezone: string;
    exchange:          string;
    mic_code:          string;
    type:              string;
}

export interface Value {
    datetime: string;
    open:     string;
    high:     string;
    low:      string;
    close:    string;
    volume:   string;
}
