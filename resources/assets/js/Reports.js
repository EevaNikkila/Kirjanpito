

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
		this.state = {quarter:'1', year:'2019'};
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
				<select>
					<option value="2019">2019</option>
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
