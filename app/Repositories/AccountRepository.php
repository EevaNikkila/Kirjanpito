<?php

namespace App\Repositories;

use App\Account;

class AccountRepository {

// Get books for a single user
    public function getAccounts() {
        return Account::orderBy('created_at', 'desc')->get();
    }

}
