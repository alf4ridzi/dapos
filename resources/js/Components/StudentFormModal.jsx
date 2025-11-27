import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes,
    faUserPlus,
    faUserEdit,
    faUpload,
    faCalendarAlt,
    faVenusMars,
    faIdCard,
    faGraduationCap,
    faUserCircle,
    faBook,
} from "@fortawesome/free-solid-svg-icons";

export default function StudentFormModal({
    show,
    onClose,
    onSubmit,
    initial = {},
    isLoading = false,
}) {
    const isEdit = !!initial.id;

    const form = useForm({
        name: initial.name || "",
        gender: initial.gender || "L",
        birth_date: initial.birth_date || "",
        biological_mother: initial.biological_mother || "",
        nik: initial.nik || "",
        nisn: initial.nisn || "",
        grade: initial.grade || "",
        status: initial.status || "terdaftar",
        file: null,
    });

    const [fileName, setFileName] = useState("");

    useEffect(() => {
        if (show) {
            form.setData({
                name: initial.name || "",
                gender: initial.gender || "L",
                birth_date: initial.birth_date || "",
                biological_mother: initial.biological_mother || "",
                nik: initial.nik || "",
                nisn: initial.nisn || "",
                grade: initial.grade || "",
                status: initial.status || "terdaftar",
                file: null,
            });
            setFileName("");
        }
    }, [show, initial]);

    function handleFile(e) {
        const file = e.target.files[0];
        if (file) {
            form.setData("file", file);
            setFileName(file.name);
        }
    }

    function submit(e) {
        e.preventDefault();
        const payload = { ...form.data };
        onSubmit(payload);
    }

    function handleClose() {
        form.reset();
        setFileName("");
        onClose();
    }

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                onClick={handleClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden z-10 transform transition-all duration-300 scale-95 hover:scale-100">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <FontAwesomeIcon
                                icon={isEdit ? faUserEdit : faUserPlus}
                                className="text-blue-600 dark:text-blue-400 text-lg"
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                {isEdit
                                    ? "Edit Data Siswa"
                                    : "Tambah Siswa Baru"}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {isEdit
                                    ? "Perbarui informasi siswa"
                                    : "Isi data siswa baru"}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="text-gray-500 dark:text-gray-400 text-lg"
                        />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={submit}
                    className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]"
                >
                    <div className="space-y-6">
                        {/* Informasi Pribadi */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faUserCircle}
                                    className="text-blue-500"
                                />
                                Informasi Pribadi
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Nama Lengkap *
                                    </label>
                                    <input
                                        placeholder="Masukkan nama lengkap"
                                        value={form.data.name}
                                        onChange={(e) =>
                                            form.setData("name", e.target.value)
                                        }
                                        className="input w-full"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <FontAwesomeIcon
                                            icon={faVenusMars}
                                            className="text-gray-400"
                                        />
                                        Jenis Kelamin *
                                    </label>
                                    <select
                                        value={form.data.gender}
                                        onChange={(e) =>
                                            form.setData(
                                                "gender",
                                                e.target.value,
                                            )
                                        }
                                        className="input w-full"
                                    >
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                            className="text-gray-400"
                                        />
                                        Tanggal Lahir *
                                    </label>
                                    <input
                                        type="date"
                                        value={form.data.birth_date}
                                        onChange={(e) =>
                                            form.setData(
                                                "birth_date",
                                                e.target.value,
                                            )
                                        }
                                        className="input w-full"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Nama Ibu Kandung *
                                    </label>
                                    <input
                                        placeholder="Masukkan nama ibu kandung"
                                        value={form.data.biological_mother}
                                        onChange={(e) =>
                                            form.setData(
                                                "biological_mother",
                                                e.target.value,
                                            )
                                        }
                                        className="input w-full"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Informasi Akademik */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faGraduationCap}
                                    className="text-green-500"
                                />
                                Informasi Akademik
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <FontAwesomeIcon
                                            icon={faIdCard}
                                            className="text-gray-400"
                                        />
                                        NIK
                                    </label>
                                    <input
                                        placeholder="Masukkan NIK"
                                        value={form.data.nik}
                                        onChange={(e) =>
                                            form.setData("nik", e.target.value)
                                        }
                                        className="input w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        NISN *
                                    </label>
                                    <input
                                        placeholder="Masukkan NISN"
                                        value={form.data.nisn}
                                        onChange={(e) =>
                                            form.setData("nisn", e.target.value)
                                        }
                                        className="input w-full"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <FontAwesomeIcon
                                            icon={faBook}
                                            className="text-gray-400"
                                        />
                                        Kelas *
                                    </label>
                                    <input
                                        placeholder="Contoh: 10 IPA 1"
                                        value={form.data.grade}
                                        onChange={(e) =>
                                            form.setData(
                                                "grade",
                                                e.target.value,
                                            )
                                        }
                                        className="input w-full"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Status Siswa *
                                    </label>
                                    <select
                                        value={form.data.status}
                                        onChange={(e) =>
                                            form.setData(
                                                "status",
                                                e.target.value,
                                            )
                                        }
                                        className="input w-full"
                                    >
                                        <option value="terdaftar">
                                            Terdaftar
                                        </option>
                                        <option value="aktif">Aktif</option>
                                        <option value="lulus">Lulus</option>
                                        <option value="pindah">Pindah</option>
                                        <option value="drop_out">
                                            Drop Out
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* File Upload */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faUpload}
                                    className="text-purple-500"
                                />
                                Upload Berkas
                            </h3>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    File Pendukung
                                </label>
                                <div className="flex items-center gap-4">
                                    <label className="flex-1 cursor-pointer">
                                        <input
                                            type="file"
                                            onChange={handleFile}
                                            className="hidden"
                                        />
                                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200">
                                            <FontAwesomeIcon
                                                icon={faUpload}
                                                className="text-gray-400 text-2xl mb-2"
                                            />
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Klik untuk upload file atau drag
                                                & drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                PDF, JPG, PNG (max. 10MB)
                                            </p>
                                        </div>
                                    </label>
                                    {fileName && (
                                        <div className="flex-shrink-0">
                                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg px-3 py-2">
                                                <p className="text-sm text-green-800 dark:text-green-300 font-medium">
                                                    {fileName}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isLoading}
                            className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon
                                        icon={isEdit ? faUserEdit : faUserPlus}
                                    />
                                    {isEdit ? "Update Data" : "Simpan Data"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
