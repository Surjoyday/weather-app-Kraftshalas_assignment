import { getForecastData, getWeatherData } from "./assets/api";
import { formatForecastData, formatWeatherData } from "./assets/helper";
import { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import TempAndDetails from "./components/TempAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import Forecast from "./components/Forecast";
import ActionFields from "./components/ActionFields";
import Loader from "./components/Loader";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState({});
  const [searchedQuerry, setSerachedQuerry] = useState({ q: "guwahati" });
  const [units, setUnits] = useState({ units: "metric" });
  const [isLoading, setIsLoading] = useState(false);

  // console.log(weatherData);
  function handleSearch(input) {
    setSerachedQuerry({ q: input.toLowerCase() });
  }

  function handleUnits(value) {
    setUnits({ units: value });
  }

  function handleGeoLoaction() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((success) => {
        const { latitude, longitude } = success?.coords;
        setSerachedQuerry({ lat: latitude, lon: longitude });
      });
    }
  }

  function handleBgColor() {
    if (Object.keys(weatherData).length === 0) {
      return "bg-black";
    }

    const threshold = units.units === "metric" ? 20 : 60;
    // console.log(weatherData?.temp);
    // console.log(+weatherData?.temp <= threshold);
    if (weatherData?.temp <= threshold) return "bg-sky-700";

    return "bg-orange-600";
  }

  useEffect(
    function () {
      setIsLoading(true);
      async function fetchWeatherData(searchParams) {
        try {
          const dataOfWeather = await getWeatherData("weather", {
            ...searchedQuerry,
            ...units,
          });
          setWeatherData(formatWeatherData(dataOfWeather));

          const dataOfForecast = await getForecastData("forecast", {
            lat: formatWeatherData(dataOfWeather)?.lat,
            lon: formatWeatherData(dataOfWeather)?.lon,
            ...units,
          });

          setForecastData(
            formatForecastData(
              formatWeatherData(dataOfWeather)?.dt,
              formatWeatherData(dataOfWeather)?.timezone,
              dataOfForecast?.list
            )
          );
        } catch (error) {
          console.error("Failed to fetch data:", error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchWeatherData();
    },
    [searchedQuerry, units]
  );

  if (isLoading) return <Loader bgColor={"bg-black"} />;

  return (
    <div className="flex flex-col justify-center items-center py-7 ">
      <div
        className={`w-8/12 ${
          Object.keys(weatherData).length === 0 ? "h-screen" : ""
        } max-sm:w-full max-sm:p-2`}
      >
        <TopBar onSearch={handleSearch} />
        <div
          className={`py-6 mt-2 ${handleBgColor()}  bg-opacity-50 rounded-md text-white`}
        >
          <ActionFields
            onSearch={handleSearch}
            onHandleUnits={handleUnits}
            onLocationClick={handleGeoLoaction}
          />
          {Object.keys(weatherData).length !== 0 && (
            <>
              <TimeAndLocation weatherData={weatherData} />

              <TempAndDetails weatherData={weatherData} units={units.units} />
            </>
          )}
          {Object.keys(forecastData).length !== 0 && (
            <>
              <Forecast
                title={"3 hour step forecast"}
                forecastData={forecastData.hourlyData}
              />
              <Forecast
                title={"Daily forecast"}
                forecastData={forecastData.dailyData}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
