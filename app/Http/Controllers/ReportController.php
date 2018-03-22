<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Transaction;
use App\Account;
use App\Http\Controllers\Controller;
use App\Repositories\TransactionRepository;

class ReportController extends Controller
{
    protected $transactions;

    public function __construct(TransactionRepository $transactions)
    {
        $this->middleware('auth');
        $this->transactions = $transactions;
    }

    public function index(Request $request)
    {
        return view('reports', [
          'user' => $request->user()->id
        ]);
    }

    public function all(Request $request){
        return $this->transactions->forUser($request->user());
    }
}
