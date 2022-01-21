<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;

class ProductsController extends Controller
{

    public function index (Request $request) {
        return Product::all();
    }

    public function get($id, Request $request) {
        return Product::findOrFail($id);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:64',
            'info' => 'string|max:255',
            'price' => 'required|numeric',
            'tax' => 'required|numeric',
            'enabled' => 'boolean'
        ]);
        return Product::create([
            'name' => $request->name,
            'info' => $request->info,
            'price' => $this->formatNumber($request->price),
            'tax' => $this->formatNumber($request->tax),
            'enabled' => $request->enabled,
        ]);
    }
    
    public function update($id, Request $request) {
        $product = Product::findOrFail($id);
        $request->validate([
            'name' => 'required|string|max:64',
            'info' => 'string|max:255',
            'price' => 'required|numeric',
            'tax' => 'required|numeric',
            'enabled' => 'boolean'
        ]);
        $product->name = $request->name;
        $product->info = $request->info;
        $product->price = $this->formatNumber($request->price);
        $product->tax = $request->tax;
        $product->enabled = $request->enabled;
        $product->save();
        return $product;
    }

    public function delete($id, Request $request) {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully.']);
    }

    protected function formatNumber($raw) {
        return number_format((float)$raw, 2, '.', '');
    }
}