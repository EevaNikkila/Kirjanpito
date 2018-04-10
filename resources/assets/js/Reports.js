

// One select option
class Option extends React.Component{
	render() {
		return (
			 <option value={this.props.value}>{this.props.text}</option>
		);
	}
}

// Transaction
class Transaction extends React.Component{
	constructor(props) {
    super(props);
  }
	render() {
		if (this.props.accountTypes.length != 0) {
			var accountTypeName = this.props.accountTypes[this.props.account-1].name;
			var accountTypeNumber = this.props.accountTypes[this.props.account-1].number;
		}
		return (
			<tr>
				<td>{accountTypeNumber} - { accountTypeName }</td>
				<td>{ this.props.date }</td>
				<td>{ this.props.place }</td>
				<td>{ this.props.amount }</td>
				<td>{ this.props.vat }</td>
				<td>{ this.props.target }</td>
				<td>{ this.props.description }</td>
				<td><button type="button" className="btn btn-primary" onClick={this.showEditModal}><i className="fa fa-btn fa-edit"></i></button></td>
				<td><button type="button" className="btn btn-danger" onClick={this.showDeleteModal}><i className="fa fa-btn fa-trash"></i></button></td>
			</tr>
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
		this.handleReportType = this.handleReportType.bind(this);
    this.state = { data: [], user: 0, tab: "expense", accountTypes: [],
		url: this.props.url, isLoaded: false, reporttype: "" };
  }
	componentDidMount(){
		this.loadDataFromServer();
		this.getaccountTypes();
		this.getUser();
	}
	handleTabs(e){
		 this.setState({ tab: e.target.value });
	}
	handleReportType(e){
		 this.setState({ reporttype: e.target.value });
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
	var customers = ["ALV-raportti", "Kirjanpitoraportti", "Raportti"];
	var reportoptions = [];
	for (var i in customers) {
		var name = customers[i];
				reportoptions.push(<Option value={name} text={name} key={i}  />);
	}
    return (
    	<div>
	   		<h1>Raportit</h1>
				<div className='row'>
					<label htmlFor="reporttype" className='col-sm-4 col-form-label'>Valitse raportti</label>
						<select name='reporttype' value={this.state.reporttype} onChange={this.handleReportType}>
						<option value="">Valitse raportti</option>
						{reportoptions}
						</select>
				</div>
				<button type="button" className="btn btn-secondary" id="expense" onClick={this.handleTabs} value="expense">Menot</button>
				<button type="button" className="btn btn-secondary" id="income" onClick={this.handleTabs} value="income">Tulot</button>
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
