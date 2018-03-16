<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Account;
use App\Http\Controllers\Controller;
use App\Repositories\AccountRepository;

class AccounttypeController extends Controller
{
    protected $accounts;

    public function __construct(AccountRepository $accounts)
    {
        $this->middleware('auth');
        $this->accounts = $accounts;
    }

    public function all(Request $request){
        return $this->accounts->getAccounts();
    }

}
