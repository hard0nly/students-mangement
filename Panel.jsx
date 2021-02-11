export default class Panel extends React.Component {
	state = { currentStudent: null, currentCompany: null };
	updateCurrentStudent = (student) => {
		this.setState({ currentStudent: student });
	}
	updateCurrentCompany = (company) => {
		this.setState({ currentCompany: company });
	}
	updateCurrentEvent = (event) => {
		this.setState({ currentEvent: event });
	}
	render() {
		return <div className="panel">
			{(this.props.Regim === REGIM.S) && <Students data={dataStudents} updateCurrentStudent={this.updateCurrentStudent} currentStudent={this.state.currentStudent} />}
			{(this.props.Regim === REGIM.S) && <Student_Events data={dataEvents} currentStudent={this.state.currentStudent} />}
			{(this.props.Regim === REGIM.C) && <Companies data={dataCompanies} updateCurrentCompany={this.updateCurrentCompany} currentCompany={this.state.currentCompany} />}
			{(this.props.Regim === REGIM.C) && <Company_Events data={dataEvents} currentCompany={this.state.currentCompany} />}
			{(this.props.Regim === REGIM.E) && <Events data={dataEvents} updateCurrentEvent={this.updateCurrentEvent} currentEvent={this.state.currentEvent} />}
		</div>
	}
}