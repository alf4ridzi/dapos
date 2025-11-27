import React from "react";
import { Head } from "@inertiajs/react";
import { useDarkMode } from "../Hooks/useDarkMode";

export default function AppLayout({ title, children }) {
    const { isDark, toggleDarkMode } = useDarkMode();

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                {children}
            </div>
        </>
    );
}
