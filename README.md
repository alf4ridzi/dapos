# 🎓 System Management Data Pokok Siswa  
Sistem manajemen **Data Pokok Siswa (DAPOS)** yang digunakan untuk kebutuhan pendataan dan pengelolaan siswa, khususnya untuk persiapan **Ujian Akhir Semester kelas 12**.  
Dibangun dengan stack modern yang menggabungkan kekuatan Laravel, React, dan Inertia.js untuk menghasilkan aplikasi cepat, responsif, dan mudah digunakan.

---

## 🚀 Tech Stack
- **Laravel** – Backend API & server-side logic  
- **React** – Modern UI Framework  
- **Inertia.js** – Penghubung Laravel & React tanpa REST API  
- **TailwindCSS** – Utility-first CSS framework  
- **MySQL** – Database

---

## 📌 Fitur Utama
- ➕ Tambah Siswa  
- ✏️ Edit Siswa  
- ❌ Hapus Siswa  
- 📤 Export Data Siswa (Excel)  
- 📥 Import Data Siswa (Excel)  
- 🔍 Validasi Data Siswa  
- 🌙 Dark Mode (opsional, jika diaktifkan)

---

## 🛠 Instalasi

```bash
git clone https://github.com/alf4ridzi/dapos
cd dapos
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
composer run dev
```

## Gallery
![Dashboard](docs/2025-11-28_18-01.png)

## Licensi
Proyek ini dirilis di bawah MIT License.
