<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = ['name', 'address', 'phone', 'email', 'businessID', 'user_id'];
    protected $casts = [
        'id' => 'int'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
