<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiswaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get("/", function () {
//     return Inertia::render("Welcome", [
//         "canLogin" => Route::has("login"),
//         "canRegister" => Route::has("register"),
//         "laravelVersion" => Application::VERSION,
//         "phpVersion" => PHP_VERSION,
//     ]);
// });

// Route::get("/dashboard", function () {
//     return Inertia::render("Dashboard");
// })
//     ->middleware(["auth", "verified"])
//     ->name("dashboard");

Route::middleware(["auth", "verified"])->group(function () {
    Route::get("/", [SiswaController::class, "index"])->name("dashboard");
    Route::post("/siswa", [SiswaController::class, "store"])->name(
        "siswa.store",
    );
    Route::post("/siswa/import", [SiswaController::class, "import"])->name(
        "siswa.import",
    );
});

Route::middleware("auth")->group(function () {
    Route::get("/profile", [ProfileController::class, "edit"])->name(
        "profile.edit",
    );
    Route::patch("/profile", [ProfileController::class, "update"])->name(
        "profile.update",
    );
    Route::delete("/profile", [ProfileController::class, "destroy"])->name(
        "profile.destroy",
    );
});

require __DIR__ . "/auth.php";
