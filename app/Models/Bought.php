<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bought extends Model {

    protected $fillable = [
        'user_id',
        'product_id',
        'invoice_id'
    ];
}
