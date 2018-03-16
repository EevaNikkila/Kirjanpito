<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Task;
use App\Work;
use App\Customer;
use App\Http\Controllers\Controller;
use App\Repositories\TaskRepository;
use App\Repositories\AccountRepository;

class AssignmentController extends Controller
{
    protected $assignments;

    public function __construct(TaskRepository $tasks)
    {
        $this->middleware('auth');
        $this->assignments = $tasks;

    }

    public function index(Request $request)
    {
        return view('assignments', [
          'user' => $request->user()->id
        ]);
    }

    public function all(Request $request){

        return $this->assignments->forUser($request->user());
    }

    public function allWorks(Request $request){

        return $this->assignments->worksForUser($request->user());
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
        Task::create([
            'name' => $postdata->name,
            'price' => $postdata->price,
            'unit' => $postdata->unit,
            'user_id' => $postdata->user_id
        ]);

        return $this->all($request);
    }

    public function destroy(Request $request)
    {
      $request_content = $request->getContent();
      $post_data = json_decode($request_content);
        Task::where('id', $post_data->id)->delete();
        return $this->all($request);
    }


    public function update(Request $request)
    {
      $request_content = $request->getContent();
      $postdata = json_decode($request_content);
        Task::where('id', $postdata->id)
            ->update(array(
            'name' => $postdata->name,
            'price' => $postdata->price,
            'unit' => $postdata->unit));
        return $this->all($request);
    }

    // Tietojen tallennus tietokantaan
        public function storeWork(Request $request)
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
            Work::create([
                'description' => $postdata->description,
                'amount' => $postdata->amount,
                'date' => $postdata->date,
                'user_id' => $postdata->user_id,
                'customer_id' => $postdata->customer_id,
                'task_id' => $postdata->task_id
            ]);

            return $this->allWorks($request);
        }

        public function destroyWork(Request $request)
        {
          $request_content = $request->getContent();
          $post_data = json_decode($request_content);
            Work::where('id', $post_data->id)->delete();
            return $this->allWorks($request);
        }


        public function updateWork(Request $request)
        {
          $request_content = $request->getContent();
          $postdata = json_decode($request_content);
            Work::where('id', $postdata->id)
                ->update(array(
                  'description' => $postdata->description,
                  'amount' => $postdata->amount,
                  'date' => $postdata->date,
                  'user_id' => $postdata->user_id,
                  'customer_id' => $postdata->customer_id,
                  'task_id' => $postdata->task_id
              ));
            return $this->allWorks($request);
        }
}
