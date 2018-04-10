
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
								<input type="text" name="name" className='col-sm-8'
								value={this.state.name} onChange={this.handleChange} />
							</div>
							<div className='form-group row'>
								<label htmlFor="price" className='col-sm-3 col-form-label'>Hinta</label>
								<input type="number" name="price" className='col-sm-8'
								value={this.state.price} onChange={this.handleChange} />
							</div>
							<div className='form-group row'>
								<label htmlFor="unit" className='col-sm-3 col-form-label'>Yksikkö</label>
								<input type="text" name="unit" className='col-sm-8'
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

// Task
class Task extends React.Component{
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
		return (
			<tr>
				<td>{ this.props.name }</td>
				<td>{ this.props.price }€</td>
				<td>/{ this.props.unit }</td>
				<td><button type="button" className="btn btn-primary custom-btn" onClick={this.showEditModal}><i className="fa fa-btn fa-edit"></i></button></td>
				<td><button type="button" className="btn btn-danger custom-btn" onClick={this.showDeleteModal}><i className="fa fa-btn fa-trash"></i></button></td>
			</tr>
		);
	}
}

// Adding a transaction
class AddForm extends React.Component{
	constructor(props) {
    super(props);
    this.state = {name: '', unit: '', price: '', onDataSubmit: this.props.onDataSubmit};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
	handleChange(e){
		 this.setState({ [e.target.name]: e.target.value });
	}
	cancel(){
		ReactDOM.render(
				<div></div>,
				document.getElementById('modal')
		);
		$("#modal").hide();
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
		ReactDOM.render(
				<div></div>,
				document.getElementById('errors')
		);
		this.state.onDataSubmit({name: name, price: this.state.price,
			unit: this.state.unit, user_id: this.props.user});
		this.setState({name: '', price: '', unit: ''});
	}
	render(){
		$("#modal").show();
		return (
			<div className="mymodal">
			<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
						<h4 className="modal-title">Lisää työ</h4>
						<button type="button" className="close" aria-label="Close" onClick={this.cancel}>
							<span aria-hidden="true">&times;</span>
						</button>
						</div>
						<form className="editForm form-horizontal" onSubmit={this.handleSubmit}>
						<div className="modal-body">
							<div className='form-group row'>
								<label htmlFor="name" className='col-sm-3 col-form-label'>Nimi</label>
								<input type="text" name="name" className='col-sm-8'
								value={this.state.name} onChange={this.handleChange} />
							</div>
							<div className='form-group row'>
								<label htmlFor="price" className='col-sm-3 col-form-label'>Hinta</label>
								<input type="number" name="price" className='col-sm-8'
								value={this.state.price} onChange={this.handleChange} />
							</div>
							<div className='form-group row'>
								<label htmlFor="unit" className='col-sm-3 col-form-label'>Yksikkö</label>
								<input type="text" name="unit" className='col-sm-8'
								value={this.state.unit} onChange={this.handleChange} />
							</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" onClick={this.cancel}>Peruuta</button>
								<input type="submit" className='btn btn-primary' name="addCustomer" value="Lisää työ" />
							</div>
						</form>
					</div>
				</div>
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
		this.handleTabs = this.handleTabs.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showAddModal = this.showAddModal.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
    this.state = { data: [], user: 0, url: this.props.url, isLoaded: false };
  }
	componentDidMount(){
		this.loadDataFromServer();
		this.getUser();
	}
	handleTabs(e){
		 this.setState({ tab: e.target.value });
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
    	table.push(<Task name={data[i].name} price={data[i].price} onDelete={this.handleDelete}
				unit={data[i].unit} id={data[i].id} onEdit={this.handleEdit} key={data[i].id} />);
		}
    return (
    	<div>
			<h1>Työt</h1>
			<table className="table">
				<tbody>
					{table}
				</tbody>
			</table>
			<button type="button" className="btn btn-primary" onClick={this.showAddModal}>Lisää työ</button>
		</div>
    );
  }
}

// Render the page
ReactDOM.render(
    <Page url="api/assignments" />,
    document.getElementById('tasks')
);
