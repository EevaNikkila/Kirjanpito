

// One select option
class Option extends React.Component{
	render() {
		return (
			 <option value={this.props.value}>{this.props.text}</option>
		);
	}
}

// Alv-raportti
class Alv extends React.Component{
	constructor(props) {
    super(props);
		var today = new Date();
		var year = today.getFullYear();
		this.state = {quarter:'1', year:year};
    this.handleChange = this.handleChange.bind(this);
  }
	handleChange(e){
		 this.setState({ [e.target.name]: e.target.value });
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
		switch (this.state.quarter) {
			case "1":
				var startdate = new Date(this.state.year + "-01-01");
				var enddate = new Date(this.state.year + "-03-31");
				break;
			case "2":
				var startdate = new Date(this.state.year + "-04-01");
				var enddate = new Date(this.state.year + "-06-30");
				break;
			case "3":
				var startdate = new Date(this.state.year + "-07-01");
				var enddate = new Date(this.state.year + "-09-30");
				break;
			case "4":
				var startdate = new Date(this.state.year + "-10-01");
				var enddate = new Date(this.state.year + "-12-31");
				break;
			default:
				var startdate = new Date(this.state.year + "-01-01");
				var enddate = new Date(this.state.year + "-03-31");
				break;
		}
		var incomes = this.props.incomes;
		var expenses = this.props.expenses;
		var incomesvat = 0;
		var expensesvat = 0;
		for (var item in incomes) {
			var date = new Date(incomes[item].date);
			if (date > startdate && date < enddate) {

				if (incomes[item].vat != "0") {
				incomesvat += parseFloat(incomes[item].amount);
			}
			}
		}
		for (var item in expenses) {
			var date = new Date(expenses[item].date);
			if (date > startdate && date < enddate) {
				if (expenses[item].vat != "0") {
					expensesvat += parseFloat(expenses[item].amount);
				}
			}
		}
		var today = new Date();
		var year = today.getFullYear();
		var yearoptions = [];
		for (var i = year; i >= 2019; i--) {
			yearoptions.push(<Option value={i} text={i} key={i}  />);
		}
		var total = parseFloat((incomesvat + expensesvat)*0.24).toFixed(2);
		incomesvat = parseFloat(incomesvat).toFixed(2)
		expensesvat = parseFloat(expensesvat).toFixed(2)
		var incomesvattotal = parseFloat(incomesvat*0.24).toFixed(2);
		var expensesvattotal = parseFloat(expensesvat*0.24).toFixed(2);
		return (
			<div className="report">
				Tilikausi:
				<select name="quarter" onChange={this.handleChange}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
				</select>
				/
				<select name="year" onChange={this.handleChange}>
					{yearoptions}
				</select>
				<h2>Tulot (24%)</h2>
				{incomesvat}
				<h2>Vero (24%)</h2>
				{incomesvattotal}
				<h2>Menot (24%)</h2>
				{expensesvat}
				<h2>Vähennettävä vero</h2>
				{expensesvattotal}
				<h2>Maksettava vero / Palautuksen määrä</h2>
				{total}
			</div>
		);
	}
}

// Transaction
class Transaction extends React.Component{
	constructor(props) {
    super(props);
  }
	render() {

		var date = new Date(this.props.date);
		date = date.toLocaleDateString("fi-FI");
		return (
			<tr>
				<td></td>
				<td>{ date }</td>
				<td>{ this.props.place }</td>
				<td>{ this.props.amount }</td>
				<td>{ this.props.vat }</td>
				<td>{ this.props.target }</td>
				<td>{ this.props.description }</td>
			</tr>
		);
	}
}


class Header extends React.Component{
	constructor(props) {
    super(props);
  }
	render() {
		return (
			<tr>
				<td colSpan="6"><strong>{ this.props.name }</strong></td>
			</tr>
		);
	}
}

class Total extends React.Component{
	constructor(props) {
    super(props);
  }
	render() {
		return (
			<tr className="total">
				<td><strong>Yhteensä:</strong></td>
				<td colSpan="6"><strong>{ this.props.value } €</strong></td>
			</tr>
		);
	}
}


