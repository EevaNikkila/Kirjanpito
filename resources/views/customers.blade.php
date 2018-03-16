@extends('layouts.app')

@section('content')
<div class="container">
  <div id="errors" class="alert alert-danger"></div>
  <div id="success" class="alert alert-success"></div>
  <div id="content"></div>
  <div id="modal" class="modal"></div>
</div>
<script type="text/babel" src="../../resources/assets/js/Customers.js"></script>
<script type="text/javascript">
			$(function() {
        var user = {{ $user }};
			});
</script>
@endsection
