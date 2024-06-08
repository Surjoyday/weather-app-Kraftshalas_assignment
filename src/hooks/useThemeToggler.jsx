import { useEffect, useState } from "react";

function useThemeToggler() {
  const [isDark, setIsDark] = useState(false);

  useEffect(
    function () {
      document.querySelector("body").classList.toggle("dark-mode");
    },
    [isDark]
  );

  return [isDark, setIsDark];
}

export default useThemeToggler;
