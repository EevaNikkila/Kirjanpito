<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

/* Authentication */

Route::get('/user', 'UserController@index');
Route::get('/logout', 'Auth\LoginController@logout');
Route::get('/api/user', 'UserController@getUser');

/* Customers */
Route::get('/customers', 'CustomerController@index');
Route::get('/api/customers', 'CustomerController@all');
Route::post('/api/customers', 'CustomerController@store');
Route::post('/api/customers/delete', 'CustomerController@destroy');
Route::post('/api/customers/edit', 'CustomerController@update');

/* Accounting */
Route::get('/accounting', 'AccountingController@index');
Route::get('/api/accounting', 'AccountingController@all');
Route::post('/api/accounting', 'AccountingController@store');
Route::post('/api/accounting/delete', 'AccountingController@destroy');
Route::post('/api/accounting/edit', 'AccountingController@update');

/* Account Types */
Route::get('/api/accounttypes', 'AccounttypeController@all');

/* Assignments */
Route::get('/assignments', 'AssignmentController@index');
Route::get('/api/assignments', 'AssignmentController@all');
Route::post('/api/assignments', 'AssignmentController@store');
Route::post('/api/assignments/delete', 'AssignmentController@destroy');
Route::post('/api/assignments/edit', 'AssignmentController@update');

Route::get('/api/works', 'AssignmentController@allWorks');
Route::post('/api/works', 'AssignmentController@storeWork');
Route::post('/api/works/delete', 'AssignmentController@destroyWork');
Route::post('/api/works/edit', 'AssignmentController@updateWork');

Route::auth();
