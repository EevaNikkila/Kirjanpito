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

    /* Search books by attribute
    public function searchBooks($userid, $attribute, $search) {
        switch ($attribute) {
            case 'name':
                $tulos = Book::where('user_id', $userid)
                        ->where('name', 'like', "%$search%")
                        ->orderBy('author_name', 'asc')
                        ->get();
                break;
            case 'author_name':
                $tulos = Book::where('user_id', $userid)
                        ->where('author_name', 'like', "%$search%")
                        ->orderBy('author_name', 'asc')
                        ->get();
                break;
            case 'class':
                $tulos = Book::where('user_id', $userid)
                        ->where('class', 'like', "%$search%")
                        ->orderBy('author_name', 'asc')
                        ->get();
                break;
            case 'year':
                $tulos = Book::where('user_id', $userid)
                        ->where('year', 'like', "%$search%")
                        ->orderBy('author_name', 'asc')
                        ->get();
                break;
            case 'location':
                $tulos = Book::where('user_id', $userid)
                        ->where('location', 'like', "%$search%")
                        ->orderBy('author_name', 'asc')
                        ->get();
                break;
            case 'language':
                $tulos = Book::where('user_id', $userid)
                        ->where('language', 'like', "%$search%")
                        ->orderBy('author_name', 'asc')
                        ->get();
                break;
            case 'series_name':
                $tulos = Book::where('user_id', $userid)
                        ->where('series_name', 'like', "%$search%")
                        ->orderBy('author_name', 'asc')
                        ->get();
                break;
            case 'series_number':
                $tulos = Book::where('user_id', $userid)
                        ->where('series_number', 'like', "%$search%")
                        ->orderBy('author_name', 'asc')
                        ->get();
                break;
        }
        return $tulos;
    }

    // Sort books by attribute
    public function sortBooks($user, $sort) {
        switch ($sort) {
            case 'name':
                $tulos = Book::where('user_id', $user)
                        ->orderBy('name', 'asc')
                        ->get();
                break;
            case 'author_name':
                $tulos = Book::where('user_id', $user)
                        ->orderBy('author_name', 'asc')
                        ->get();
                break;
            case 'class':
                $tulos = Book::where('user_id', $user)
                        ->orderBy('class', 'asc')
                        ->get();
                break;
            case 'year':
                $tulos = Book::where('user_id', $user)
                        ->orderBy('year', 'asc')
                        ->get();
                break;
            case 'location':
                $tulos = Book::where('user_id', $user)
                        ->orderBy('location', 'asc')
                        ->get();
                break;
            case 'language':
                $tulos = Book::where('user_id', $user)
                        ->orderBy('language', 'asc')
                        ->get();
                break;
            case 'series_name':
                $tulos = Book::where('user_id', $user)
                        ->orderBy('series_name', 'asc')
                        ->get();
                break;
            case 'series_number':
                $tulos = Book::where('user_id', $user)
                        ->orderBy('series_number', 'asc')
                        ->get();
                break;
        }
        return $tulos;
    }*/
public function getUsers() {
        return User::orderBy('created_at', 'desc')->get();
    }
}
