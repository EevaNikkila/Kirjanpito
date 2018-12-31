<?php

namespace App\Repositories;

use App\User;
use App\Transaction;

class TransactionRepository {

  // Get transactions for a single user
  public function forUser(User $user) {
      return Transaction::where('user_id', $user->id)
                      ->orderBy('created_at', 'desc')
                      ->get();
  }

  // Get transaction
  public function getTransaction(Transaction $transaction) {
      return Transaction::where('id', $transaction->id)->get();
  }
  
public function getUsers() {
        return User::orderBy('created_at', 'desc')->get();
    }
}
