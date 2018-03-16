@extends('layouts.app')

@section('content')
<div class="container">
  <div id="errors" class="alert alert-danger"></div>
  <div id="success" class="alert alert-success"></div>
  <div id="content"></div>
  <div id="modal" class="modal"></div>
</div>
<script type="text/babel" src="../../resources/assets/js/Accounting.js"></script>
<script type="text/javascript">
			$(function() {
        var user = {{ $user }};
				// Setup the _token for JavaScript ajax requests
				// This is needed for Laravel, because Posts etc. won't work without this.
				/*$.ajaxSetup({
					headers: {
						'X-CSRF-Token':$('meta[name="csrf-token"]').attr('content')
					}
				});*/
			});
</script>
@endsection
