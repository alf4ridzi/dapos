import React, { useState, useEffect } from "react";
import { useForm, Form } from "@inertiajs/react";
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
    statuses = [],
}) {
    const isEdit = !!initial.id;

    const { data, setData, post, reset, processing, put } = useForm({
        name: initial.name || "",
        gender: initial.gender || "L",
        birth_date: initial.birth_date || "",
        biological_mother: initial.biological_mother || "",
        nik: initial.nik || 0,
        nisn: initial.nisn || 0,
        grade: initial.grade || "",
        status_id: initial.status_id || initial.status?.id || 1,
        file: null,
    });

    const [fileName, setFileName] = useState("");

    useEffect(() => {
        if (show) {
            setData({
                name: initial.name || "",
                gender: initial.gender || "L",
                birth_date: initial.birth_date || "",
                biological_mother: initial.biological_mother || "",
                nik: initial.nik || "",
                nisn: initial.nisn || "",
                grade: initial.grade || "",
                status_id: initial.status_id || initial.status?.id || 1,
                file: null,
            });
            setFileName("");
        }
    }, [show, initial]);

    function handleFile(e) {
        const file = e.target.files[0];
        if (file) {
            setData("file", file);
            setFileName(file.name);
        }
    }

    function handleAdd(e) {
        post(route("siswa.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                onClose();
                setFileName("");
                reset();
            },
            onError: (errors) => {
                console.log("Errors:", errors);
            },
        });
    }

    function submit(e) {
        if (isEdit) {
            handleEdit(e);
        } else if (fileName) {
            handleImport(e);
        } else {
            handleAdd(e);
        }
    }

    function handleImport(e) {
        e.preventDefault();
        post(route("siswa.import"), {
            forceFormData: true,
            onSuccess: () => {
                onClose();
                setFileName("");
                setData("file", null);
                reset();
            },
        });
    }

    function handleEdit(e) {
        e.preventDefault();
        put(route("siswa.update", initial.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                onClose();
            },
        });
    }

    function handleClose() {
        reset();
        setFileName("");
        onClose();
    }

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                onClick={handleClose}
            ></div>

            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden z-10 transform transition-all duration-300 scale-95 hover:scale-100">
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

                <form
                    onSubmit={submit}
                    className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]"
                >
                    <div className="space-y-6">
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
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
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
                                        value={data.gender}
                                        onChange={(e) =>
                                            setData("gender", e.target.value)
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
                                        value={data.birth_date}
                                        onChange={(e) =>
                                            setData(
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
                                        value={data.biological_mother}
                                        onChange={(e) =>
                                            setData(
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
                                        value={data.nik}
                                        onChange={(e) =>
                                            setData("nik", e.target.value)
                                        }
                                        type="number"
                                        className="input w-full"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        NISN *
                                    </label>
                                    <input
                                        placeholder="Masukkan NISN"
                                        value={data.nisn}
                                        onChange={(e) =>
                                            setData("nisn", e.target.value)
                                        }
                                        className="input w-full"
                                        type="number"
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
                                        value={data.grade}
                                        onChange={(e) =>
                                            setData("grade", e.target.value)
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
                                        value={data.status_id}
                                        onChange={(e) =>
                                            setData("status_id", e.target.value)
                                        }
                                        className="input w-full"
                                    >
                                        {statuses.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {!isEdit && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <FontAwesomeIcon
                                        icon={faUpload}
                                        className="text-purple-500"
                                    />
                                    Upload Import Data
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
                                                    Klik untuk upload file atau
                                                    drag & drop
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                    EXCEL FILE
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
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        onClick={handleImport}
                                        disabled={!fileName}
                                        className={`px-4 py-2 rounded-lg text-white font-semibold transition
                                                    ${
                                                        fileName
                                                            ? "bg-blue-600 hover:bg-blue-700"
                                                            : "bg-gray-400 cursor-not-allowed"
                                                    }`}
                                    >
                                        Import Data
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={processing}
                            className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
                        >
                            {processing ? (
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
