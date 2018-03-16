<?php

namespace App\Repositories;

use App\User;

class UserRepository {

// Get books for a single user
    public function getUsers() {
        return User::orderBy('created_at', 'desc')->get();
    }

}
