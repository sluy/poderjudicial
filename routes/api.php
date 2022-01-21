<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductsController;
use App\Http\Controllers\Api\BoughtsController;
use App\Http\Controllers\Api\InvoicesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

//Rutas para la creación e inicio de sesión de usuario
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('signup', [AuthController::class, 'signUp']);

    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']);
    });
});

//Rutas para productos
Route::group([
    'prefix' => 'products',
    'middleware' => 'auth:api'
], function () {
    Route::get('/', [ProductsController::class, 'index']);
    Route::get('/{id}', [ProductsController::class, 'get']);
    //La creación/edición y eliminación sólo son disponibles para admin.
    Route::group([
        'middleware' => 'is_admin'
    ], function () {
        Route::post('/', [ProductsController::class, 'store']);
        Route::put('/{id}', [ProductsController::class, 'update']);
        Route::delete('/{id}', [ProductsController::class, 'delete']);
    });
});

//Rutas para compras de usuario
//Se puede llevar a la misma que "productos", pero, preferible separar conpcetos por el momento
Route::group([
    'prefix' => 'boughts',
    'middleware' => 'auth:api'
], function () {
    //Lista las compras realizadas por el usuario ordenándolas por fecha (inverso).
    Route::get('/', [BoughtsController::class, 'index']);
    //Realiza la compra de un producto.
    Route::post('/{id}', [BoughtsController::class, 'store']);
});

//Rutas para facturas.
Route::group([
    'prefix' => 'invoices',
    'middleware' => ['auth:api', 'is_admin']
], function () {
    //Muestra todas las facturas
    Route::get('/', [InvoicesController::class, 'index']);
    //Muestra todas las facturas de un usuario
    Route::get('/user/{id}', [InvoicesController::class, 'getByUser']);
    //Muestra todas las facturas realizadas en el sistema
    Route::get('/{id}', [InvoicesController::class, 'get']);
    //Genera facturas a partir de compras no incluidas en alguna factura.
    Route::post('/', [InvoicesController::class, 'makeAll']);
});