class Tuloslaskelma extends React.Component{
	constructor(props) {
    super(props);
		var today = new Date();
		var year = today.getFullYear();
		this.state = {year:year};
    this.handleChange = this.handleChange.bind(this);
  }
	handleChange(e){
		 this.setState({ [e.target.name]: e.target.value });
	}
	render() {

		var incomes = this.props.incomes;
		var expenses = this.props.expenses;
		var today = new Date();
		var year = today.getFullYear();
		var incomeaccounts= [];
		var expenseaccounts= [];
		var accounts= [];
		var thisyearincome = [];
		var thisyearexpenses = [];
		for (var item in incomes) {
			var date = new Date(incomes[item].date);
			if (this.state.year == date.getFullYear()) {
				incomeaccounts.push(incomes[item].account_id);
				thisyearincome.push(incomes[item]);
			}
		}
		for (var item in expenses) {
			var date = new Date(expenses[item].date);
			if (this.state.year == date.getFullYear()) {
				if (expenseaccounts.includes(expenses[item].account_id) == false) {
					expenseaccounts.push(expenses[item].account_id);
				}
				thisyearexpenses.push(expenses[item]);
			}
		}
		var expensetotal = 0;
		var renderexpenses = [];
		for (var item in expenseaccounts) {
			if (this.props.accountTypes.length != 0) {
				for (var type in this.props.accountTypes) {
					if (expenseaccounts[item] == this.props.accountTypes[type].id) {
						var header = this.props.accountTypes[type].name;
						renderexpenses.push(<Header name={header} key={this.props.accountTypes[type].id} />);
						var total = 0;
						for (var i in thisyearexpenses) {
							if (thisyearexpenses[i].account_id == expenseaccounts[item]) {
								total += parseFloat(thisyearexpenses[i].amount);
								renderexpenses.push(<Transaction amount={thisyearexpenses[i].amount} place={thisyearexpenses[i].place}
								vat={thisyearexpenses[i].vat} key={thisyearexpenses[i].id} date={thisyearexpenses[i].date} accountTypes={this.state.accountTypes}
								target={thisyearexpenses[i].target} description={thisyearexpenses[i].description} onDelete={this.handleDelete} user={this.state.user}
								onEdit={this.handleEdit} id={thisyearexpenses[i].id} account={thisyearexpenses[i].account_id} />);
							}
						}
						var key = "expenses" + item;
						renderexpenses.push(<Total value={total} key={key} />);
						expensetotal += total;
					}
				}
			}
		}
		var renderincome = [];
		var incometotal = 0;
		for (var item in incomeaccounts) {
			if (this.props.accountTypes.length != 0) {
				for (var type in this.props.accountTypes) {
					if (incomeaccounts[item] == this.props.accountTypes[type].id) {
						var header = this.props.accountTypes[type].name;
						renderincome.push(<Header name={header} key={this.props.accountTypes[type].id} />);
						var total = 0;
						for (var i in thisyearincome) {
							total += parseFloat(thisyearincome[i].amount);
							if (thisyearincome[i].account_id == incomeaccounts[item]) {
								renderincome.push(<Transaction amount={thisyearincome[i].amount} place={thisyearincome[i].place}
								vat={thisyearincome[i].vat} key={thisyearincome[i].id} date={thisyearincome[i].date} accountTypes={this.state.accountTypes}
								target={thisyearincome[i].target} description={thisyearincome[i].description} user={this.state.user} id={thisyearincome[i].id}
								account={thisyearincome[i].account_id} />);
							}
						}
						var key = "income" + item;
						incometotal += total;
						renderincome.push(<Total value={total} key={key} />);
					}
				}
			}
		}
		var yearoptions = [];
		for (var i = year; i >= 2019; i--) {
			yearoptions.push(<Option value={i} text={i} key={i}  />);
		}
		var tulos = incometotal + expensetotal;
		return (
			<div className="report">
				Tilikausi:
				<select name="year" onChange={this.handleChange}>
					{yearoptions}
				</select>
				<h2>Yhteensä</h2>
				<p><strong>Menot:</strong> {expensetotal}</p>
				<p><strong>Tulot:</strong> {incometotal} </p>
				<p><strong>Tulos:</strong> {tulos}</p>
				<h2>Menot</h2>
				<table className="table">
					<thead>
						<tr>
							<th>Kirjanpitotili</th>
							<th>Päivä</th>
							<th>Tili</th>
							<th>Määrä</th>
							<th>ALV</th>
							<th>Myyjä</th>
							<th>Kuvaus</th>
						</tr>
					</thead>
					<tbody>
						{renderexpenses}
					</tbody>
				</table>
				<h2>Tulot</h2>
				<table className="table">
				<thead>
					<tr>
						<th>Kirjanpitotili</th>
						<th>Päivä</th>
						<th>Tili</th>
						<th>Määrä</th>
						<th>ALV</th>
						<th>Maksaja</th>
						<th>Kuvaus</th>
					</tr>
				</thead>
					<tbody>
						{renderincome}
					</tbody>
				</table>
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
    this.state = { data: [], user: 0, tab: "alv", accountTypes: [],
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
		var data = this.state.data;
		var table;
		var header
		var incomes = [];
		var expenses = [];
		for (var i in data) {
			if (data[i].amount > 0) {
				incomes.push(data[i]);
			} else {
				expenses.push(data[i]);
			}
		};
		if (this.state.tab == "alv") {
			table = <Alv incomes={incomes} expenses={expenses} user={this.state.user} type={this.state.tab}
				accountTypes={this.state.accountTypes} />;
			header = "ALV-raportti";
		} else if (this.state.tab == "kirjanpito") {
			table = <Tuloslaskelma incomes={incomes} expenses={expenses} user={this.state.user} type={this.state.tab}
				accountTypes={this.state.accountTypes} />;
			header = "Tuloslaskelma";
		} else table = "Error!";
    return (
    	<div>
	   		<h1>Raportit</h1>
				<button type="button" className="btn btn-secondary" id="alv" onClick={this.handleTabs} value="alv">ALV-raportti</button>
				<button type="button" className="btn btn-secondary" id="kirjanpito" onClick={this.handleTabs} value="kirjanpito">Tuloslaskelma</button>
				<h2>{header}</h2>
					{table}
			 </div>
    );
  }
}

// Render the page
ReactDOM.render(
    <Page url="api/accounting" />,
    document.getElementById('content')
);
