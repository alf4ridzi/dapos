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
        //
        DB::table("students")->insert([
            [
                "name" => "Muhammad Alfaridzi",
                "gender" => "L",
                "birth_date" => "2007/12/21",
                "biological_mother" => "ada intinya",
                "nik" => 12345678901212,
                "nisn" => 123123123,
                "grade" => "12 SMK",
                "status" => "aktif",
            ],
        ]);
    }
}
