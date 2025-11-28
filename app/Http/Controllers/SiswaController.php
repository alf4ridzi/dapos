<?php

namespace App\Http\Controllers;

use App\Imports\StudentImport;
use App\Models\Status;
use App\Models\Student;
use DB;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

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

    public function update(Request $request, $id)
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
        ]);

        DB::beginTransaction();

        try {
            $student = Student::where("id", $id)->firstOrFail();

            $student->update($validated);

            DB::commit();
            return back()->with("success", "berhasil update data");
        } catch (Exception $e) {
            DB::rollBack();
            return back()->with("error", $e->getMessage());
        }
    }

    public function import(Request $request)
    {
        $request->validate([
            "file" => "required|mimes:xlsx,csv,xls|max:2048",
        ]);

        Excel::import(new StudentImport(), $request->file);

        return back()->with("success", "berhasil mengimpor data!");
    }

    public function destroy($id)
    {
        $student = Student::find($id);
        if ($student) {
            $student->delete();
        }

        return back()->with("success", "berhasil hapus data!");
    }
}
