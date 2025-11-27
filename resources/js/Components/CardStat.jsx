import React from "react";

export default function CardStat({ title, value }) {
    return (
        <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-base font-semibold text-gray-600 dark:text-gray-400 mb-3 tracking-wide">
                {title}
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {value}
            </div>

            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-4 group-hover:w-16 transition-all duration-300"></div>
        </div>
    );
}
