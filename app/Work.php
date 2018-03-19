<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
    protected $fillable = ['description', 'amount', 'date', 'customer_id', 'user_id', 'task_id', 'billed'];
    protected $casts = [
        'id' => 'int',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
