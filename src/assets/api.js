const API_KEY = "b3e763ddcf03adece92e2ca5e78b5845";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

async function getWeatherData(resource, searchParams) {
  try {
    const url = new URL(`${BASE_URL}/${resource}`);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("400 series error");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

async function getForecastData(resource, searchParams) {
  try {
    const url = new URL(`${BASE_URL}/${resource}`);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("400 series error");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

export { getWeatherData, getForecastData };
