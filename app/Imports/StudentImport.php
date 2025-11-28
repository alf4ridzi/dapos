<?php

namespace App\Imports;

use App\Models\Student;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use PhpOffice\PhpSpreadsheet\Shared\Date as ExcelDate;

class StudentImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return new Student([
            "name" => $row["nama"],
            "gender" => $row["gender"],
            "birth_date" => $this->parseDate($row["birth_date"]),
            "biological_mother" => $row["biological_mother"],
            "nik" => strval($row["nik"]),
            "nisn" => strval($row["nisn"]),
            "grade" => $row["grade"],
            "status_id" => $this->parseStatus($row["status"]),
        ]);
    }

    private function parseDate($value)
    {
        if (!$value) {
            return null;
        }

        if (is_numeric($value)) {
            return ExcelDate::excelToDateTimeObject($value)->format("Y-m-d");
        }

        try {
            return Carbon::createFromFormat("n/j/Y", $value)->format("Y-m-d");
        } catch (\Exception $e) {
        }

        try {
            return Carbon::createFromFormat("n/j/y", $value)->format("Y-m-d");
        } catch (\Exception $e) {
        }

        return Carbon::parse($value)->format("Y-m-d");
    }

    private function parseStatus($value)
    {
        return match (strtolower($value)) {
            "aktif" => 1,
            "keluar" => 2,
            "terdaftar" => 3,
            "lulus" => 4,
            default => 3,
        };
    }
}
