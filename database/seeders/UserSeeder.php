<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => "sysop",
            'email' => 'admin@email.com',
            'password' => Hash::make('admin'),
            'admin' => true
        ]);
        for ($n = 1; $n < 4; $n++) {
            DB::table('users')->insert([
                'name' => 'user' . $n,
                'email' => 'user'. $n . '@email.com',
                'password' => Hash::make('user' . $n),
                'admin' => false
            ]);
        }        
    }
}
