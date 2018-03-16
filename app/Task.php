<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['name', 'price', 'unit', 'user_id' => 'int'];
    protected $casts = [
        'id' => 'int'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
