<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
        ]);

        auth()->user()->assets()->create([
            'name' => $request->name,
            'amount' => $request->amount,
        ]);

        return redirect()->route('balance-sheet.index');
    }

    public function update(Request $request, Asset $asset)
    {
        $this->authorize('update', $asset);

        $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
        ]);

        $asset->update([
            'name' => $request->name,
            'amount' => $request->amount,
        ]);

        return redirect()->route('balance-sheet.index');
    }

    public function destroy(Asset $asset)
    {
        $this->authorize('delete', $asset);
        
        $asset->delete();

        return redirect()->route('balance-sheet.index');
    }
}
