<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
            'name' => "Producto 1",
            'price' => '123.45',
            'tax' => '5.00',
            'enabled' => true
        ]);
        
        DB::table('products')->insert([
            'name' => "Producto 2",
            'price' => '46.65',
            'tax' => '15.00',
            'enabled' => true
        ]);
        
        DB::table('products')->insert([
            'name' => "Producto 3",
            'price' => '39.73',
            'tax' => '12.00',
            'enabled' => true
        ]);
        
        DB::table('products')->insert([
            'name' => "Producto 4",
            'price' => '250.00',
            'tax' => '8.00',
            'enabled' => true
        ]);
        
        DB::table('products')->insert([
            'name' => "Producto 5",
            'price' => '59.35',
            'tax' => '10.00',
            'enabled' => true
        ]);
    }
}
