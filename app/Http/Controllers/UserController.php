<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Requests;
use App\User;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    protected $user;

    public function index(Request $request)
    {
      $users = DB::table('users')->get();

      return view('user.index', ['users' => $users]);
    }
    // Fetches the current user, can be used through api/user
    public function getUser(Request $request)
    {
      return $request->user()->id;
    }

}
