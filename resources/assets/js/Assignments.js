
/*


// Edit customer modal
var EditModal = React.createClass({
	cancel: function(){
		ReactDOM.render(
				<div></div>,
				document.getElementById('modal')
		);
		$("#modal").hide();
	},
	getInitialState:function(){
		return {name: this.props.name, address: this.props.address, email: this.props.email,
			phone: this.props.phone, businessID: this.props.businessID};
	},
	handleChange:function(e){
		 this.setState({ [e.target.name]: e.target.value });
	},
	handleSubmit: function(e){
		e.preventDefault();
		var name = this.state.name;
		var address = this.state.address;
		var phone = this.state.phone;
		var email = this.state.email;
		var businessID = this.state.businessID;
		if(!name){
			ReactDOM.render(
			    <Errors error='Nimi-kenttä ei voi olla tyhjä!' />,
			    document.getElementById('errors')
			);
			return;
		}
		$("#errors").hide();
		this.props.onEdit({name: name, address: address, phone: phone, id: this.props.id,
			email: email,	businessID: businessID, user_id: this.props.user});
	},
	render: function() {
		$("#modal").show();
		return (
			<div className="mymodal">
			<div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
						<button type="button" className="close" aria-label="Close" onClick={this.cancel}>
							<span aria-hidden="true">&times;</span>
						</button>
			        <h4 className="modal-title">Muokkaa</h4>
			      </div>
						<form className="editForm form-horizontal" onSubmit={this.handleSubmit}>
						<div className="modal-body">
							<div className='form-group'>
								<label htmlFor="name" className='col-xs-3'>Nimi</label>
								<input type="text" name="name" className='col-xs-6'
								value={this.state.name} onChange={this.handleChange} />
							</div>
							<div className='form-group'>
								<label htmlFor="address" className='col-xs-3'>Osoite</label>
								<input type="text" name="address" className='col-xs-6'
								value={this.state.address} onChange={this.handleChange} />
							</div>
							<div className='form-group'>
								<label htmlFor="email" className='col-xs-3'>Sähköpostiosoite</label>
								<input type="text" name="email" className='col-xs-6'
								value={this.state.email} onChange={this.handleChange} />
							</div>
							<div className='form-group'>
								<label htmlFor="phone" className='col-xs-3'>Puhelin</label>
								<input type="text" name="phone" className='col-xs-6'
								value={this.state.phone} onChange={this.handleChange} />
							</div>
							<div className='form-group'>
								<label htmlFor="businessID" className='col-xs-3'>Y-Tunnus</label>
								<input type="text" name="businessID" className='col-xs-6'
								value={this.state.businessID} onChange={this.handleChange} />
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
});

var DeleteModal = React.createClass({
	cancel: function(){
		$("#modal").hide();
		ReactDOM.render(
				<div></div>,
				document.getElementById('modal')
		);
	},
	handleSubmit: function(e){
		this.props.onDelete(this.props.id);
	},
	render: function() {
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
			        <h5 className="modal-title">Oletko varma, että haluat poistaa asiakkaan { this.props.name }?</h5>
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
});

// Customer
var Customer = React.createClass({
	showEditModal:function(){
		ReactDOM.render(
				<EditModal name={this.props.name} address={this.props.address} phone={this.props.phone}
				email={this.props.email} businessID={this.props.businessID} id={this.props.id} onEdit={this.props.onEdit} />,
				document.getElementById('modal')
		);
	},
	showDeleteModal:function(){
		ReactDOM.render(
				<DeleteModal name={this.props.name} id={this.props.id} onDelete={this.props.onDelete} />,
				document.getElementById('modal')
		);
	},
	render: function() {
		return (
			<tr>
				<td>{ this.props.name }</td>
				<td>{ this.props.address }</td>
				<td>{ this.props.email }</td>
				<td>{ this.props.phone }</td>
				<td>{ this.props.businessID }</td>
				<td><button type="button" className="btn btn-primary" onClick={this.showEditModal}>Muokkaa</button></td>
				<td><button type="button" className="btn btn-danger" onClick={this.showDeleteModal}>Poista</button></td>
			</tr>
		);
	}
});

// Adding a customer
var AddForm = React.createClass({
	getInitialState:function(){
		return {name: '', address: '', email: '', phone: '', businessID: ''};
	},
	handleChange:function(e){
		 this.setState({ [e.target.name]: e.target.value });
	},
	cancel: function(){
		$("#modal").hide();
		ReactDOM.render(
				<div></div>,
				document.getElementById('modal')
		);
	},
	handleSubmit: function(e){
		e.preventDefault();
		var name = this.state.name;
		var address = this.state.address;
		var phone = this.state.phone;
		var email = this.state.email;
		var businessID = this.state.businessID;
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
		this.props.onDataSubmit({name: name, address: address, phone: phone,
			email: email,	businessID: businessID, user_id: this.props.user});
		this.setState({name: '', address: '', email: '', phone: '', businessID: ''});
	},
	render: function(){
		$("#modal").show();
		return (
			<div className="mymodal">
			<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
						<button type="button" className="close" aria-label="Close" onClick={this.cancel}>
							<span aria-hidden="true">&times;</span>
						</button>
							<h4 className="modal-title">Lisää asiakas</h4>
						</div>
						<form className="editForm form-horizontal" onSubmit={this.handleSubmit}>
						<div className="modal-body">
							<div className='form-group'>
								<label htmlFor="name" className='col-xs-3'>Nimi</label>
								<input type="text" name="name" className='col-xs-6'
								value={this.state.name} onChange={this.handleChange} />
							</div>
							<div className='form-group'>
								<label htmlFor="address" className='col-xs-3'>Osoite</label>
								<input type="text" name="address" className='col-xs-6'
								value={this.state.address} onChange={this.handleChange} />
							</div>
							<div className='form-group'>
								<label htmlFor="email" className='col-xs-3'>Sähköpostiosoite</label>
								<input type="text" name="email" className='col-xs-6'
								value={this.state.email} onChange={this.handleChange} />
							</div>
							<div className='form-group'>
								<label htmlFor="phone" className='col-xs-3'>Puhelin</label>
								<input type="text" name="phone" className='col-xs-6'
								value={this.state.phone} onChange={this.handleChange} />
							</div>
							<div className='form-group'>
								<label htmlFor="businessID" className='col-xs-3'>Y-Tunnus</label>
								<input type="text" name="businessID" className='col-xs-6'
								value={this.state.businessID} onChange={this.handleChange} />
							</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" onClick={this.cancel}>Peruuta</button>
								<input type="submit" className='btn btn-primary' name="addCustomer" value="Lisää asiakas" />
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
});

// Whole page
class Page extends React.Component({
	loadDataFromServer: function(){
		$("#modal").hide();
		ReactDOM.render(
				<div></div>,
				document.getElementById('modal')
		);
		$.ajax({
				url: this.props.url,
				dataType: 'json',
				cache: false,
				success: function(data){
				this.setState({data: data});
				}.bind(this),
				error: function(xhr, status, err){
					console.error(this.props.url, status, err.toString());
					ReactDOM.render(
					    <Errors error='Tietokantayhteys ei toimi' />,
					    document.getElementById('errors')
					);
				}.bind(this)
			});
		},
		// Get current user id
	getUser: function(){
		$.ajax({
				url: 'api/user',
				dataType: 'json',
				cache: false,
				success: function(data){
				this.setState({user: data});
				}.bind(this),
				error: function(xhr, status, err){
					ReactDOM.render(
					    <Errors error='Käyttäjän hakeminen ei onnistunut' />,
					    document.getElementById('errors')
					);
					console.error('api/user', status, err.toString());
				}.bind(this)
			});
	},
	// Add
	handleSubmit: function(customer){
		$.ajax({
			url: this.props.url,
			type: 'POST',
			data: customer,
			success: function(data) {
				this.loadDataFromServer();
				ReactDOM.render(
						<Success message='Asiakas lisätty' />,
						document.getElementById('success')
				);
			}.bind(this),
			error: function(xhr, status, err){
				ReactDOM.render(
				    <Errors error='Tietojen lähetys ei onnistunut' />,
				    document.getElementById('errors')
				);
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	// Delete
	handleDelete: function(customer){
		$.ajax({
			url: this.props.url + "/delete",
			type: 'POST',
			data: {id: customer},
			success: function(data) {
				this.loadDataFromServer();
				ReactDOM.render(
						<Success message='Asiakas poistettu' />,
						document.getElementById('success')
				);
			}.bind(this),
			error: function(xhr, status, err){
				ReactDOM.render(
				    <Errors error='Tietojen poisto ei onnistunut' />,
				    document.getElementById('errors')
				);
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},// Edit
	handleEdit: function(customer){
		$.ajax({
			url: this.props.url + "/edit",
			type: 'POST',
			data: customer,
			success: function(data) {
				ReactDOM.render(
						<Success message='Tiedot tallennettu' />,
						document.getElementById('success')
				);
				this.loadDataFromServer();
			}.bind(this),
			error: function(xhr, status, err){
				ReactDOM.render(
				    <Errors error='Tietojen lähetys ei onnistunut' />,
				    document.getElementById('errors')
				);
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function(){
		return { data: [], user: 0 };
	},
	componentDidMount: function(){
		this.loadDataFromServer();
		this.getUser();
	},
	showAddModal:function(){
		ReactDOM.render(
				<AddForm data={this.state.data} url={this.state.url} user={this.state.user} onDataSubmit={this.handleSubmit} />,
				document.getElementById('modal')
		);
	},
  render: function() {
		var customers = [];
		var data = this.state.data;
		for (var customer in data) {
    	customers.push(<Customer name={data[customer].name} address={data[customer].address} email={data[customer].email} key={data[customer].id}
			phone={data[customer].phone} businessID={data[customer].businessID} onDelete={this.handleDelete} onEdit={this.handleEdit} id={data[customer].id} />);
		}
    return (
    	<div>
	   		<h1>Asiakkaat</h1>
				<table className="table">
					<thead>
						<tr>
							<th>Nimi</th>
							<th>Osoite</th>
							<th>Sähköpostiosoite</th>
							<th>Puhelin</th>
							<th>Y-tunnus</th>
						</tr>
					</thead>
					<tbody>
						{customers}
					</tbody>
				</table>
				<button type="button" className="btn btn-secondary" onClick={this.showAddModal}>Lisää asiakas</button>
			</div>
    );
  }
});

// Render the page
ReactDOM.render(
    <Page url="api/customers" />,
    document.getElementById('content')
);*/

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
    this.state = {name: this.props.name, address: this.props.address, email: this.props.email,
			phone: this.props.phone, businessID: this.props.businessID};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
	handleChange(e){
		 this.setState({ [e.target.name]: e.target.value });
	}
	handleSubmit(e){
		e.preventDefault();
		var name = this.state.name;
		var address = this.state.address;
		var phone = this.state.phone;
		var email = this.state.email;
		var businessID = this.state.businessID;
		if(!name){
			ReactDOM.render(
			    <Errors error='Nimi-kenttä ei voi olla tyhjä!' />,
			    document.getElementById('errors')
			);
			return;
		}
		$("#errors").hide();
		this.props.onEdit({name: name, address: address, phone: phone, id: this.props.id,
			email: email,	businessID: businessID, user_id: this.props.user});
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
								<label htmlFor="address" className='col-sm-3 col-form-label'>Osoite</label>
								<input type="text" name="address" className='col-sm-9'
								value={this.state.address} onChange={this.handleChange} />
							</div>
							<div className='form-group row'>
								<label htmlFor="email" className='col-sm-3 col-form-label'>Sähköpostiosoite</label>
								<input type="text" name="email" className='col-sm-9'
								value={this.state.email} onChange={this.handleChange} />
							</div>
							<div className='form-group row'>
								<label htmlFor="phone" className='col-sm-3 col-form-label'>Puhelin</label>
								<input type="text" name="phone" className='col-sm-9'
								value={this.state.phone} onChange={this.handleChange} />
							</div>
							<div className='form-group row'>
								<label htmlFor="businessID" className='col-sm-3 col-form-label'>Y-Tunnus</label>
								<input type="text" name="businessID" className='col-sm-9'
								value={this.state.businessID} onChange={this.handleChange} />
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

// Customer
class Customer extends React.Component{
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
				<td>{ this.props.price }</td>
				<td>{ this.props.unit }</td>
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
		var price = this.state.price;
		var unit = this.state.unit;
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
		this.state.onDataSubmit({name: name, price: price, unit: unit, user_id: this.props.user});
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
								<input type="text" name="name" className='col-sm-9'
								value={this.state.name} onChange={this.handleChange} />
							</div>
							<div className='form-group row'>
								<label htmlFor="address" className='col-sm-3 col-form-label'>Hinta</label>
								<input type="text" name="price" className='col-sm-9'
								value={this.state.price} onChange={this.handleChange} />
							</div>
							<div className='form-group row'>
								<label htmlFor="email" className='col-sm-3 col-form-label'>Yksikkö</label>
								<input type="text" name="unit" className='col-sm-9'
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
		fetch(this.props.url, {credentials: 'include', method: 'POST',
		body: JSON.stringify(data), headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}})
			.then(response => response.json().then(data => ({data: data}))
			.then(this.loadDataFromServer()))
			.then(this.hideModal("Tiedot lisätty!"));
	}
	// Delete
	handleDelete(data){
		var jsondata = JSON.stringify({'id': data});
		fetch(this.props.url + "/delete", {credentials: 'include',
		method: 'POST', body: jsondata, headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}})
			.then(this.loadDataFromServer())
			.then(this.hideModal("Tiedot poistettu!"));
	}
	// Edit
	handleEdit(data){
		fetch(this.props.url + '/edit', {credentials: 'include', method: 'POST',
		body: JSON.stringify(data), headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}})
			.then(response => response.json().then(data => ({data: data}))
			.then(this.loadDataFromServer()))
			.then(this.hideModal("Tiedot päivitetty!"));
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
    	table.push(<Customer name={data[i].name} price={data[i].price}
				unit={data[i].unit} key={data[i].id} />);
		}
    return (
    	<div>
			<h1>Työt</h1>
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
    <Page url="api/assignments" />,
    document.getElementById('tasks')
);
