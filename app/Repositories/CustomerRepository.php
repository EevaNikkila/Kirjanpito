<?php

namespace App\Repositories;

use App\User;
use App\Customer;

class CustomerRepository {

  // Get customers for a single user
  public function forUser(User $user) {
      return Customer::where('user_id', $user->id)
                      ->orderBy('created_at', 'desc')
                      ->get();
  }

  // Get customer
  public function getCustomer(Customer $customer) {
      return Customer::where('id', $customer->id)->get();
  }

  public function getUsers() {
          return User::orderBy('created_at', 'desc')->get();
      }
}
