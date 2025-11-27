<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    //

    public function student() {
        return $this->hasOne(Student::class);
    }
}
