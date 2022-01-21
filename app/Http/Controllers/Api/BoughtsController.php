<?php
namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Bought;
use App\Models\Product;

class ProductsController extends Controller
{
    /**
     * Lista todas las compras del usuario.
     */
    public function index() {
        return Bought::where('user_id', Auth::user()->id)->orderBy('created_at', 'desc')->get();
    }
    /**
     * Realiza la compra de un producto.
     */
    public function store($id, Request $request) {
        $product = Product::findOrFail($id);
        return Bought::create([
            'user_id' => Auth::user()->id,
            'product_id' => $product->id,
            'invoice_id' => NULL
        ]);
    }
}