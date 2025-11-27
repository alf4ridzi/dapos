import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faHouse,
    faUserGraduate,
    faChartBar,
    faCog,
    faSignOutAlt,
    faChevronLeft,
    faChevronRight,
    faUsers,
    faBook,
    faCalendarAlt,
    faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "@inertiajs/inertia-react";
import { Button } from "./ui/button";

export default function Sidebar({ isMobileOpen, onMobileToggle }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState("siswa");

    const menuItems = [
        {
            id: "siswa",
            label: "Data Siswa",
            icon: faUserGraduate,
            href: "dashboard",
        },
    ];

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleItemClick = (itemId) => {
        setActiveItem(itemId);
        if (window.innerWidth < 1024) {
            onMobileToggle();
        }
    };

    return (
        <>
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={onMobileToggle}
                />
            )}

            <aside
                className={`
                fixed lg:sticky top-0 left-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
                flex flex-col z-50 transition-all duration-300 ease-in-out
                ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                ${isCollapsed ? "w-20" : "w-64"}
                shadow-xl lg:shadow-none
            `}
            >
                <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
                    <div
                        className={`flex items-center gap-3 transition-all ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <FontAwesomeIcon
                                icon={faUserGraduate}
                                className="text-lg"
                            />
                        </div>
                        <div className="font-bold text-lg text-gray-800 dark:text-white">
                            Dapodik
                        </div>
                    </div>

                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden lg:flex"
                        aria-label={
                            isCollapsed ? "Expand sidebar" : "Collapse sidebar"
                        }
                    >
                        <FontAwesomeIcon
                            icon={isCollapsed ? faChevronRight : faChevronLeft}
                            className="text-gray-600 dark:text-gray-400"
                        />
                    </button>

                    <button
                        onClick={onMobileToggle}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className="text-gray-600 dark:text-gray-400"
                        />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.id}
                            href={route(item.href)}
                            onClick={() => handleItemClick(item.id)}
                            className={`
                                w-full flex items-center rounded-xl transition-all duration-200 group
                                ${
                                    activeItem === item.id
                                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                                }
                                ${isCollapsed ? "justify-center p-3" : "p-3 gap-3"}
                            `}
                        >
                            <FontAwesomeIcon
                                icon={item.icon}
                                className={`
                                    transition-all duration-200
                                    ${
                                        activeItem === item.id
                                            ? "text-white"
                                            : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200"
                                    }
                                    ${isCollapsed ? "text-lg" : "text-base"}
                                `}
                            />

                            <span
                                className={`
                                    font-medium transition-all duration-200
                                    ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}
                                    ${activeItem === item.id ? "font-semibold" : ""}
                                `}
                            >
                                {item.label}
                            </span>

                            {isCollapsed && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                    {item.label}
                                </div>
                            )}
                        </Link>
                    ))}
                </nav>

                <div
                    className={`
                    p-4 border-t border-gray-100 dark:border-gray-700 transition-all duration-300
                    ${isCollapsed ? "text-center" : ""}
                `}
                >
                    <div
                        className={`flex items-center gap-3 mb-4 ${isCollapsed ? "justify-center" : ""}`}
                    >
                        <img
                            src="https://i.pravatar.cc/40"
                            className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-600 shadow"
                            alt="User avatar"
                        />
                        <div
                            className={`
                            transition-all duration-300 overflow-hidden
                            ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}
                        `}
                        >
                            <div className="font-medium text-sm text-gray-800 dark:text-white">
                                Alfaridzi
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                Admin
                            </div>
                        </div>
                    </div>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className={`
                            w-full flex items-center rounded-xl p-3 text-gray-700 dark:text-gray-300
                            hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group
                            ${isCollapsed ? "justify-center" : "gap-3"} h-auto
                        `}
                    >
                        <FontAwesomeIcon
                            icon={faSignOutAlt}
                            className="text-gray-500 dark:text-gray-400 group-hover:text-red-500 transition-colors"
                        />
                        <span
                            className={`
                                font-medium transition-all duration-300
                                ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}
                            `}
                        >
                            Keluar
                        </span>

                        {isCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                Keluar
                            </div>
                        )}
                    </Link>
                </div>
            </aside>
        </>
    );
}
