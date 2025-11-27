import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUsers,
    faUserGraduate,
    faChalkboardTeacher,
    faBook,
    faChartLine,
    faCalendarAlt,
    faCheckCircle,
    faClock,
} from "@fortawesome/free-solid-svg-icons";
import CardStat from "../components/CardStat";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";

export default function Dashboard() {
    const statsData = [
        {
            title: "Total Siswa",
            value: 1247,
            icon: faUsers,
            trend: "up",
            trendValue: "+12%",
            description: "Dari bulan lalu",
            color: "blue",
        },
        {
            title: "Siswa Aktif",
            value: 1189,
            icon: faUserGraduate,
            trend: "up",
            trendValue: "+8%",
            description: "95% aktif belajar",
            color: "green",
        },
        {
            title: "Total Guru",
            value: 68,
            icon: faChalkboardTeacher,
            trend: "up",
            trendValue: "+5%",
            description: "Tenaga pengajar",
            color: "purple",
        },
        {
            title: "Mata Pelajaran",
            value: 24,
            icon: faBook,
            description: "Kurikulum aktif",
            color: "orange",
        },
    ];

    const recentActivities = [
        {
            id: 1,
            type: "siswa",
            message: "Andi Saputra berhasil menyelesaikan ujian Matematika",
            time: "5 menit lalu",
            icon: faCheckCircle,
            color: "text-green-500",
        },
        {
            id: 2,
            type: "guru",
            message: "Bu Siti mengupload materi baru untuk kelas 10 IPA",
            time: "1 jam lalu",
            icon: faBook,
            color: "text-blue-500",
        },
        {
            id: 3,
            type: "siswa",
            message: "Lisa Permata mendaftar kegiatan ekstrakurikuler",
            time: "2 jam lalu",
            icon: faUserGraduate,
            color: "text-purple-500",
        },
        {
            id: 4,
            type: "system",
            message: "Raport semester genap telah diterbitkan",
            time: "5 jam lalu",
            icon: faChartLine,
            color: "text-orange-500",
        },
    ];

    const upcomingEvents = [
        {
            id: 1,
            title: "Ujian Mid Semester",
            date: "15 Mar 2024",
            class: "Semua Kelas",
            type: "exam",
        },
        {
            id: 2,
            title: "Rapat Orang Tua",
            date: "20 Mar 2024",
            class: "Kelas 10",
            type: "meeting",
        },
        {
            id: 3,
            title: "Perkemahan Jumat-Sabtu",
            date: "25 Mar 2024",
            class: "Kelas 11",
            type: "event",
        },
        {
            id: 4,
            title: "Lomba Sains Nasional",
            date: "30 Mar 2024",
            class: "Perwakilan",
            type: "competition",
        },
    ];

    const getEventTypeColor = (type) => {
        const colors = {
            exam: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
            meeting:
                "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
            event: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            competition:
                "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
        };
        return (
            colors[type] ||
            "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        );
    };

    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                            Dashboard
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Selamat datang di Sistem Management Sekolah
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <FontAwesomeIcon icon={faClock} />
                        <span>
                            {new Date().toLocaleDateString("id-ID", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {statsData.map((stat, index) => (
                        <CardStat
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                            trend={stat.trend}
                            trendValue={stat.trendValue}
                            description={stat.description}
                            color={stat.color}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activities */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faChartLine}
                                    className="text-blue-500"
                                />
                                Aktivitas Terbaru
                            </h2>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Hari Ini
                            </span>
                        </div>
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                                >
                                    <div
                                        className={`p-2 rounded-lg ${activity.color} bg-opacity-10`}
                                    >
                                        <FontAwesomeIcon
                                            icon={activity.icon}
                                            className={activity.color}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-800 dark:text-gray-200">
                                            {activity.message}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faCalendarAlt}
                                    className="text-green-500"
                                />
                                Acara Mendatang
                            </h2>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Bulan Ini
                            </span>
                        </div>
                        <div className="space-y-4">
                            {upcomingEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                                {event.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {event.class}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {event.date}
                                        </span>
                                        <span
                                            className={`block text-xs px-2 py-1 rounded-full mt-1 ${getEventTypeColor(event.type)}`}
                                        >
                                            {event.type}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm">
                                    Kehadiran Hari Ini
                                </p>
                                <p className="text-2xl font-bold mt-1">94%</p>
                                <p className="text-blue-100 text-xs mt-1">
                                    1,172 dari 1,247 siswa
                                </p>
                            </div>
                            <div className="p-3 bg-blue-400 rounded-lg">
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="text-2xl"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm">
                                    Tugas Terkumpul
                                </p>
                                <p className="text-2xl font-bold mt-1">87%</p>
                                <p className="text-green-100 text-xs mt-1">
                                    24 dari 28 kelas
                                </p>
                            </div>
                            <div className="p-3 bg-green-400 rounded-lg">
                                <FontAwesomeIcon
                                    icon={faBook}
                                    className="text-2xl"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm">
                                    Rata-rata Nilai
                                </p>
                                <p className="text-2xl font-bold mt-1">82.5</p>
                                <p className="text-purple-100 text-xs mt-1">
                                    Naik 2.3 poin
                                </p>
                            </div>
                            <div className="p-3 bg-purple-400 rounded-lg">
                                <FontAwesomeIcon
                                    icon={faChartLine}
                                    className="text-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
