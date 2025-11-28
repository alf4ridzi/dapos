<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    //
    protected $fillable = [
        "name",
        "gender",
        "birth_date",
        "biological_mother",
        "nik",
        "nisn",
        "grade",
        "status_id",
    ];

    public function status()
    {
        return $this->belongsTo(Status::class, "status_id");
    }
}
