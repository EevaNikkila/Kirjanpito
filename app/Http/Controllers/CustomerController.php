<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Customer;
use App\Http\Controllers\Controller;
use App\Repositories\CustomerRepository;

class CustomerController extends Controller
{
    protected $customers;

    public function __construct(CustomerRepository $customers)
    {
        $this->middleware('auth');
        $this->customers = $customers;
    }

    public function index(Request $request)
    {
        return view('customers', [
            'customers' => $this->customers->forUser($request->user()), 'user' => $request->user()->id
        ]);
    }

    public function all(Request $request){
        return $this->customers->forUser($request->user());
    }

    public function store(Request $request)
    {
      $request_content = $request->getContent();
      $postdata = json_decode($request_content);
        Customer::create([
            'name' => $postdata->name,
            'address' => $postdata->address,
            'email' => $postdata->email,
            'user_id' => $postdata->user_id,
            'phone' => $postdata->phone,
            'businessID' => $postdata->businessID
        ]);

        return $this->all($request);
    }

    public function destroy(Request $request)
    {
      $request_content = $request->getContent();
      $postdata = json_decode($request_content);
        Customer::where('id', $postdata->id)->delete();
        return $this->all($request);
    }

    public function update(Request $request)
    {
      $request_content = $request->getContent();
      $postdata = json_decode($request_content);
        Customer::where('id', $postdata->id)
            ->update(array('name' => $postdata->name,
            'address' => $postdata->address,
            'phone' => $postdata->phone,
            'email' => $postdata->email,
            'businessID' => $postdata->businessID));
        return $this->all($request);
    }
}
