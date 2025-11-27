import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faAdjust } from "@fortawesome/free-solid-svg-icons";

export default function DarkModeToggle() {
    const [dark, setDark] = useState(() => {
        try {
            const saved = localStorage.getItem("dark");
            if (saved !== null) {
                return saved === "true";
            }
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        } catch (e) {
            return false;
        }
    });

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;

        if (dark) {
            root.classList.add("dark");
            root.style.colorScheme = "dark";
        } else {
            root.classList.remove("dark");
            root.style.colorScheme = "light";
        }

        try {
            localStorage.setItem("dark", dark);
        } catch (e) {
            console.warn("Failed to save theme preference to localStorage");
        }
    }, [dark, mounted]);

    const toggleDarkMode = () => {
        setDark((prev) => !prev);
    };

    if (!mounted) {
        return (
            <div className="w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
        );
    }

    return (
        <button
            onClick={toggleDarkMode}
            className={`
                relative w-12 h-6 rounded-full transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900
                ${
                    dark
                        ? "bg-gradient-to-r from-purple-500 to-blue-600"
                        : "bg-gradient-to-r from-yellow-300 to-orange-400"
                }
                shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95
            `}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm"></div>

            <div
                className={`
                    absolute top-1 w-4 h-4 rounded-full bg-white shadow-lg
                    transform transition-all duration-300 ease-in-out
                    flex items-center justify-center
                    ${dark ? "translate-x-7" : "translate-x-1"}
                `}
            >
                <FontAwesomeIcon
                    icon={dark ? faMoon : faSun}
                    className={`
                        text-xs transition-all duration-300
                        ${dark ? "text-purple-600" : "text-orange-500"}
                    `}
                />
            </div>

            <div className="absolute inset-0 flex items-center justify-between px-1.5">
                <FontAwesomeIcon
                    icon={faSun}
                    className="text-[10px] text-yellow-300 opacity-80"
                />
                <FontAwesomeIcon
                    icon={faMoon}
                    className="text-[10px] text-blue-300 opacity-80"
                />
            </div>
        </button>
    );
}
