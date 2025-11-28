<?php

namespace App\Imports;

use App\Models\Status;
use App\Models\Student;
use Maatwebsite\Excel\Concerns\ToModel;

class StudentImport implements ToModel
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        if ($row[0] === "nama") {
            return null;
        }

        $statusName = ucfirst(strtolower(trim($row[7])));

        $status = Status::where("name", $statusName)->first();
        if (!$status) {
            $status = Status::where("name", "Aktif")->first();
        }

        return new Student([
            "nama" => $row[0],
            "gender" => $row[1],
            "birth_date" => $row[2],
            "biological_mother" => $row[3],
            "nik" => $row[4],
            "nisn" => $row[5],
            "grade" => $row[6],
            "status_id" => $status->id,
        ]);
    }
}
