<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = ['place', 'VAT', 'target', 'description', 'amount', 'date', 'user_id', 'account_id'];
    protected $casts = [
        'id' => 'int'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
