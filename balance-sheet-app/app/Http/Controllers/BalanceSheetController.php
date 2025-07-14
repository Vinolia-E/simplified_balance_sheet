<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BalanceSheetController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        return Inertia::render('BalanceSheet/Index', [
            'assets' => $user->assets()->latest()->get(),
            'liabilities' => $user->liabilities()->latest()->get(),
            'totalAssets' => $user->total_assets,
            'totalLiabilities' => $user->total_liabilities,
            'netWorth' => $user->net_worth,
        ]);
    }
}