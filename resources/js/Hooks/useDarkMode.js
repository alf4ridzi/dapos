import { useState, useEffect } from "react";

export function useDarkMode() {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem("dark-mode");
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem("dark-mode", JSON.stringify(isDark));
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    const toggleDarkMode = () => setIsDark(!isDark);

    return { isDark, toggleDarkMode };
}
