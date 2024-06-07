import { DateTime } from "luxon";

const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a "
) => {
  return DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);
};

const iconURL = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

const formatWeatherData = (data) => {
  const {
    coord: { lon, lat },
    dt,
    main: { feels_like, humidity, temp, temp_min, temp_max },
    name,
    sys: { country, sunrise, sunset },
    timezone,
    weather,
    wind: { speed },
  } = data;

  const { main, icon } = weather.at(0);
  const formatedLocalTime = formatToLocalTime(dt, timezone);

  return {
    dt,
    timezone,
    lat,
    lon,
    feels_like,
    humidity,
    temp: temp.toFixed(0),
    temp_min: temp_min.toFixed(0),
    temp_max: temp_max.toFixed(0),
    name,
    country,
    formatedLocalTime,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    speed,
    main,
    icon: iconURL(icon),
  };
};

const formatForecastData = (secs, offset, data) => {
  const hourlyData = data
    .filter((f) => f.dt > secs)
    .slice(0, 5)
    .map((f) => ({
      temp: f.main.temp?.toFixed(0),
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconURL(f?.weather?.at(0).icon),
      date: f.dt_txt,
    }));

  const dailyData = data
    .filter((f) => f.dt_txt?.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp?.toFixed(0),
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconURL(f?.weather?.at(0).icon),
      date: f.dt_txt,
    }));

  return { hourlyData, dailyData };
};

export { formatWeatherData, formatForecastData };
