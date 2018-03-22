
// Render errors
class Errors extends React.Component{
	render() {
		$("#errors").show();
		return (
			<p>{ this.props.error }</p>
		);
	}
}

// Render success messages
class Success extends React.Component{
	render() {
		$("#success").fadeIn();
		setTimeout(function() {
        $("#success").fadeOut();
    }, 1500);
		return (
			<p>{ this.props.message }</p>
		);
	}
}

// One select option
class Option extends React.Component{
	render() {
		return (
			 <option value={this.props.value}>{this.props.text}</option>
		);
	}
}

// Edit modal
class EditModal extends React.Component{
	cancel(){
		$("#modal").hide();
		ReactDOM.render(
				<div></div>,
				document.getElementById('modal')
		);
	}
	constructor(props) {
    super(props);
    this.state = {date: this.props.date, amount: this.props.amount, onEdit: this.props.onEdit, input: "",
			description: this.props.description, customer_id: this.props.customer_id, billed: this.props.billed,
		task_id: this.props.task_id,  onDataSubmit: this.props.onDataSubmit};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
	handleChange(e){
		 this.setState({ [e.target.name]: e.target.value });
	}
	handleSubmit(e){
		e.preventDefault();
		var date = this.state.date;
		var amount = this.state.amount;
		if(!amount || !date){
			ReactDOM.render(
			    <Errors error='Määrä- ja Päivämäärä-kentät eivät voi olla tyhjiä!' />,
			    document.getElementById('errors')
			);
			return;
		}
		$("#errors").hide();
		this.state.onEdit({date: date, amount: amount, customer_id: this.state.customer_id,
			id: this.props.id, billed: this.state.billed,
			description: this.state.description, task_id: this.state.task_id, user_id: this.props.user});
	}
	render() {
		$("#modal").show();
		var customers = this.props.customers;
		var options = [];
		for (var i in customers) {
			var name = customers[i].name;
			var id = customers[i].id;
					options.push(<Option value={id} text={name} key={id}  />);
		}
		var tasks = this.props.tasks;
		var taskoptions = [];
		for (var i in tasks) {
			var name = tasks[i].name;
			var id = tasks[i].id;
					taskoptions.push(<Option value={id} text={name} key={id}  />);
		}
		return (
			<div className="mymodal">
			<div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
						<h4 className="modal-title">Muokkaa</h4>
						<button type="button" className="close" aria-label="Close" onClick={this.cancel}>
							<span aria-hidden="true">&times;</span>
						</button>

			      </div>
						<div className="editForm">
							<form className="form-horizontal" id="addform" onSubmit={this.handleSubmit}>
							<div className='form-group row'>
								<label htmlFor="customer_id" className='col-sm-4 col-form-label'>Asiakas</label>
									<select name='customer_id' value={this.state.customer_id} onChange={this.handleChange}>
									<option value="">Valitse asiakas</option>
									{options}
									</select>
							</div>
							<div className='form-group row'>
								<label htmlFor="task_id" className='col-sm-4 col-form-label'>Työ</label>
									<select name='task_id' value={this.state.task_id} onChange={this.handleChange}>
									<option value="">Valitse työ</option>
									{taskoptions}
									</select>
							</div>
							<div className='form-group row'>
								<label htmlFor="date" className='col-sm-4'>Päivämäärä</label>
								<input type="date" name="date" className='col-sm-6'
								value={this.state.date} onChange={this.handleChange} />
							</div>
								<div className='form-group row'>
									<label htmlFor="amount" className='col-sm-4'>Määrä</label>
									<input type="number" step="0.001" name="amount" className='col-sm-6'
									value={this.state.amount} onChange={this.handleChange} />
								</div>
								<div className='form-group row'>
									<label htmlFor="description" className='col-sm-4'>Kuvaus</label>
									<input type="text" name="description" className='col-sm-6'
									value={this.state.description} onChange={this.handleChange} />
								</div>
								<div className='form-group row'>
									<label htmlFor="billed" className='col-sm-4'>Laskutettu</label>
									<select value={this.state.billed} name="billed" className="col-cm-6" onChange={this.handleChange}>
										 <option value="0">Ei</option>
										 <option value="1">Kyllä</option>
							 	 </select>
								 </div>
									<input type="submit" className='btn btn-primary' name="addWorks" value="Muokkaa" />
							</form>
					</div>
			    </div>
			  </div>
			</div>
		);
	}
}

class DeleteModal extends React.Component{
	constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
		this.state = { onDelete: this.props.onDelete, id: this.props.id };
  }
	cancel(){
		ReactDOM.render(
				<div></div>,
				document.getElementById('modal')
		);
		$("#modal").hide();
	}
	handleSubmit(e){
		this.state.onDelete(this.state.id);
	}
	render() {
		$("#modal").show();
		return (
			<div className="mymodal">
			<div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
						<button type="button" className="close" aria-label="Close" onClick={this.cancel}>
							<span aria-hidden="true">&times;</span>
						</button>
			      </div>
			      <div className="modal-body">
			        <h5 className="modal-title">Oletko varma, että haluat poistaa työn {this.props.name}?</h5>
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-secondary" onClick={this.cancel}>Peruuta</button>
			        <button type="button" className="btn btn-danger" onClick={this.handleSubmit}>Poista</button>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}

// Work
class Work extends React.Component{
	constructor(props) {
    super(props);
    this.showEditModal = this.showEditModal.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
  }
	showEditModal(){
		ReactDOM.render(
				<EditModal user={this.props.user} customers={this.props.customers}
				tasks={this.props.tasks} description={this.props.description} amount={this.props.amount}
				task_id={this.props.task_id} customer_id={this.props.customer_id}
				date={this.props.date} onEdit={this.handleEdit} user={this.props.user_id}
				id={this.props.id} onEdit={this.props.onEdit} billed={this.props.billed} />,
				document.getElementById('modal')
		);
	}
	showDeleteModal(){
		ReactDOM.render(
				<DeleteModal name={this.props.name} id={this.props.id} onDelete={this.props.onDelete} />,
				document.getElementById('modal')
		);
	}
	render() {
		var tasks = this.props.tasks;
		var taskname = "";
		for (var i in tasks) {
			if (tasks[i].id == this.props.task_id) {
				taskname = tasks[i].name;
			}
		}
		var customername = "";
		for (var i in this.props.customers) {
			if (this.props.customers[i].id == this.props.customer_id) {
				customername = this.props.customers[i].name;
			}
		}
		var laskutettuclass = "";
		if (this.props.billed == true){
			laskutettuclass = "fa fa-btn fa-check";
		} else laskutettuclass = "fa fa-btn fa-ban";
		return (
			<tr>
				<td>{ taskname }</td>
				<td>{ this.props.date }</td>
				<td>{ this.props.amount }</td>
				<td>{ customername }</td>
				<td>{ this.props.description }</td>
				<td><i className={laskutettuclass}></i></td>
				<td><button type="button" className="btn btn-primary" onClick={this.showEditModal}><i className="fa fa-btn fa-edit"></i></button></td>
				<td><button type="button" className="btn btn-danger" onClick={this.showDeleteModal}><i className="fa fa-btn fa-trash"></i></button></td>
			</tr>
		);
	}
}

// Adding a transaction
class AddForm extends React.Component{
	constructor(props) {
    super(props);
    this.state = {date: '', amount: 1, description: '', billed: false, customer_id: 0, task_id: 0,  onDataSubmit: this.props.onDataSubmit};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
	handleChange(e){
		 this.setState({ [e.target.name]: e.target.value });
	}
	handleSubmit(e){
		e.preventDefault();
		var date = this.state.date;
		var amount = this.state.amount;
		var description = this.state.description;
		if(!amount || !date){
			ReactDOM.render(
			    <Errors error='Määrä- ja Päivämäärä-kentät eivät voi olla tyhjiä!' />,
			    document.getElementById('errors')
			);
			return;
		}
		$("#errors").hide();
		this.state.onDataSubmit({date: date, amount: amount,
			customer_id: this.state.customer_id, billed: this.state.billed,
			description: description, task_id: this.state.task_id, user_id: this.props.user});
		this.setState({date: date, amount: 1,	description: ''});
	}
	render(){
		var customers = this.props.customers;
		var options = [];
		for (var i in customers) {
			var name = customers[i].name;
			var id = customers[i].id;
					options.push(<Option value={id} text={name} key={id}  />);
		}
		var tasks = this.props.tasks;
		var taskoptions = [];
		for (var i in tasks) {
			var name = tasks[i].name;
			var id = tasks[i].id;
					taskoptions.push(<Option value={id} text={name} key={id}  />);
		}
		return (
			<div className="addForm">
			<h2>Lisää työtunnit</h2>
				<form className="form-horizontal" id="addform" onSubmit={this.handleSubmit}>
				<div className='form-group row'>
					<label htmlFor="customer_id" className='col-sm-2 col-form-label'>Asiakas</label>
						<select name='customer_id' onChange={this.handleChange}>
						<option value="">Valitse asiakas</option>
						{options}
						</select>
				</div>
				<div className='form-group row'>
					<label htmlFor="task_id" className='col-sm-2 col-form-label'>Työ</label>
						<select name='task_id' onChange={this.handleChange}>
						<option value="">Valitse työ</option>
						{taskoptions}
						</select>
				</div>
				<div className='form-group row'>
					<label htmlFor="date" className='col-sm-2'>Päivämäärä</label>
					<input type="date" name="date" className='col-xs-6'
					value={this.state.date} onChange={this.handleChange} />
				</div>
					<div className='form-group row'>
						<label htmlFor="amount" className='col-sm-2'>Määrä</label>
						<input type="number" step="0.001" name="amount" className='col-xs-6'
						value={this.state.amount} onChange={this.handleChange} />
					</div>
					<div className='form-group row'>
						<label htmlFor="description" className='col-sm-2'>Kuvaus</label>
						<input type="text" name="description" className='col-xs-6'
						value={this.state.description} onChange={this.handleChange} />
					</div>
					<div className='form-group row'>
						<label htmlFor="billed" className='col-sm-2'>Laskutettu</label>
						<input type="checkbox" name="billed" className='col-xs-6'
						value="1" onChange={this.handleChange} />
					</div>
						<input type="submit" className='btn btn-primary' name="addWorks" value="Lisää työtunnit" />
				</form>
		</div>
		);
	}
}


// Whole page
class Page extends React.Component{
	loadDataFromServer(){
		fetch(this.props.url, {credentials: 'include'})
			.then(response =>
		 		response.json().then(data => ({data: data,
				 status: response.status
		 }))
		 .then(res => {
		 this.setState({ data: res.data });
 		}));
	}
		// Get current user id
	getUser(){
		fetch('api/user', {credentials: 'include'})
			.then(response => response.json().then(data => ({
				 data: data,
				 status: response.status
		 })
 	).then(res => {
		 this.setState({ user: res.data });
 }));
	}
	// Get current customers
getCustomers(){
	fetch('api/customers', {credentials: 'include'})
		.then(response => response.json().then(data => ({
			 data: data,
			 status: response.status
	 })
).then(res => {
	 this.setState({ customers: res.data });
}));
}
// Get current customers
getTasks(){
fetch('api/assignments', {credentials: 'include'})
	.then(response => response.json().then(data => ({
		 data: data,
		 status: response.status
 })
).then(res => {
 this.setState({ tasks: res.data });
}));
}
handleChange(e){
	 this.setState({ customer_id: e.target.value });
}
	// Add
	handleSubmit(data){
		var newdata;
		fetch(this.props.url, {credentials: 'include', method: 'POST',
		body: JSON.stringify(data), headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}})
		.then(response => response.json()
			.then(data => ({data: data, status: response.status}))
			.then(res => {this.setState({ data: res.data })})
			.then(this.hideModal("Tiedot lisätty!")));
	}
	// Delete
	handleDelete(data){
		var jsondata = JSON.stringify({'id': data});
		fetch(this.props.url + "/delete", {credentials: 'include',
		method: 'POST', body: jsondata, headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}})
		.then(response => response.json()
			.then(data => ({data: data, status: response.status}))
			.then(res => {this.setState({ data: res.data })})
			.then(this.hideModal("Tiedot poistettu!")));
	}
	// Edit
	handleEdit(data){
		fetch(this.props.url + '/edit', {credentials: 'include', method: 'POST',
		body: JSON.stringify(data), headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}})
		.then(response => response.json()
			.then(data => ({data: data, status: response.status}))
			.then(res => {this.setState({ data: res.data })})
			.then(this.hideModal("Tiedot päivitetty!")));
	}
	hideModal(message) {
		$("#modal").hide();
		ReactDOM.render(<Success message={message} />,
				document.getElementById('success'));
		ReactDOM.render(<div></div>,
			document.getElementById('modal'));
	}
	constructor(props) {
    super(props);
		this.hideModal = this.hideModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
    this.state = { data: [], user: 0, url: this.props.url,
			customers: [], isLoaded: false, tasks: [], customer_id: ""  };
  }
	componentDidMount(){
		this.loadDataFromServer();
		this.getUser();
		this.getCustomers();
		this.getTasks();
	}
  render() {
		var table = [];
		var data = this.state.data;
		if (this.state.customer_id == "") {
			for (var i in data) {
	    	table.push(<Work description={data[i].description} amount={data[i].amount} billed={data[i].billed}
					task_id={data[i].task_id} customer_id={data[i].customer_id} user_id={this.state.user}
					customers={this.state.customers} onDelete={this.handleDelete} tasks={this.state.tasks}
					date={data[i].date} id={data[i].id} onEdit={this.handleEdit} key={data[i].id} />);
			}
		} else {
			for (var i in data) {
				if (this.state.customer_id == data[i].customer_id){
					table.push(<Work description={data[i].description} amount={data[i].amount} billed={data[i].billed}
						task_id={data[i].task_id} customer_id={data[i].customer_id} user_id={this.state.user}
						customers={this.state.customers} onDelete={this.handleDelete} tasks={this.state.tasks}
						date={data[i].date} id={data[i].id} onEdit={this.handleEdit} key={data[i].id} />);
				}
			}
		}

		var customers = this.state.customers;
		var customeroptions = [];
		for (var i in customers) {
			var name = customers[i].name;
			var id = customers[i].id;
					customeroptions.push(<Option value={id} text={name} key={id}  />);
		}
    return (
    	<div>

			<AddForm user={this.state.user} customers={this.state.customers}
			tasks={this.state.tasks}  onDataSubmit={this.handleSubmit} />
			<h1>Työtunnit</h1>
			<div className='row'>
				<label htmlFor="customer_id" className='col-sm-4 col-form-label'>Kaikki asiakkaat</label>
					<select name='customer_id' value={this.state.customer_id} onChange={this.handleChange}>
					<option value="">Valitse asiakas</option>
					{customeroptions}
					</select>
			</div>
			<table className="table">
			<thead>
				<tr>
					<th>Työ</th>
					<th>Päivämäärä</th>
					<th>Määrä</th>
					<th>Asiakas</th>
					<th>Kuvaus</th>
					<th>Laskutettu</th>
					<th>Muokkaa</th>
					<th>Poista</th>
				</tr>
			</thead>
				<tbody>
					{table}
				</tbody>
			</table>
		</div>
    );
  }
}

// Render the page
ReactDOM.render(
    <Page url="api/works" />,
    document.getElementById('works')
);
