import { GiSunrise, GiSunset } from "react-icons/gi";
import DeviceThermostatTwoToneIcon from "@mui/icons-material/DeviceThermostatTwoTone";
import WaterDropTwoToneIcon from "@mui/icons-material/WaterDropTwoTone";
import AirTwoToneIcon from "@mui/icons-material/AirTwoTone";
import KeyboardArrowUpTwoToneIcon from "@mui/icons-material/KeyboardArrowUpTwoTone";
import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";

function TempAndDetails({ weatherData, units }) {
  const verticalDetails = [
    {
      id: 1,
      Icon: DeviceThermostatTwoToneIcon,
      weatherCondition: "Feels like",

      value: `${weatherData.feels_like.toFixed(0)} ${
        units === "metric" ? "℃" : "℉"
      }`,
    },
    {
      id: 2,
      Icon: WaterDropTwoToneIcon,
      weatherCondition: "Humidity",
      value: `${weatherData.humidity} %`,
    },
    {
      id: 3,
      Icon: AirTwoToneIcon,
      weatherCondition: "Wind",
      value: `${weatherData?.speed?.toFixed(0)} km/h`,
    },
  ];

  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: weatherData.sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: weatherData.sunset,
    },
    {
      id: 3,
      Icon: KeyboardArrowUpTwoToneIcon,
      title: "High",
      value: `${weatherData["temp_max"]}°`,
    },
    {
      id: 4,
      Icon: KeyboardArrowDownTwoToneIcon,
      title: "Low",
      value: `${weatherData["temp_min"]}°`,
    },
  ];
  return (
    <>
      <p className="flex items-center justify-center">{weatherData.main}</p>

      <div className="flex items-center justify-around ">
        <div>
          <img
            src={weatherData.icon}
            alt={`${weatherData.main}-img`}
            className="w-20 contrast-200"
          />
        </div>

        <p className="text-2xl ml-12 max-sm:ml-0">
          {weatherData.temp}

          {units === "metric" ? "℃" : "℉"}
        </p>

        <div className="flex flex-col gap-1 max-sm:my-3">
          {verticalDetails.map((detailAbout) => (
            <div key={detailAbout.id} className="flex items-center">
              <detailAbout.Icon fontSize="small" className="mr-1" />
              <p className="text-sm">
                {detailAbout.weatherCondition} :
                <span className="font-medium"> {detailAbout.value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-around my-7">
        {horizontalDetails.map((detailAbout) => (
          <div
            key={detailAbout.id}
            className="flex items-center justify-start max-sm:flex-none"
          >
            <detailAbout.Icon size={20} />
            <div className="text-center">
              <p className="pl-2 text-sm font-light">{detailAbout.title}</p>
              <p className="pl-2 text-sm font-light">{detailAbout.value}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TempAndDetails;
