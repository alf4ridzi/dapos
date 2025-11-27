import React, { useState, useMemo } from "react";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import CardStat from "../components/CardStat";
import StudentsTable from "../components/StudentsTable";
import StudentFormModal from "../components/StudentFormModal";
import { exportToCSV } from "../utils/csv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faDownload,
    faSearch,
    faFilter,
    faUsers,
    faMale,
    faFemale,
    faUserCheck,
    faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/Components/ui/input";

const DUMMY = [
    {
        id: 1,
        name: "Andi Saputra",
        gender: "L",
        birth_date: "2010-05-02",
        biological_mother: "Siti",
        nik: "3201012001000001",
        nisn: "10000001",
        grade: "5A",
        status: "aktif",
        created_at: "2024-01-15",
    },
    {
        id: 2,
        name: "Lisa Permata",
        gender: "P",
        birth_date: "2011-07-11",
        biological_mother: "Rina",
        nik: "3201012001000002",
        nisn: "10000002",
        grade: "4B",
        status: "terdaftar",
        created_at: "2024-01-10",
    },
    {
        id: 3,
        name: "Budi Santoso",
        gender: "L",
        birth_date: "2010-11-20",
        biological_mother: "Dewi",
        nik: "3201012001000003",
        nisn: "10000003",
        grade: "6A",
        status: "aktif",
        created_at: "2024-01-05",
    },
    {
        id: 4,
        name: "Sari Indah",
        gender: "P",
        birth_date: "2011-03-15",
        biological_mother: "Maya",
        nik: "3201012001000004",
        nisn: "10000004",
        grade: "5B",
        status: "pindah",
        created_at: "2023-12-20",
    },
    {
        id: 5,
        name: "Sari Indah",
        gender: "P",
        birth_date: "2011-03-15",
        biological_mother: "Maya",
        nik: "3201012001000004",
        nisn: "10000004",
        grade: "5B",
        status: "pindah",
        created_at: "2023-12-20",
    },
    {
        id: 6,
        name: "Sari Indah",
        gender: "P",
        birth_date: "2011-03-15",
        biological_mother: "Maya",
        nik: "3201012001000004",
        nisn: "10000004",
        grade: "5B",
        status: "pindah",
        created_at: "2023-12-20",
    },
];

