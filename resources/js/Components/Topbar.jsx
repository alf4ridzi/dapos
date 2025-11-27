import React from "react";
import DarkModeToggle from "./DarkModeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faBell,
    faSearch,
    faUser,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

export default function Topbar({ user, onMenuToggle }) {
    return (
        <header className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
            {/* Left Section */}
            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuToggle}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Toggle menu"
                >
                    <FontAwesomeIcon icon={faBars} className="text-lg" />
                </button>

                {/* Title Section */}
                <div>
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">
                        Data Pokok Siswa
                    </h1>
                    <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Muhammad alfaridzi
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 lg:gap-4">
                <div className="hidden sm:block">
                    <DarkModeToggle />
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-2 lg:px-4 lg:py-2">
                    <div className="relative">
                        <img
                            src="https://i.pravatar.cc/40"
                            className="w-6 h-6 lg:w-8 lg:h-8 rounded-full"
                            alt="avatar"
                        />
                        <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    </div>

                    {/* Username - Hidden on mobile */}
                    <span className="hidden sm:block font-medium text-sm lg:text-base text-gray-700 dark:text-gray-300">
                        Alfaridzi
                    </span>

                    {/* Dropdown Arrow - Hidden on mobile */}
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className="hidden sm:block text-xs text-gray-400 ml-1"
                    />
                </div>
            </div>
        </header>
    );
}
