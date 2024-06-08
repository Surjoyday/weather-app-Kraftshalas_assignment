function TopBar({ onSearch, isDark }) {
  const cities = [
    { id: 1, cityName: "Munich" },
    { id: 3, cityName: "Tokyo" },
    { id: 2, cityName: "Sydney" },
    { id: 4, cityName: "Stockholm" },
    { id: 5, cityName: "Dublin" },
  ];
  return (
    <nav className="flex items-center justify-around max-sm:justify-center max-sm:gap-3">
      {cities.map((city) => (
        <button
          className={`text-lg max-sm:text-sm font-semibold hover:bg-gray-700/50 p-1.5 rounded-md transition ease-in cursor-pointer ${
            isDark ? "text-white" : "text-black"
          }`}
          key={city.id}
          onClick={() => onSearch(city.cityName)}
        >
          {city.cityName}
        </button>
      ))}
    </nav>
  );
}

export default TopBar;