export default function Siswa() {
    const [students, setStudents] = useState(DUMMY);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("semua");
    const [gradeFilter, setGradeFilter] = useState("semua");
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const stats = useMemo(() => {
        return {
            total: students.length,
            laki: students.filter((s) => s.gender === "L").length,
            perempuan: students.filter((s) => s.gender === "P").length,
            aktif: students.filter((s) => s.status === "aktif").length,
            terdaftar: students.filter((s) => s.status === "terdaftar").length,
            pindah: students.filter((s) => s.status === "pindah").length,
        };
    }, [students]);

    const filtered = useMemo(() => {
        let result = students.filter(
            (s) =>
                s.name.toLowerCase().includes(query.toLowerCase()) ||
                s.nisn.toLowerCase().includes(query.toLowerCase()) ||
                s.grade.toLowerCase().includes(query.toLowerCase()),
        );

        if (statusFilter !== "semua") {
            result = result.filter((s) => s.status === statusFilter);
        }

        if (gradeFilter !== "semua") {
            result = result.filter((s) => s.grade === gradeFilter);
        }

        return result;
    }, [students, query, statusFilter, gradeFilter]);

    function handleAdd(payload) {
        setIsLoading(true);

        setTimeout(() => {
            if (editing) {
                setStudents((prev) =>
                    prev.map((p) =>
                        p.id === editing.id
                            ? {
                                  ...editing,
                                  ...payload,
                                  updated_at: new Date()
                                      .toISOString()
                                      .split("T")[0],
                              }
                            : p,
                    ),
                );
                setEditing(null);
            } else {
                const newItem = {
                    ...payload,
                    id: Math.max(...students.map((s) => s.id)) + 1,
                    nisn:
                        payload.nisn ||
                        Math.floor(
                            10000000 + Math.random() * 90000000,
                        ).toString(),
                    created_at: new Date().toISOString().split("T")[0],
                    status: payload.status || "terdaftar",
                };
                setStudents((prev) => [newItem, ...prev]);
            }
            setShowModal(false);
            setIsLoading(false);
        }, 500);
    }

    function handleEdit(s) {
        setEditing(s);
        setShowModal(true);
    }

    function handleDelete(s) {
        if (!confirm(`Hapus siswa ${s.name}?`)) return;
        setIsLoading(true);

        setTimeout(() => {
            setStudents((prev) => prev.filter((p) => p.id !== s.id));
            setIsLoading(false);
        }, 300);
    }

    function handleExport() {
        setIsLoading(true);
        setTimeout(() => {
            exportToCSV(
                students,
                `siswa_export_${new Date().toISOString().split("T")[0]}.csv`,
            );
            setIsLoading(false);
        }, 500);
    }

    function handleRefresh() {
        setIsLoading(true);
        setTimeout(() => {
            // Simulate data refresh
            setIsLoading(false);
        }, 1000);
    }

    const uniqueGrades = [...new Set(students.map((s) => s.grade))];
    const uniqueStatuses = [...new Set(students.map((s) => s.status))];

    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                            Data Peserta Didik
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Kelola data siswa dengan mudah dan efisien
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleRefresh}
                            disabled={isLoading}
                            className="btn-secondary flex items-center gap-2 disabled:opacity-50"
                        >
                            <FontAwesomeIcon
                                icon={faRefresh}
                                className={`${isLoading ? "animate-spin" : ""}`}
                            />
                            <span className="hidden sm:inline">Refresh</span>
                        </button>

                        <button
                            onClick={handleExport}
                            disabled={isLoading}
                            className="btn-secondary flex items-center gap-2 disabled:opacity-50"
                        >
                            <FontAwesomeIcon icon={faDownload} />
                            <span className="hidden sm:inline">Export</span>
                        </button>

                        <button
                            onClick={() => {
                                setShowModal(true);
                                setEditing(null);
                            }}
                            className="btn-primary flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            <span>Tambah Siswa</span>
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    <CardStat
                        title="Total Siswa"
                        value={stats.total}
                        icon={faUsers}
                        trend="+12%"
                        color="blue"
                    />
                    <CardStat
                        title="Siswa Laki-laki"
                        value={stats.laki}
                        icon={faMale}
                        color="green"
                    />
                    <CardStat
                        title="Siswa Perempuan"
                        value={stats.perempuan}
                        icon={faFemale}
                        color="pink"
                    />
                    <CardStat
                        title="Siswa Aktif"
                        value={stats.aktif}
                        icon={faUserCheck}
                        trend="+5%"
                        color="purple"
                    />
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon
                                icon={faFilter}
                                className="text-gray-400"
                            />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Daftar Siswa
                            </h2>
                            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-2 py-1 rounded-full">
                                {filtered.length} data
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 lg:flex-initial">
                                <Input
                                    placeholder="Cari nama, NISN, atau kelas..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="input pl-10 w-full lg:w-80"
                                />
                            </div>

                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="input dark:bg-gray-700"
                            >
                                <option value="semua">Semua Status</option>
                                {uniqueStatuses.map((status) => (
                                    <option key={status} value={status}>
                                        {status.charAt(0).toUpperCase() +
                                            status.slice(1)}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={gradeFilter}
                                onChange={(e) => setGradeFilter(e.target.value)}
                                className="input dark:bg-gray-700"
                            >
                                <option value="semua">Semua Kelas</option>
                                {uniqueGrades.map((grade) => (
                                    <option key={grade} value={grade}>
                                        {grade}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="relative">
                        {isLoading && (
                            <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        )}

                        <StudentsTable
                            students={filtered}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            isLoading={isLoading}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            onPageChange={(page) => setCurrentPage(page)}
                            onItemsPerPageChange={(value) => {
                                setItemsPerPage(value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Student Form Modal */}
            <StudentFormModal
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setEditing(null);
                }}
                initial={editing || {}}
                onSubmit={handleAdd}
                isLoading={isLoading}
            />
        </AuthenticatedLayout>
    );
}
