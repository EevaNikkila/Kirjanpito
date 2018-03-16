<?php

namespace App\Repositories;

use App\Task;
use App\User;
use App\Work;

class TaskRepository {

  // Get customers for a single user
  public function forUser(User $user) {
      return Task::where('user_id', $user->id)
                      ->orderBy('created_at', 'desc')
                      ->get();
  }

  // Get task
  public function getAssignment(Task $task) {
      return Task::where('id', $task->id)->get();
  }

  // Get assignment
  public function worksForUser(User $user) {
      return Work::where('user_id', $user->id)
                      ->orderBy('created_at', 'desc')
                      ->get();
  }
}
