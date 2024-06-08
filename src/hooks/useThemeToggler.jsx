import { useEffect, useState } from "react";

function useThemeToggler() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("isDark");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(
    function () {
      document.querySelector("body").classList.toggle("dark-mode", isDark);
      localStorage.setItem("isDark", JSON.stringify(isDark));
    },
    [isDark]
  );

  return [isDark, setIsDark];
}

export default useThemeToggler;
