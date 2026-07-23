import api from "./api";

export interface WeatherData {
  city: string;
  available: boolean;
  temperature?: number;
  description?: string;
  icon?: string;
  humidity?: number;
  message?: string;
}

export interface ExchangeRates {
  base: string;
  lastUpdate: string;
  rates: { USD?: number; EUR?: number; GBP?: number };
}

export const externalService = {
  async getWeather(city?: string): Promise<WeatherData> {
    const { data } = await api.get<WeatherData>("/external/weather", { params: { city } });
    return data;
  },

  async getExchangeRates(base = "XOF"): Promise<ExchangeRates> {
    const { data } = await api.get<ExchangeRates>("/external/exchange-rates", {
      params: { base },
    });
    return data;
  },
};
