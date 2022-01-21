<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model {

    protected $fillable = [
        'user_id',
        'total_price',
        'total_tax',
        'single_price'
    ];

    public function user () {
        return $this->belongsTo(User::class);
    }

    public function boughts () {
        return $this->hasMany(Bought::class);
    }
}
