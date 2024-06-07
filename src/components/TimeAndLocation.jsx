function TimeAndLocation({ weatherData }) {
  return (
    <>
      <div className="flex items-center justify-center my-6 text-xl font-extralight">
        <p className="max-sm:text-xs">{weatherData.formatedLocalTime}</p>
      </div>
      <div className="flex items-center justify-center my-4">
        <p className="text-xl font-medium max-sm:text-sm">
          {weatherData.name}, {weatherData.country}
        </p>
      </div>
    </>
  );
}

export default TimeAndLocation;
