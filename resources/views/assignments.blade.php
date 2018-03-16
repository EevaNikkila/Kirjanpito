@extends('layouts.app')

@section('content')
<div class="container">
  <div id="errors" class="alert alert-danger"></div>
  <div id="success" class="alert alert-success"></div>
  <div class="row">
    <div class="col-md-8" id="works"></div>
    <div class="col-md-4" id="tasks"></div>
  </div>

  <div id="modal" class="modal"></div>
</div>
<script type="text/babel" src="../../resources/assets/js/Assignments.js"></script>
<script type="text/babel" src="../../resources/assets/js/Works.js"></script>
<script type="text/javascript">
			$(function() {
        var user = {{ $user }};
			});
</script>
@endsection
