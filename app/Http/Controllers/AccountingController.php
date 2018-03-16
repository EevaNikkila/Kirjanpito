<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Transaction;
use App\Account;
use App\Http\Controllers\Controller;
use App\Repositories\TransactionRepository;

class AccountingController extends Controller
{
    protected $transactions;

    public function __construct(TransactionRepository $transactions)
    {
        $this->middleware('auth');
        $this->transactions = $transactions;
    }

    public function index(Request $request)
    {
        return view('accounting', [
          'user' => $request->user()->id
        ]);
    }

    public function all(Request $request){
        return $this->transactions->forUser($request->user());
    }

// Tietojen tallennus tietokantaan
    public function store(Request $request)
    {
      /*$this->validate($request, [
            'name' => 'required|max:255',
            'address' => 'max:500',
            'email' => 'max:255',
            'phone' => 'max:255',
            'user_id' => 'required',
            'businessID' => 'max:255',
        ]);*/
        $request_content = $request->getContent();
        $postdata = json_decode($request_content);
        Transaction::create([
            'account_id' => $postdata->account,
            'date' => $postdata->date,
            'place' => $postdata->place,
            'amount' => $postdata->amount,
            'VAT' => $postdata->vat,
            'description' => $postdata->description,
            'user_id' => $postdata->user_id,
            'target' => $postdata->target
        ]);

        return;
    }

    public function destroy(Request $request)
    {
      $request_content = $request->getContent();
      $post_data = json_decode($request_content);
        Transaction::where('id', $post_data->id)->delete();
        return;
    }


    public function update(Request $request)
    {
      $request_content = $request->getContent();
      $postdata = json_decode($request_content);
        Transaction::where('id', $postdata->id)
            ->update(array('account_id' => $postdata->account,
            'date' => $postdata->date,
            'place' => $postdata->place,
            'amount' => $postdata->amount,
            'VAT' => $postdata->vat,
            'description' => $postdata->description,
            'user_id' => $postdata->user_id,
            'target' => $postdata->target));
        return;
    }
}
