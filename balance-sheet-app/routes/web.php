<?php

use App\Http\Controllers\AssetController;
use App\Http\Controllers\BalanceSheetController;
use App\Http\Controllers\LiabilityController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [BalanceSheetController::class, 'index'])->name('dashboard');
    Route::get('/balance-sheet', [BalanceSheetController::class, 'index'])->name('balance-sheet.index');
    
    Route::post('/assets', [AssetController::class, 'store'])->name('assets.store');
    Route::put('/assets/{asset}', [AssetController::class, 'update'])->name('assets.update');
    Route::delete('/assets/{asset}', [AssetController::class, 'destroy'])->name('assets.destroy');
    
    Route::post('/liabilities', [LiabilityController::class, 'store'])->name('liabilities.store');
    Route::put('/liabilities/{liability}', [LiabilityController::class, 'update'])->name('liabilities.update');
    Route::delete('/liabilities/{liability}', [LiabilityController::class, 'destroy'])->name('liabilities.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';