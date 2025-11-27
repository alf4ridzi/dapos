<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("students")->insert([

            [
                "name" => "Muhammad Alfaridzi",
                "gender" => "L",
                "birth_date" => "2007-12-21",
                "biological_mother" => "Ada Intinya",
                "nik" => 1234567890121212,
                "nisn" => 123123123,
                "grade" => "12 SMK",
                "status_id" => 2,
            ],
            ["name" => "Aulia Rahmawati", "gender" => "P", "birth_date" => "2008-05-11", "biological_mother" => "Siti Aisyah", "nik" => 3201456789123456, "nisn" => 882194001, "grade" => "10 SMK", "status_id" => 3],
            ["name" => "Rizky Maulana", "gender" => "L", "birth_date" => "2007-11-04", "biological_mother" => "Nur Hasanah", "nik" => 3175098765432101, "nisn" => 882194002, "grade" => "11 SMK", "status_id" => 2],
            ["name" => "Siti Khadijah", "gender" => "P", "birth_date" => "2009-02-19", "biological_mother" => "Lina Marlina", "nik" => 3301123456789987, "nisn" => 882194003, "grade" => "10 SMK", "status_id" => 3],
            ["name" => "Fajar Pratama", "gender" => "L", "birth_date" => "2008-07-28", "biological_mother" => "Tuti Rohayati", "nik" => 3201987654321123, "nisn" => 882194004, "grade" => "12 SMK", "status_id" => 2],
            ["name" => "Nabila Zahara", "gender" => "P", "birth_date" => "2006-09-02", "biological_mother" => "Rina Lestari", "nik" => 3210456798123400, "nisn" => 882194005, "grade" => "12 SMK", "status_id" => 1],
            ["name" => "Bintang Ramadhan", "gender" => "L", "birth_date" => "2008-01-15", "biological_mother" => "Rahayu Sari", "nik" => 3175987654321678, "nisn" => 882194006, "grade" => "10 SMK", "status_id" => 3],
            ["name" => "Putri Anggraini", "gender" => "P", "birth_date" => "2007-04-29", "biological_mother" => "Sulastri", "nik" => 3301567890123401, "nisn" => 882194007, "grade" => "11 SMK", "status_id" => 2],
            ["name" => "Raka Firmansyah", "gender" => "L", "birth_date" => "2009-03-31", "biological_mother" => "Yeni Marlina", "nik" => 3201678945210034, "nisn" => 882194008, "grade" => "10 SMK", "status_id" => 4],
            ["name" => "Nadila Fadilah", "gender" => "P", "birth_date" => "2006-12-12", "biological_mother" => "Murniati", "nik" => 3212987654311120, "nisn" => 882194009, "grade" => "12 SMK", "status_id" => 1],
            ["name" => "Rendi Kurniawan", "gender" => "L", "birth_date" => "2007-08-09", "biological_mother" => "Ida Farida", "nik" => 3174567890123012, "nisn" => 882194010, "grade" => "11 SMK", "status_id" => 2],
            ["name" => "Aisyah Fitria", "gender" => "P", "birth_date" => "2008-10-14", "biological_mother" => "Neneng Sari", "nik" => 3201908765432200, "nisn" => 882194011, "grade" => "10 SMK", "status_id" => 3],
            ["name" => "Gilang Saputra", "gender" => "L", "birth_date" => "2008-03-25", "biological_mother" => "Yuni Hartati", "nik" => 3301678954321899, "nisn" => 882194012, "grade" => "11 SMK", "status_id" => 2],
            ["name" => "Anisa Lestari", "gender" => "P", "birth_date" => "2007-06-06", "biological_mother" => "Desi Komalasari", "nik" => 3210789456123400, "nisn" => 882194013, "grade" => "12 SMK", "status_id" => 3],
            ["name" => "Rafi Akbar", "gender" => "L", "birth_date" => "2009-01-22", "biological_mother" => "Heni Marlina", "nik" => 3176123456789001, "nisn" => 882194014, "grade" => "10 SMK", "status_id" => 4],
            ["name" => "Salma Nurhaliza", "gender" => "P", "birth_date" => "2006-04-03", "biological_mother" => "Rika Setiani", "nik" => 3201345678923400, "nisn" => 882194015, "grade" => "12 SMK", "status_id" => 1],
            ["name" => "Andi Wijaya", "gender" => "L", "birth_date" => "2008-05-30", "biological_mother" => "Susi Apriani", "nik" => 3301678945123489, "nisn" => 882194016, "grade" => "11 SMK", "status_id" => 2],
            ["name" => "Dewi Sartika", "gender" => "P", "birth_date" => "2007-02-18", "biological_mother" => "Novita Sari", "nik" => 3210567890123402, "nisn" => 882194017, "grade" => "10 SMK", "status_id" => 3],
            ["name" => "Farhan Ramdani", "gender" => "L", "birth_date" => "2008-08-27", "biological_mother" => "Ana Komariah", "nik" => 3173234567890012, "nisn" => 882194018, "grade" => "12 SMK", "status_id" => 2],
            ["name" => "Mira Ayu Lestari", "gender" => "P", "birth_date" => "2006-11-10", "biological_mother" => "Siti Maryam", "nik" => 3201123456783345, "nisn" => 882194019, "grade" => "12 SMK", "status_id" => 1],
            ["name" => "Yoga Prasetyo", "gender" => "L", "birth_date" => "2009-04-21", "biological_mother" => "Wati Suryani", "nik" => 3301546789200456, "nisn" => 882194020, "grade" => "10 SMK", "status_id" => 4],

        ]);
    }
}
