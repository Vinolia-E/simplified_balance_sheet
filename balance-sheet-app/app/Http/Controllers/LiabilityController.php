<?php

namespace App\Http\Controllers;

use App\Models\Liability;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LiabilityController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
        ]);

        auth()->user()->liabilities()->create([
            'name' => $request->name,
            'amount' => $request->amount,
        ]);

        return redirect()->route('balance-sheet.index');
    }

    public function update(Request $request, Liability $liability)
    {
        $this->authorize('update', $liability);

        $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
        ]);

        $liability->update([
            'name' => $request->name,
            'amount' => $request->amount,
        ]);

        return redirect()->route('balance-sheet.index');
    }

    public function destroy(Liability $liability)
    {
        $this->authorize('delete', $liability);
        
        $liability->delete();

        return redirect()->route('balance-sheet.index');
    }
}
