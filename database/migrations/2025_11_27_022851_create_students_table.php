<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("students", function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->char("gender");
            $table->date("birth_date");
            $table->string("biological_mother");
            $table->bigInteger("nik");
            $table->bigInteger("nisn");
            $table->string("grade");
            $table
                ->enum("status", ["lulus", "aktif", "terdaftar", "keluar"])
                ->default("terdaftar");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("students");
    }
};
