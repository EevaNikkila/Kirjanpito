
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
    this.state = {name: this.props.name, price: this.props.price, unit: this.props.unit};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
	handleChange(e){
		 this.setState({ [e.target.name]: e.target.value });
	}
	handleSubmit(e){
		e.preventDefault();
		var name = this.state.name;
		if(!name){
			ReactDOM.render(
			    <Errors error='Nimi-kenttä ei voi olla tyhjä!' />,
			    document.getElementById('errors')
			);
			return;
		}
		$("#errors").hide();
		this.props.onEdit({name: name, price: this.state.price, unit: this.state.unit,
			id: this.props.id, user_id: this.props.user});
	}
	render() {
		$("#modal").show();
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
						<form className="editForm form-horizontal" onSubmit={this.handleSubmit}>
						<div className="modal-body">
							<div className='form-group row'>
								<label htmlFor="name" className='col-sm-3 col-form-label'>Nimi</label>
								<input type="text" name="name" className='col-sm-9'
								value={this.state.name} onChange={this.handleChange} />
							</div>
							<div className='form-group row'>
								<label htmlFor="price" className='col-sm-3 col-form-label'>Hinta</label>
								<input type="number" name="price" className='col-sm-9'
								value={this.state.price} onChange={this.handleChange} />
							</div>
							<div className='form-group row'>
								<label htmlFor="unit" className='col-sm-3 col-form-label'>Yksikkö</label>
								<input type="text" name="unit" className='col-sm-9'
								value={this.state.unit} onChange={this.handleChange} />
							</div>
						</div>
							<div className="modal-footer">
				        <button type="button" className="btn btn-secondary" onClick={this.cancel}>Peruuta</button>
								<input type="submit" className='btn btn-primary' name="addCustomer" value="Tallenna muutokset" />
							</div>
						</form>
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
				<EditModal name={this.props.name} price={this.props.price} unit={this.props.unit}
				id={this.props.id} onEdit={this.props.onEdit} />,
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

			console.log(this.props.customers)

				console.log(this.props.customer_id)
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
		return (
			<tr>
				<td>{ this.props.description }</td>
				<td>{ this.props.amount }</td>
				<td>{ this.props.date }</td>
				<td>{ taskname }</td>
				<td>{ customername }</td>
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
    this.state = {date: '', amount: 1, description: '', customer_id: 0, task_id: 0,  onDataSubmit: this.props.onDataSubmit};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
	handleChange(e){
		 this.setState({ [e.target.name]: e.target.value });
	 		console.log(this.state.task_id)
	}
	handleSubmit(e){
		e.preventDefault();
		var date = this.state.date;
		var amount = this.state.amount;
		var description = this.state.description;
		if(!amount){
			ReactDOM.render(
			    <Errors error='Määrä- ja Tyyppi-kentät eivät voi olla tyhjiä!' />,
			    document.getElementById('errors')
			);
			return;
		}
		$("#errors").hide();
		this.state.onDataSubmit({date: date, amount: amount, customer_id: this.state.customer_id,
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
			console.log(id)
					taskoptions.push(<Option value={id} text={name} key={id}  />);
		}
		return (
			<div className="addForm">
			<h2>Lisää työtunnit</h2>
				<form className="form-horizontal" id="addform" onSubmit={this.handleSubmit}>
				<div className='form-group row'>
					<label htmlFor="customer" className='col-sm-2 col-form-label'>Asiakas</label>
						<select name='customer' onChange={this.handleChange}>
						<option value={this.state.customer}>Valitse asiakas</option>
						{options}
						</select>
				</div>
				<div className='form-group row'>
					<label htmlFor="taks" className='col-sm-2 col-form-label'>Työ</label>
						<select name='task' onChange={this.handleChange}>
						<option value={this.state.task}>Valitse työ</option>
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
		this.showAddModal = this.showAddModal.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
    this.state = { data: [], user: 0, url: this.props.url,
			customers: [], isLoaded: false, tasks: []  };
  }
	componentDidMount(){
		this.loadDataFromServer();
		this.getUser();
		this.getCustomers();
		this.getTasks();
	}
	showAddModal(){
		ReactDOM.render(
				<AddForm user={this.state.user} onDataSubmit={this.handleSubmit} />,
				document.getElementById('modal')
		);
	}
  render() {
		var table = [];
		var data = this.state.data;
		for (var i in data) {
			console.log(data[i])
    	table.push(<Work description={data[i].description} amount={data[i].amount}
				task_id={data[i].task_id} customer_id={data[i].customer_id}
				customers={this.state.customers} onDelete={this.handleDelete} tasks={this.state.tasks}
				date={data[i].date} id={data[i].id} onEdit={this.handleEdit} key={data[i].id} />);
		}
    return (
    	<div>
			<h1>Työtunnit</h1>
			<AddForm user={this.state.user} customers={this.state.customers}
			tasks={this.state.tasks}  onDataSubmit={this.handleSubmit} />
			<table className="table">
				<tbody>
					{table}
				</tbody>
			</table>
			<button type="button" className="btn btn-secondary" onClick={this.showAddModal}>Lisää työ</button>
		</div>
    );
  }
}

// Render the page
ReactDOM.render(
    <Page url="api/works" />,
    document.getElementById('works')
);
