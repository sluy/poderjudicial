<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Invoice;
use App\Models\Bought;
use App\Models\User;
use App\Models\Product;
use Carbon\Carbon;


class InvoicesController extends Controller
{
    /**
     * Devuelve todas las facturas por orden cronológico.
     */
    public function index (Request $request) {
        return Invoice::orderBy('created_at', 'desc')->with('user')->get();
    }
    /**
     * Devuelve la info de una factura.
     */
    public function get($id) {
        return Invoice::where('id',$id)->with(['boughts.product', 'user'])->firstOrFail();
    }
    /**
     * Devuelve todas las facturas asociadas a un usuario en particular.
     */
    public function getByUser ($id) {
        return Invoice::where('user_id', $id)->orderBy('created_at', 'desc')->get();
    }
    /**
     * Genera todas las facturas para usuarios cuyos productos comprados no han sido
     * incluidos en ninguna factura aún.
     */
    public function makeAll() {
        $done = [];
        foreach(Bought::whereNull('invoice_id')->orderBy('created_at')->get() as $bought) {
            if (in_array($bought->user_id, $done)) {
                continue;
            }
            if ($this->makeUserInvoice($bought->user_id)) {
                $done[] = $bought->user_id;
            }
        }
        return response()->json([
            'count' => count($done)
        ]);
    }


    protected function makeUserInvoice($userId) {
        $boughts = Bought::whereNull('invoice_id')->where('user_id', $userId)->orderBy('created_at')->get();
        if (empty($boughts)) {
            //no habian compras por anexar a la factura, ignoramos.
            return false;
        }

        $totalTax = 0;
        $totalPrice = 0;
        $totalSinglePrice = 0;

        $date = Carbon::now()->toDateTimeString();

        $invoice = Invoice::create([
            'user_id' => $userId,
            'total_price' => '0.00',
            'total_tax' => '0.00',
            'single_price' => '0.00'
        ]);

        foreach ($boughts as $bought) {
            $product = Product::find($bought->product_id);
            if (!$product) {
                continue;
            }
            //Anexamos la factura a la compra para futuras vueltas.
            $bought->invoice_id = $invoice->id;
            $bought->save();

            //impuesto del producto
            $taxPrice = ((float) $product->tax * (float) $product->price) / 100;
            // precio sin impuesto
            $singlePrice = (float) $product->price - $taxPrice;
            // añadimos al total del impuesto
            $totalTax += $taxPrice;
            $totalSinglePrice += $singlePrice;
            $totalPrice += $product->price;
        }
        //Actualizamos los totales almacenados en la factura con doble precisión.
        $invoice->total_price = $this->formatNumber($totalPrice);
        $invoice->total_tax = $this->formatNumber($totalTax);
        $invoice->single_price = $this->formatNumber($totalSinglePrice);
        $invoice->save();
        //Devolvemos ok
        return true;
    }
    /**
     * Formatea el numero a doble decimal; debería ir en un helper
     * para cumplir con DRY, pero por velocidad... se encuentra en varios controladores.
     */
    protected function formatNumber($raw) {
        return number_format((float)$raw, 2, '.', '');
    }
}