import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTrash,
    faEye,
    faSort,
    faSortUp,
    faSortDown,
    faMale,
    faFemale,
    faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

export default function StudentsTable({
    students = [],
    onEdit,
    onDelete,
    onView,
    isLoading = false,
    currentPage = 1,
    itemsPerPage = 5,
    onPageChange,
    onItemsPerPageChange,
}) {
    const [sortField, setSortField] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");
    const [selectedStudent, setSelectedStudent] = useState(null);

    const sortedAllStudents = [...students].sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (sortField === "birth_date") {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    const totalPages = Math.ceil(students.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedStudents = sortedAllStudents.slice(
        startIndex,
        startIndex + itemsPerPage,
    );

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const getSortIcon = (field) => {
        if (sortField !== field) return faSort;
        return sortDirection === "asc" ? faSortUp : faSortDown;
    };

    const getStatusColor = (status) => {
        const colors = {
            aktif: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            terdaftar:
                "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
            pindah: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
            lulus: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
            drop_out:
                "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        };
        return (
            colors[status] ||
            "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const handleActionClick = (student, action) => {
        setSelectedStudent(null);
        if (action === "edit" && onEdit) onEdit(student);
        if (action === "delete" && onDelete) onDelete(student);
        if (action === "view" && onView) onView(student);
    };

    // Generate page numbers untuk pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Tampilkan semua page jika total pages sedikit
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Logic untuk menampilkan page numbers dengan ellipsis
            if (currentPage <= 3) {
                // Dekat dengan awal
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Dekat dengan akhir
                pages.push(1);
                pages.push("...");
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Di tengah
                pages.push(1);
                pages.push("...");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            }
        }

        return pages;
    };

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="p-4 border-b border-gray-200 dark:border-gray-700 animate-pulse"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                <div className="space-y-2">
                                    <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                    <div className="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <div className="w-20 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                <div className="w-20 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (students.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-8 text-center">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <FontAwesomeIcon icon={faMale} className="text-4xl mb-2" />
                    <FontAwesomeIcon
                        icon={faFemale}
                        className="text-4xl mx-4"
                    />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Tidak ada data siswa
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                    Data siswa akan muncul di sini setelah ditambahkan
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                        <tr>
                            {[
                                { key: "name", label: "Nama Lengkap" },
                                { key: "gender", label: "JK" },
                                { key: "birth_date", label: "Tanggal Lahir" },
                                {
                                    key: "biological_mother",
                                    label: "Ibu Kandung",
                                },
                                { key: "nik", label: "NIK" },
                                { key: "nisn", label: "NISN" },
                                { key: "grade", label: "Kelas" },
                                { key: "status", label: "Status" },
                                { key: "actions", label: "Aksi" },
                            ].map((column) => (
                                <th
                                    key={column.key}
                                    className={`py-4 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${
                                        column.key !== "actions"
                                            ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        column.key !== "actions" &&
                                        handleSort(column.key)
                                    }
                                >
                                    <div className="flex items-center gap-1">
                                        {column.label}
                                        {column.key !== "actions" && (
                                            <FontAwesomeIcon
                                                icon={getSortIcon(column.key)}
                                                className={`text-xs ${
                                                    sortField === column.key
                                                        ? "text-blue-500"
                                                        : "text-gray-400"
                                                }`}
                                            />
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {displayedStudents.map((student) => (
                            <tr
                                key={student.id || student.nisn}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150"
                            >
                                <td className="py-4 px-4">
                                    <div className="flex items-center">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                                student.gender === "L"
                                                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                                                    : "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300"
                                            }`}
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    student.gender === "L"
                                                        ? faMale
                                                        : faFemale
                                                }
                                                className="text-sm"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {student.name}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {student.grade}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            student.gender === "L"
                                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                                : "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
                                        }`}
                                    >
                                        {student.gender === "L" ? "L" : "P"}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">
                                    {formatDate(student.birth_date)}
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">
                                    {student.biological_mother}
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-mono">
                                    {student.nik}
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-mono">
                                    {student.nisn}
                                </td>
                                <td className="py-4 px-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                                        {student.grade}
                                    </span>
                                </td>
                                <td className="py-4 px-4">
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(student.status)}`}
                                    >
                                        {student.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                handleActionClick(
                                                    student,
                                                    "edit",
                                                )
                                            }
                                            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                                            title="Edit siswa"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleActionClick(
                                                    student,
                                                    "delete",
                                                )
                                            }
                                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                            title="Hapus siswa"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="lg:hidden">
                {displayedStudents.map((student) => (
                    <div
                        key={student.id || student.nisn}
                        className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                                        student.gender === "L"
                                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                                            : "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300"
                                    }`}
                                >
                                    <FontAwesomeIcon
                                        icon={
                                            student.gender === "L"
                                                ? faMale
                                                : faFemale
                                        }
                                        className="text-base"
                                    />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        {student.name}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {student.grade} • {student.nisn}
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setSelectedStudent(
                                            selectedStudent?.id === student.id
                                                ? null
                                                : student,
                                        )
                                    }
                                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
                                >
                                    <FontAwesomeIcon icon={faEllipsisV} />
                                </button>

                                {selectedStudent?.id === student.id && (
                                    <div className="absolute right-0 top-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 min-w-32">
                                        <button
                                            onClick={() =>
                                                handleActionClick(
                                                    student,
                                                    "view",
                                                )
                                            }
                                            className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                                        >
                                            <FontAwesomeIcon
                                                icon={faEye}
                                                className="text-blue-500"
                                            />
                                            Lihat Detail
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleActionClick(
                                                    student,
                                                    "edit",
                                                )
                                            }
                                            className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                                        >
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                className="text-green-500"
                                            />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleActionClick(
                                                    student,
                                                    "delete",
                                                )
                                            }
                                            className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                            Hapus
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="text-gray-500 dark:text-gray-400">
                                    Tanggal Lahir
                                </div>
                                <div className="text-gray-900 dark:text-white">
                                    {formatDate(student.birth_date)}
                                </div>
                            </div>
                            <div>
                                <div className="text-gray-500 dark:text-gray-400">
                                    Ibu Kandung
                                </div>
                                <div className="text-gray-900 dark:text-white">
                                    {student.biological_mother}
                                </div>
                            </div>
                            <div>
                                <div className="text-gray-500 dark:text-gray-400">
                                    NIK
                                </div>
                                <div className="text-gray-900 dark:text-white font-mono text-xs">
                                    {student.nik}
                                </div>
                            </div>
                            <div>
                                <div className="text-gray-500 dark:text-gray-400">
                                    Status
                                </div>
                                <span
                                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(student.status)}`}
                                >
                                    {student.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {onPageChange && totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Menampilkan {startIndex + 1}-
                                {Math.min(
                                    startIndex + itemsPerPage,
                                    students.length,
                                )}{" "}
                                dari {students.length}
                            </span>

                            <select
                                value={itemsPerPage}
                                onChange={(e) =>
                                    onItemsPerPageChange(Number(e.target.value))
                                }
                                className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-white dark:bg-gray-800"
                            >
                                <option value={5}>5 per halaman</option>
                                <option value={10}>10 per halaman</option>
                                <option value={25}>25 per halaman</option>
                                <option value={50}>50 per halaman</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => onPageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            {getPageNumbers().map((pageNum, index) => (
                                <button
                                    key={index}
                                    onClick={() =>
                                        pageNum !== "..." &&
                                        onPageChange(pageNum)
                                    }
                                    className={`px-3 py-1 rounded-lg border ${
                                        currentPage === pageNum
                                            ? "bg-blue-600 border-blue-600 text-white"
                                            : pageNum === "..."
                                              ? "border-transparent text-gray-500 cursor-default"
                                              : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    }`}
                                    disabled={pageNum === "..."}
                                >
                                    {pageNum}
                                </button>
                            ))}

                            <button
                                onClick={() => onPageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
