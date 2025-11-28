<?php

namespace App\Http\Controllers;

use App\Models\Status;
use App\Models\Student;
use DB;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiswaController extends Controller
{
    //
    public function index()
    {
        $students = Student::with(["status"])->get();
        $status = Status::all();

        $data = [
            "students" => $students,
            "status" => $status,
        ];

        return Inertia::render("Siswa", $data);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => "required|string",
            "gender" => "required|string|max:1",
            "birth_date" => "required|date",
            "biological_mother" => "required|string",
            "nik" => "required|integer",
            "nisn" => "required|integer",
            "grade" => "required|string",
            "status_id" => "required|integer",
            "file" => "nullable|file",
        ]);

        DB::beginTransaction();

        try {
            Student::create($validated);
            DB::commit();
            return back()->with("success", "berhasil menambah siswa");
        } catch (Exception $e) {
            DB::rollBack();
            return back()->with("error", $e->getMessage());
        }
    }
}
