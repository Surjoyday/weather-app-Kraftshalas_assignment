import { getForecastData, getWeatherData } from "./assets/api";
import { formatForecastData, formatWeatherData } from "./assets/helper";
import { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import TempAndDetails from "./components/TempAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import Forecast from "./components/Forecast";
import ActionFields from "./components/ActionFields";
import Loader from "./components/Loader";
import lightMode from "./assets/images/light-mode.png";
import darktMode from "./assets/images/dark-mode.png";
import useThemeToggler from "./hooks/useThemeToggler";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState({});
  const [searchedQuerry, setSerachedQuerry] = useState({ q: "guwahati" });
  const [units, setUnits] = useState({ units: "metric" });
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useThemeToggler();

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
    if (weatherData?.temp <= threshold)
      return "bg-gradient-to-r from-sky-300 via-sky-400 to-sky-500";

    return "bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500";
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

  return (
    <div className="flex flex-col justify-center items-center pb-7">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <button
            className="p-2 toogle__shadow self-end mr-10 mt-5 border-4"
            onClick={() => {
              setIsDark((d) => !d);
            }}
          >
            <img
              src={isDark ? lightMode : darktMode}
              alt={`${isDark ? "light-mode" : "dark-mode"}-img`}
              className="w-10"
            />
          </button>
          <div
            className={`w-8/12 ${
              Object.keys(weatherData).length === 0 ? "h-screen" : ""
            } max-sm:w-full max-sm:p-2`}
          >
            <TopBar onSearch={handleSearch} isDark={isDark} />
            <section
              className={`py-6 mt-2 ${handleBgColor()}  bg-opacity-60 rounded-md text-white`}
            >
              <ActionFields
                onSearch={handleSearch}
                onHandleUnits={handleUnits}
                onLocationClick={handleGeoLoaction}
              />
              {Object.keys(weatherData).length !== 0 && (
                <>
                  <TimeAndLocation weatherData={weatherData} />

                  <TempAndDetails
                    weatherData={weatherData}
                    units={units.units}
                  />
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
            </section>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
