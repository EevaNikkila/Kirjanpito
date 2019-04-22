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
    this.state = {date: this.props.date, place: this.props.place, amount: this.props.amount, account: this.props.account,
		vat: this.props.vat, target: this.props.target, description: this.props.description, accountTypes: this.props.accountTypes};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
	handleChange(e){
		 this.setState({ [e.target.name]: e.target.value });
	}
	handleSubmit(e){
		e.preventDefault();
		if(!this.state.amount | !this.state.account){
			ReactDOM.render(
			    <Errors error='Määrä- ja tyyppi-kentät eivät voi olla tyhjä!' />,
			    document.getElementById('errors')
			);
			return;
		}
		$("#errors").hide();
		ReactDOM.render(
				<div></div>,
				document.getElementById('errors')
		);
		this.props.onEdit({date: this.state.date, place: this.state.place, amount: this.state.amount,
			id: this.props.id, account: this.state.account,	vat: this.state.vat,	target: this.state.target,
			description: this.state.description, user_id: this.props.user});
	}
	render() {
		$("#modal").show();
		var accountTypes = this.state.accountTypes;
		var options = [];
		for (var type in accountTypes) {
			var id = accountTypes[type].id;
			var text = accountTypes[type].number + " - " + accountTypes[type].name;
			if(this.props.transactionType == "income"){
				if (accountTypes[type].type == "varallisuus") {
						options.push(<Option value={id} text={text} key={id}  />);
				}
			} else {
				if (accountTypes[type].type != "varallisuus") {
					options.push(<Option value={id} text={text} key={id}  />);
				}
			}
		}
			var target;
			var place;
			if (this.props.transactionType == "income") {
				target = "Maksaja";
				place = "Maksettu tilille";
			} else if (this.props.transactionType == "expense") {
				target = "Myyjä";
				place = "Maksettu tililtä";
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
						<div className="modal-body">
						<form className="form-horizontal" onSubmit={this.handleSubmit}>
						<div className='form-group row'>
							<label htmlFor="account" className='col-sm-3 col-form-label'>Tyyppi</label>
							<select value={this.state.account} name='account' onChange={this.handleChange}>
							<option value="">Valitse kirjanpitotili</option>
							{options}
							</select>
						</div>
						<div className='form-group row'>
							<label htmlFor="date" className='col-sm-3 col-form-label'>Päivämäärä</label>
							<input type="date" name="date" className='col-xs-6'
							value={this.state.date} onChange={this.handleChange} />
						</div>
						<div className='form-group row'>
							<label htmlFor="place" className='col-sm-3 col-form-label'>{place}</label>
							<select value={this.state.place} name="place" onChange={this.handleChange}>
								 <option value="1910 - Pankkitili">1910 - Pankkitili</option>
								 <option value="1900 - Kassa">1900 - Kassa</option>
								 <option value="2361 - Yksityissijoitukset rahana">2361 - Yksityissijoitukset rahana</option>
						 </select>
						</div>
							<div className='form-group row'>
								<label htmlFor="amount" className='col-sm-3 col-form-label'>Määrä</label>
								<input type="number" step="0.001" name="amount" className='col-xs-6'
								value={this.state.amount} onChange={this.handleChange} />
							</div>
							<div className='form-group row'>
								<label htmlFor="vat" className='col-sm-3 col-form-label'>ALV %</label>
								<select value={this.state.vat} name="vat" onChange={this.handleChange}>
									 <option value="0.24">24 %</option>
									 <option value="0.14">14 %</option>
									 <option value="0.1">10 %</option>
									 <option value="0">Ei ALV:a</option>
						 	 </select>
							</div>
							<div className='form-group row'>
								<label htmlFor="target" className='col-sm-3 col-form-label'>{target}</label>
								<input type="text" name="target" className='col-xs-6'
								value={this.state.target} onChange={this.handleChange} />
							</div>
							<div className='form-group row'>
								<label htmlFor="description" className='col-sm-3 col-form-label'>Kuvaus</label>
								<input type="text" name="description" className='col-xs-6'
								value={this.state.description} onChange={this.handleChange} />
							</div>
							<div className="modal-footer">
							<button type="button" className="btn btn-secondary" onClick={this.cancel}>Peruuta</button>
								<input type="submit" className='btn btn-primary' name="editTransaction" value="Tallenna tiedot" />
								</div>
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
			        <h5 className="modal-title">Oletko varma, että haluat poistaa tiedot?</h5>
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

// Transaction
class Transaction extends React.Component{
	constructor(props) {
    super(props);
    this.showEditModal = this.showEditModal.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
  }
	showEditModal(){
		ReactDOM.render(
				<EditModal date={this.props.date} place={this.props.place} amount={this.props.amount} account={this.props.account}
				vat={this.props.vat} target={this.props.target} description={this.props.description} transactionType={this.props.transactionType}
				id={this.props.id} onEdit={this.props.onEdit} accountTypes={this.props.accountTypes} user={this.props.user} />,
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
		if (this.props.accountTypes.length != 0) {
			for (var type in this.props.accountTypes) {
				if (this.props.accountTypes[type].id == this.props.account) {
					var accountTypeName = this.props.accountTypes[type].name;
					var accountTypeNumber = this.props.accountTypes[type].number;
				}
			}
		}
		var date = new Date(this.props.date);
		date = date.toLocaleDateString("fi-FI");
		return (
			<tr>
				<td>{accountTypeNumber} - { accountTypeName }</td>
				<td>{ date }</td>
				<td>{ this.props.place }</td>
				<td>{ this.props.amount }</td>
				<td>{ this.props.vat }</td>
				<td>{ this.props.target }</td>
				<td>{ this.props.description }</td>
				<td><button type="button" className="btn btn-primary custom-btn" onClick={this.showEditModal}>
					<i onClick={this.showEditModal} className="fa fa-btn fa-edit"></i>
				</button></td>
				<td><button type="button" className="btn btn-danger custom-btn" onClick={this.showDeleteModal}>
					<i onClick={this.showDeleteModal} className="fa fa-btn fa-trash"></i>
				</button></td>
			</tr>
		);
	}
}

// Adding a transaction
class AddForm extends React.Component{
	constructor(props) {
    super(props);
    this.state = {date: '', account: '', place: '1910 - Pankkitili', amount: '',
		vat: '0.24', target: '', description: '', onDataSubmit: this.props.onDataSubmit};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
	handleChange(e){
		 this.setState({ [e.target.name]: e.target.value });
	}
	handleSubmit(e){
		e.preventDefault();
		var account = this.state.account;
		var amount = this.state.amount;
		if(!amount | !account){
			ReactDOM.render(
			    <Errors error='Määrä- ja Tyyppi-kentät eivät voi olla tyhjiä!' />,
			    document.getElementById('errors')
			);
			return;
		}
		if (this.props.type == "expense"){
			amount = Math.abs(amount)*-1;
		}
		$("#errors").hide();
		this.state.onDataSubmit({date: this.state.date, account: account, place: this.state.place,
			amount: amount,	vat: this.state.vat, target: this.state.target,
			description: this.state.description, user_id: this.props.user});
		this.setState({date: date, account: account, place: '1910 - Pankkitili', amount: '',	vat: '0.24', target: '', description: ''});
	}
	render(){
		var submit;
		var target;
		var place;
		if (this.props.type == "expense"){
			place = "Maksettu tililtä";
			target = "Myyjä";
			submit = "Lisää meno";
		} else if (this.props.type == "income"){
			place = "Maksettu tilille";
			target = "Maksaja";
			submit = "Lisää tulo";
		}
		var accountTypes = this.props.accountTypes;
		var options = [];
		for (var type in accountTypes) {
			var id = accountTypes[type].id;
			var text = accountTypes[type].number + " - " + accountTypes[type].name;
			if(this.props.type == "income"){
				if (accountTypes[type].type == "varallisuus") {
					options.push(<Option value={id} text={text} key={id}  />);
				}
			} else {
				if (accountTypes[type].type != "varallisuus") {
					options.push(<Option value={id} text={text} key={id}  />);
				}
			}
		}
		return (
			<div className="addForm accountingForm">
			<h2>{submit}</h2>
				<form className="form-horizontal" id="addform" onSubmit={this.handleSubmit}>
				<div className='form-group row'>
					<label htmlFor="account" className='col-sm-2 col-form-label'>Tyyppi</label>
						<select value={this.state.type} name='account' onChange={this.handleChange}>
						<option value="">Valitse kirjanpitotili</option>
						{options}
						</select>
				</div>
				<div className='form-group row'>
					<label htmlFor="date" className='col-sm-2'>Päivämäärä</label>
					<input type="date" name="date" className='col-xs-6'
					value={this.state.date} onChange={this.handleChange} />
				</div>
				<div className='form-group row'>
					<label htmlFor="place" className='col-sm-2'>{place}</label>
					<select value={this.state.place} name="place" onChange={this.handleChange}>
						 <option value="1910 - Pankkitili">1910 - Pankkitili</option>
						 <option value="1900 - Kassa">1900 - Kassa</option>
						 <option value="2361 - Yksityissijoitukset rahana">2361 - Yksityissijoitukset rahana</option>
				 </select>
				</div>
					<div className='form-group row'>
						<label htmlFor="amount" className='col-sm-2'>Määrä</label>
						<input type="number" step="0.001" name="amount" className='col-xs-6'
						value={this.state.amount} onChange={this.handleChange} />
					</div>
					<div className='form-group row'>
						<label htmlFor="vat" className='col-sm-2'>ALV %</label>
						<select value={this.state.vat} name="vat" onChange={this.handleChange}>
							 <option value="0.24">24 %</option>
							 <option value="0.14">14 %</option>
							 <option value="0.1">10 %</option>
							 <option value="0">Ei ALV:a</option>
				 	 </select>
					</div>
					<div className='form-group row'>
						<label htmlFor="target" className='col-sm-2'>{target}</label>
						<input type="text" name="target" className='col-xs-6'
						value={this.state.target} onChange={this.handleChange} />
					</div>
					<div className='form-group row'>
						<label htmlFor="description" className='col-sm-2'>Kuvaus</label>
						<input type="text" name="description" className='col-xs-6'
						value={this.state.description} onChange={this.handleChange} />
					</div>
						<input type="submit" className='btn btn-primary' name="addCustomer" value={submit} />
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
	// Get all account types
	getaccountTypes(){
		 fetch('api/accounttypes', {
			 credentials: 'include'})
			.then(response => response.json().then(data => ({
        data: data,
        status: response.status
    }))
			.then(res => {this.setState({ accountTypes: res.data });
		}));
	}
	// Add
	handleSubmit(data){
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
			.then(res => {this.setState({ data: res.data });
		})
			.then(this.hideModal("Tiedot poistettu!")));
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
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
    this.state = { data: [], user: 0, tab: "expense", accountTypes: [], url: this.props.url, isLoaded: false };
  }
	componentDidMount(){
		this.loadDataFromServer();
		this.getaccountTypes();
		this.getUser();
	}
	handleTabs(e){
			if (e.target.value == "expense"){
				$("#expense").addClass("active");
				$("#income").removeClass("active");
			} else {
				$("#income").addClass("active");
				$("#expense").removeClass("active");
			}

		 this.setState({ tab: e.target.value });
	}
  render() {
		var incomes = [];
		var expenses = [];
		var data = this.state.data;
		for (var i in data) {
			if (data[i].amount > 0) {
				incomes.push(<Transaction amount={data[i].amount} place={data[i].place} transactionType="income"
				vat={data[i].vat} key={data[i].id} date={data[i].date} accountTypes={this.state.accountTypes}
				target={data[i].target} description={data[i].description} onDelete={this.handleDelete} user={this.state.user}
				onEdit={this.handleEdit} id={data[i].id} account={data[i].account_id} />);
			} else {
				expenses.push(<Transaction amount={data[i].amount} place={data[i].place} transactionType="expense"
					vat={data[i].vat} key={data[i].id} date={data[i].date} accountTypes={this.state.accountTypes}
				target={data[i].target} description={data[i].description} onDelete={this.handleDelete}
				onEdit={this.handleEdit} id={data[i].id} account={data[i].account_id} user={this.state.user} />);
			}
		}
	var table;
	var header;
	var target;
	var place;
	if (this.state.tab == "income") {
		table = incomes;
		target = "Maksaja";
		header = "Tulot";
		place = "Maksettu tilille";
	} else if (this.state.tab == "expense") {
		table = expenses;
		target = "Myyjä";
		header = "Menot";
		place = "Maksettu tililtä";
	} else table = "Error!";
    return (
    	<div>
	   		<h1>Kirjanpito</h1>
				<ul className="nav nav-tabs">
	  			<li className="nav-item">
						<button type="button" className="nav-link active" onClick={this.handleTabs} id="expense" value="expense">Menot</button>
					</li>
					<li className="nav-item">
						<button type="button" className="nav-link" onClick={this.handleTabs} id="income" value="income">Tulot</button>
					</li>
				</ul>
				<AddForm data={this.state.data} user={this.state.user} type={this.state.tab}
				accountTypes={this.state.accountTypes} onDataSubmit={this.handleSubmit} />
				<h2>{header}</h2>
			 <table className="table">
				 <thead>
					 <tr>
						 <th>Tyyppi</th>
						 <th>Päivä</th>
						 <th>{place}</th>
						 <th>Määrä</th>
						 <th>ALV</th>
						 <th>{target}</th>
						 <th>Kuvaus</th>
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
    <Page url="api/accounting" />,
    document.getElementById('content')
);
