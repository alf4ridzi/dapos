import React, { useState, useMemo, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CardStat from "@/Components/CardStat";
import StudentsTable from "@/Components/StudentsTable";
import StudentFormModal from "@/Components/StudentFormModal";
import { exportToCSV, prepareCSVData } from "@/utils/csv";
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
import { Head, usePage, router } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function Siswa() {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("semua");
    const [gradeFilter, setGradeFilter] = useState("semua");
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const {
        auth,
        students: serverStudents,
        status,
        errors,
        flash,
    } = usePage().props;

    const [students, setStudents] = useState(serverStudents);

    useEffect(() => {
        setStudents(serverStudents);
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.error(flash.error);
        }

        if (errors) {
            Object.keys(errors).forEach((key) => {
                toast.error(errors[key]);
            });
        }
    }, [errors, flash, serverStudents]);

    const stats = useMemo(() => {
        return {
            total: students.length,
            laki: students.filter((s) => s.gender === "L").length,
            perempuan: students.filter((s) => s.gender === "P").length,
            aktif: students.filter((s) => s.status.name === "Aktif").length,
        };
    }, [students]);

    const filtered = useMemo(() => {
        let result = students.filter(
            (s) =>
                s.name.toLowerCase().includes(query.toLowerCase()) ||
                s.grade.toLowerCase().includes(query.toLowerCase()),
        );

        if (statusFilter !== "semua") {
            result = result.filter((s) => s.status.name === statusFilter);
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
                    nisn: payload.nisn,
                    created_at: new Date().toISOString().split("T")[0],
                    status: status.find((s) => s.id == payload.status_id),
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
            router.delete(route("siswa.destroy", s.id));
            setIsLoading(false);
        }, 300);
    }

    function handleExport() {
        setIsLoading(true);

        setTimeout(() => {
            const exportColumns = {
                name: "Nama",
                gender: "Gender",
                birth_date: "Tanggal Lahir",
                biological_mother: "Nama Ibu",
                nik: "NIK",
                nisn: "NISN",
                grade: "Kelas",
                status: "Status",
            };

            const { headers, cleaned } = prepareCSVData(
                students,
                exportColumns,
            );

            exportToCSV(
                cleaned,
                `siswa_export_${new Date().toISOString().split("T")[0]}.csv`,
                headers,
            );

            setIsLoading(false);
        }, 500);
    }

    function handleRefresh() {
        setIsLoading(true);
        setTimeout(() => {
            router.reload();
            setIsLoading(false);
        }, 1000);
    }

    const uniqueGrades = [...new Set(students.map((s) => s.grade))];
    const uniqueStatuses = Object.values(
        students.reduce((acc, s) => {
            acc[s.status.id] = s.status;
            return acc;
        }, {}),
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Siswa" />
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
                                    <option key={status.id} value={status.name}>
                                        {status.name}
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

            <StudentFormModal
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setEditing(null);
                }}
                initial={editing || {}}
                onSubmit={handleAdd}
                isLoading={isLoading}
                statuses={status}
            />
        </AuthenticatedLayout>
    );
}
