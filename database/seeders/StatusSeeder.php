<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table("statuses")->insert([
            [
                'name' => 'Lulus'
            ],
            [
                'name' => 'Aktif'
            ],
            [
                'name' => 'Terdaftar'
            ],
            [
                'name' => 'Keluar'
            ]
        ]);
    }
}
