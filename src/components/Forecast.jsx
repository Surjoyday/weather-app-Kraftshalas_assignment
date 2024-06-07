function Forecast({ title, forecastData }) {
  return (
    <>
      <div className="flex flex-col items-start justify-start my-6 px-14">
        <p className="font-medium uppercase">{title}</p>
        <hr className="w-full" />
      </div>

      <div className="flex items-center justify-evenly">
        {forecastData?.map((data, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <p className="text-sm font-light">{data.title}</p>
            <img
              src={data.icon}
              alt="open-weather-icon"
              className="w-12 my-1"
            />
            <p className="font-medium">{data.temp}°</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Forecast;
