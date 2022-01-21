<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model {

    protected $fillable = [
        'total_price',
        'total_tax',
        'single_price'
    ];
}
