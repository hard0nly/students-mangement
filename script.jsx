const REGIM = {
	S: "Students",
	C: "Companies",
	E: "Events"
}

const dataSpecialities = [{ name: "ИСиТ" }, { name: "ПОИТ" }, { name: "ПОИБМС" }, { name: "ДЭВИ" }];

/*
	Students components
*/

class AddStudent extends React.Component {
	constructor(props) {
		super(props);
		this.iname = null;
		this.ispec = null;
		this.iyear = React.createRef();
		this.igroup = React.createRef();
		this.state = { validate: false };
	}
	getVal = (val) => { this.ispec = val }
	obc = (e) => { this.props.addadd(this.iname, this.ispec, this.iyear.current.value, this.igroup.current.value) }
	nameChange = (event) => {
		this.iname = event.currentTarget.value;
		let v = this.iname && this.iname.trim();
		if (this.state.validate != v) {
			this.setState({ validate: v });
		}
	}
	render() {
		let Year = new Date().getFullYear();
		return <table className="upd-student-table">
			<thead>
				<tr>
					<th colSpan="2">New </th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Name</td>
					<td><input type="text" onChange={this.nameChange} placeholder="Name" className="new-student-input" /></td>
				</tr>
				<tr>
					<td>Spec</td>
					<td><SpecList getVal={this.getVal} data={this.props.dataspec} defaultValue={null} /></td>
				</tr>
				<tr>
					<td>Year</td>
					<td><input type="number" ref={this.iyear} defaultValue={Year} min={Year - 10} max={Year} className="new-student-input" /></td>
				</tr>
				<tr>
					<td>Group</td>
					<td><input type="number" ref={this.igroup} defaultValue={1} min={1} max={20} className="new-student-input" /></td>
				</tr>
				<tr>
					<th colSpan="2">
						<button onClick={this.obc} disabled={!this.state.validate}>Add</button>
						<button onClick={this.props.addCancel}>Cancel</button>
					</th>
				</tr>
			</tbody>
		</table>
	}
}

class UpdStudent extends React.Component {
	constructor(props) {
		super(props);
		this.iid = this.props.currentStudent.id;
		this.iname = this.props.currentStudent.name;
		this.ispec = this.props.currentStudent.spec;
		this.iyear = React.createRef();
		this.igroup = React.createRef();
		this.state = { validate: true };
	}
	getVal = (val) => { this.ispec = val }
	obc = (e) => { this.props.updupd(this.iid, this.iname, this.ispec, this.iyear.current.value, this.igroup.current.value) }
	nameChange = (event) => {
		this.iname = event.currentTarget.value;
		let v = this.iname && this.iname.trim();
		if (this.state.validate != v) {
			this.setState({ validate: v });
		}
	}
	render() {
		let Year = new Date().getFullYear();
		const { id, name, spec, syear, group } = this.props.currentStudent;
		return <table className="upd-student-table">
			<thead>
				<tr>
					<th colSpan="2">Edit</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Name</td>
					<td><input type="text" onChange={this.nameChange} defaultValue={name} placeholder="Name" className="new-student-input" /></td>
				</tr>
				<tr>
					<td>Spec</td>
					<td><SpecList getVal={this.getVal} data={this.props.dataspec} defaultValue={spec} /></td>
				</tr>
				<tr>
					<td>Year</td>
					<td><input type="number" ref={this.iyear} defaultValue={syear} min={Year - 10} max={Year} className="new-student-input" /></td>
				</tr>
				<tr>
					<td>Group</td>
					<td><input type="number" ref={this.igroup} defaultValue={group} min={1} max={20} className="new-student-input" /></td>
				</tr>
				<tr>
					<th colSpan="2">
						<button onClick={this.obc} disabled={!this.state.validate}>Update</button>
						<button onClick={this.props.updCancel}>Cancel</button>
					</th>
				</tr>
			</tbody>
		</table>
	}
}

class DelStudent extends React.Component {
	constructor(props) {
		super(props);
		this.iid = this.props.currentStudent.id;
		this.iflag = false;
	}
	obc = (e) => { this.props.deldel(this.iid, this.iflag) }
	onCheckChange = (e) => { this.iflag = e.currentTarget.checked }
	render() {
		const { id, name, spec, syear, group } = this.props.currentStudent;
		return <table className="del-student-table">
			<thead>
				<tr>
					<th colSpan="2">Delete?</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className="delete-student-table-info-cell">{name} | {spec}-{syear}-{group}</td>
				</tr>
				<tr>
					<td className="delete-student-table-info-cell">
						<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
							<input id="checkboxId" type="checkbox" onChange={this.onCheckChange} />
							<label>Delete connected events</label>
						</div>
					</td>
				</tr>
				<tr>
					<th>
						<button onClick={this.obc}>Delete</button>
						<button onClick={this.props.delCancel}>Cancel</button>
					</th>
				</tr>
			</tbody>
		</table>
	}
}

class Students extends React.Component {
	state = { students: this.props.data };
	onStudentClick = (event) => {
		let targetStudent = event.target;
		this.props.updateCurrentStudent(dataStudents.find((s) => s.id == targetStudent.id));
		Array.from(document.querySelectorAll(".students-list .student-button"))
			.forEach(button => button.classList.add("disabled-button"));
		targetStudent.classList.remove("disabled-button");
		targetStudent.classList.add("enabled-button");
	}

	flagx = () => { return this.state.flagadd || this.state.flagupd || this.state.flagdel }

	addobc = (e) => { this.setState({ flagadd: true }) };
	addcancel = (e) => { this.setState({ flagadd: false }) };
	addadd = (name, spec, year, group) => {
		this.setState({ flagadd: false });
		let newid = Date.now() % (10 * 365 * 24 * 60 * 60 * 1000);
		let newstudent = { id: newid, name: name, spec: spec, group: group, syear: year };
		dataStudents.unshift(newstudent);
		this.props.updateCurrentStudent(newstudent);

		Array.from(document.querySelectorAll(".students-list .student-button"))
			.forEach(button => button.classList.add("disabled-button"));
	}

	updobc = (e) => { this.setState({ flagupd: true }) };
	updcancel = (e) => { this.setState({ flagupd: false }) };
	updupd = (id, name, spec, syear, group) => {
		this.setState({ flagupd: false });
		let ntx = dataStudents.findIndex((em) => em.id == id);
		if (~ntx) {
			this.props.updateCurrentStudent(
				dataStudents[ntx] = { id: id, name: name, spec: spec, syear: syear, group: group });
		}

		dataEvents.filter(e => e.student.id == id).forEach(e => e.student = dataStudents[ntx]);
	}

	delobc = (e) => { this.setState({ flagdel: true }) };
	delcancel = (e) => { this.setState({ flagdel: false }) };
	deldel = (id, flag) => {
		this.props.updateCurrentStudent(null);
		this.setState({ flagdel: false });
		let ntx = dataStudents.findIndex((em) => em.id == id);
		dataStudents.splice(ntx, 1);

		if (flag) {
			for (var i = dataEvents.length - 1; i >= 0; --i) {
				if (dataEvents[i].student.id == id) {
					dataEvents.splice(i, 1);
				}
			}
		}

		Array.from(document.querySelectorAll(".students-list .student-button"))
			.forEach(button => button.classList.add("disabled-button"));

		//this.props.updateCurrentStudent({});
	}

	onFilter = (name, year, spec) => {
		let filteredStudents = dataStudents;
		if (name) {
			filteredStudents = filteredStudents.filter(s => s.name.includes(name));
		}
		if (year) {
			filteredStudents = filteredStudents.filter(s => s.syear == year);
		}
		if (spec) {
			filteredStudents = filteredStudents.filter(s => s.spec == spec);
		}

		this.setState({ students: filteredStudents });
	}

	render() {
		let flag = this.props.currentStudent;

		let students = [];

		let ops = <div className="operations">
			{!this.flagx() && <button id="addStudent" onClick={this.addobc} title="Add new student" className="action-button">
				<img src="shared/images/add.png" />
			</button>}
			{!this.flagx() && flag && <button id="delStudent" onClick={this.delobc} title="Delete student" className="action-button">
				<img src="shared/images/remove.png" />
			</button>}
			{!this.flagx() && flag && <button id="updStudent" onClick={this.updobc} title="Update student" className="action-button">
				<img src="shared/images/refresh.png" />
			</button>}
		</div>

		if (Array.isArray(this.props.data)) {
			students = this.state.students.sort((prev, next) => (prev.name < next.name) ? -1 : 1).map((student, key) =>
				<button key={key} id={student.id} onClick={this.onStudentClick} className="student-button disabled-button">
					{student.name}
				</button>)
		}
		return <div className="students">
			{ops}
			<div style={{ width: "100px", height: "140px" }}>
				{!this.flagx() && <Student_Filters onFilter={this.onFilter} />}
				{this.state.flagadd && <AddStudent addadd={this.addadd} addCancel={this.addcancel} dataspec={dataSpecialities} />}
				{this.state.flagupd && <UpdStudent updupd={this.updupd} updCancel={this.updcancel} currentStudent={this.props.currentStudent} dataspec={dataSpecialities} />}
				{this.state.flagdel && <DelStudent deldel={this.deldel} delCancel={this.delcancel} currentStudent={this.props.currentStudent} />}
			</div>
			<hr />
			<div className="students-list">{students}</div>
		</div >
	}
}

class Add_Student_Event extends React.Component {
	constructor(props) {
		super(props);
		this.idate = React.createRef();
		this.icomp = null;
		this.itext = null;
		this.state = { validate: false };
	}
	getVal = (val) => { this.icomp = val }
	obc = (e) => { this.props.addadd(this.idate.current.value, this.icomp, this.itext) }
	textChange = (event) => {
		this.itext = event.currentTarget.value;
		let v = this.itext && this.itext.trim();
		if (this.state.validate != v) {
			this.setState({ validate: v });
		}
	}
	render() {
		let date = new Date().toISOString().substr(0, 10);
		return <div>
			<table className="add-student-event-table">
				<thead>
					<tr>
						<th colSpan="2">New </th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Date</td>
						<td><input type="date" defaultValue={date} ref={this.idate} /></td>
					</tr>
					<tr>
						<td>Company</td>
						<td><CompList getVal={this.getVal} data={this.props.datacomp} defaultValue={1} /></td>
					</tr>
					<tr>
						<td>Description</td>
						<td><input type="text" onChange={this.textChange} /></td>
					</tr>
					<tr>
						<th colSpan="2">
							<button onClick={this.obc} disabled={!this.state.validate}>Add</button>
							<button onClick={this.props.addCancel}>Cancel</button>
						</th>
					</tr>
				</tbody>
			</table>
			<hr />
		</div>;
	}
}

class Del_Student_Event extends React.Component {
	constructor(props) {
		super(props);
		this.iid = this.props.currentEvent.id;
	}
	obc = (e) => { this.props.deldel(this.iid) }
	render() {
		return <div>
			<table>
				<thead>
					<tr>
						<th colSpan="2">Delete?</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="delete-student-table-info-cell">
							{this.props.currentEvent.date}{this.props.currentEvent.company ? ", " + this.props.currentEvent.company.name : null}, {this.props.currentEvent.text}
						</td>
					</tr>
					<tr>
						<th>
							<button onClick={this.obc}>Delete</button>
							<button onClick={this.props.delCancel}>Cancel</button>
						</th>
					</tr>
				</tbody>
			</table>
			<hr />
		</div>;
	}
}

class Upd_Student_Event extends React.Component {
	constructor(props) {
		super(props);
		this.iid = this.props.currentEvent.id;
		this.icomp = this.props.currentEvent.company.name;
		this.idate = React.createRef();
		this.itext = this.props.currentEvent.text;
		this.state = { validate: true };
	}
	getVal = (val) => { this.icomp = val }
	obc = (e) => { this.props.updupd(this.iid, this.icomp, this.idate.current.value, this.itext) }
	textChange = (event) => {
		this.itext = event.currentTarget.value;
		let v = this.itext && this.itext.trim();
		if (this.state.validate != v) {
			this.setState({ validate: v });
		}
	}
	render() {
		let date = new Date().toISOString().substr(0, 10);
		return <div>
			<table className="add-student-event-table">
				<thead>
					<tr>
						<th colSpan="2">Edit </th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Date</td>
						<td><input type="date" ref={this.idate} defaultValue={this.props.currentEvent.date} /></td>
					</tr>
					<tr>
						<td>Company</td>
						<td><CompList getVal={this.getVal} data={this.props.datacomp} defaultValue={this.props.currentEvent.company.name} /></td>
					</tr>
					<tr>
						<td>Description</td>
						<td><input type="text" onChange={this.textChange} defaultValue={this.itext} /></td>
					</tr>
					<tr>
						<th colSpan="2">
							<button onClick={this.obc} disabled={!this.state.validate}>Update</button>
							<button onClick={this.props.updCancel}>Cancel</button>
						</th>
					</tr>
				</tbody>
			</table>
			<hr />
		</div>;
	}
}

class Student_Events extends React.Component {
	state = {}
	constructor(props) {
		super(props);
	}

	flagx = () => { return this.state.flagadd || this.state.flagupd || this.state.flagdel }

	addobc = (e) => { this.setState({ flagadd: true }) }
	addcancel = (e) => { this.setState({ flagadd: false }) }
	addadd = (date, comp, text) => {
		let newid = Date.now() % (10 * 365 * 24 * 60 * 60 * 1000);
		let newevent = {
			id: newid,
			date: date,
			text: text,
			company: dataCompanies.find(c => c.name == comp),
			student: dataStudents.find(s => s.id == this.props.currentStudent.id)
		}
		this.props.data.unshift(newevent);
		this.setState({
			flagupd: false,
			flagadd: true,
			flagdel: false,
		});
	}

	delobc = (e) => {
		const eventid = e.currentTarget.id;
		const curEvent = dataEvents.find(ev => ev.id == eventid);
		this.setState({
			flagupd: false,
			flagadd: false,
			flagdel: true,
			currentEvent: curEvent
		});
	}
	delcancel = (e) => { this.setState({ flagdel: false }) }
	deldel = (id) => {
		let ntx = dataEvents.findIndex((em) => em.id == id);
		dataEvents.splice(ntx, 1);
		this.setState({ flagdel: false });
	}

	updobc = (e) => {
		const eventid = e.currentTarget.id;
		const curEvent = dataEvents.find(ev => ev.id == eventid);
		this.setState({
			flagupd: true,
			flagadd: false,
			flagdel: false,
			currentEvent: curEvent
		});
	}
	updcancel = (e) => { this.setState({ flagupd: false }) }
	updupd = (id, comp, date, text) => {
		let ntx = dataEvents.findIndex((em) => em.id == id);
		const company = dataCompanies.find(c => c.name == comp);
		if (~ntx) {
			dataEvents[ntx].company = company;
			dataEvents[ntx].date = date;
			dataEvents[ntx].text = text;
		}

		this.setState({ flagupd: false });
	}

	render() {
		let flag = this.props.currentStudent;

		if (!flag || !Object.keys(flag).length) {
			return <div></div>;
		}

		let header = <h3></h3>;
		let items = null;
		if (this.props.currentStudent) {
			const { name, spec, syear, group } = this.props.currentStudent;
			header = <h3>{name} | {spec}-{syear}-{group}<hr style={{ width: "360px" }} /></h3>
			items = this.props.data.map((item, key) => {
				if (item.student.id == this.props.currentStudent.id) {
					return <div key={item.id}>
						<button id={item.id} onClick={this.delobc} className="action-detail-button disabled-button">
							<img src="shared/images/remove.png" />
						</button>
						<button id={item.id} onClick={this.updobc} className="action-detail-button disabled-button">
							<img src="shared/images/refresh.png" />
						</button>
						<button id={item.id} className="student-events-button disabled-button" style={{ width: "315px" }}>
							{item.date}{item.company ? ", " + item.company.name : null}, {item.text}
						</button>
					</div>
				}
			});
		}
		return <div className="student-events">
			{header}

			{this.state.flagadd && < Add_Student_Event addadd={this.addadd} addCancel={this.addcancel} datacomp={dataCompanies} />}
			{this.state.flagdel && < Del_Student_Event deldel={this.deldel} delCancel={this.delcancel} currentEvent={this.state.currentEvent} />}
			{this.state.flagupd && < Upd_Student_Event updupd={this.updupd} updCancel={this.updcancel} currentEvent={this.state.currentEvent} datacomp={dataCompanies} />}

			{!this.flagx() && flag && <button onClick={this.addobc} className="action-detail-button" style={{ margin: "-20px 0 20px 0" }}>
				<img src="shared/images/add.png" />
			</button>}

			{items}
		</div>;
	}
}

class Student_Filters extends React.Component {
	state = {}
	constructor(props) {
		super(props);
		this.name = null;
		this.spec = "ИСиТ";
		this.year = null;
	}
	nameChange(e) {
		this.name = e.currentTarget.value;
	}
	specChange = (val) => {
		this.spec = val;

	}
	yearChange(e) {
		this.year = e.currentTarget.value;
	}
	onFilter = () => {
		this.props.onFilter(this.name, this.year, this.spec);
	}
	onReset = () => {
		let oldSpec = this.spec;

		this.name = null;
		this.spec = null;
		this.year = null;

		document.getElementById("nameInput").value = null;
		document.getElementById("yearInput").value = null;

		this.onFilter();

		this.spec = oldSpec;
	}
	render() {
		let Year = new Date().getFullYear();
		let date = new Date().toISOString().substr(0, 10);
		return <table className="add-student-event-table" style={{ width: "100px" }}>
			<thead>
				<tr>
					<th colSpan="2">Filter </th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Name</td>
					<td><input style={{ width: "100px" }} id="nameInput" type="text" onChange={this.nameChange.bind(this)} /></td>
				</tr>
				<tr>
					<td>Year</td>
					<td><input style={{ width: "100px" }} id="yearInput" type="number" onChange={this.yearChange.bind(this)} /></td>
				</tr>
				<tr>
					<td>Spec</td>
					<td><SpecList getVal={this.specChange} data={dataSpecialities} defaultValue={this.spec} /></td>
				</tr>
				<tr>
					<th colSpan="2">
						<button onClick={this.onFilter}>Filter</button>
						<button onClick={this.onReset}>Reset</button>
					</th>
				</tr>
			</tbody>
		</table>;
	}
}

/*
	Companies components
*/

class AddCompany extends React.Component {
	constructor(props) {
		super(props);
		this.iname = null;
		this.state = { validate: false };
	}
	getVal = (val) => { this.ispec = val }
	obc = (e) => { this.props.addadd(this.iname) }
	nameChange = (event) => {
		this.iname = event.currentTarget.value;
		let v = this.iname && this.iname.trim();
		if (this.state.validate != v) {
			this.setState({ validate: v });
		}
	}
	render() {
		let Year = new Date().getFullYear();
		return <table className="add-company-table">
			<thead>
				<tr>
					<th colSpan="2">New </th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Name</td>
					<td><input type="text" onChange={this.nameChange} placeholder="Name" className="new-student-input" /></td>
				</tr>
				<tr>
					<th colSpan="2">
						<button onClick={this.obc} disabled={!this.state.validate}>Add</button>
						<button onClick={this.props.addCancel}>Cancel</button>
					</th>
				</tr>
			</tbody>
		</table>
	}
}

class UpdCompany extends React.Component {
	constructor(props) {
		super(props);
		this.iid = this.props.currentCompany.id;
		this.iname = this.props.currentCompany.name;
		this.state = { validate: true };
	}
	getVal = (val) => { this.ispec = val }
	obc = (e) => { this.props.updupd(this.iid, this.iname) }
	nameChange = (event) => {
		this.iname = event.currentTarget.value;
		let v = this.iname && this.iname.trim();
		if (this.state.validate != v) {
			this.setState({ validate: v });
		}
	}
	render() {
		let Year = new Date().getFullYear();
		const { id, name } = this.props.currentCompany;
		return <table className="upd-company-table">
			<thead>
				<tr>
					<th colSpan="2">Edit</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Name</td>
					<td><input type="text" onChange={this.nameChange} defaultValue={name} placeholder="Name" className="new-company-input" /></td>
				</tr>
				<tr>
					<th colSpan="2">
						<button onClick={this.obc} disabled={!this.state.validate}>Update</button>
						<button onClick={this.props.updCancel}>Cancel</button>
					</th>
				</tr>
			</tbody>
		</table>
	}
}

class DelCompany extends React.Component {
	constructor(props) {
		super(props);
		this.iid = this.props.currentCompany.id;
		this.iflag = false;
	}
	obc = (e) => { this.props.deldel(this.iid, this.iflag) }
	onCheckChange = (e) => { this.iflag = e.currentTarget.checked }
	render() {
		const { id, name } = this.props.currentCompany;
		return <table className="del-company-table">
			<thead>
				<tr>
					<th colSpan="2">Delete?</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className="delete-company-table-info-cell">{name}</td>
				</tr>
				<tr>
					<td className="delete-student-table-info-cell">
						<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
							<input id="checkboxId" type="checkbox" onChange={this.onCheckChange} />
							<label>Delete connected events</label>
						</div>
					</td>
				</tr>
				<tr>
					<th>
						<button onClick={this.obc}>Delete</button>
						<button onClick={this.props.delCancel}>Cancel</button>
					</th>
				</tr>
			</tbody>
		</table>
	}
}

class Companies extends React.Component {
	state = { companies: this.props.data };
	onCompanyClick = (event) => {
		let targetCompany = event.target;
		this.props.updateCurrentCompany(this.state.companies.find((s) => s.id == targetCompany.id));
		Array.from(document.querySelectorAll(".companies-list .company-button"))
			.forEach(button => button.classList.add("disabled-button"));
		targetCompany.classList.remove("disabled-button");
		targetCompany.classList.add("enabled-button");
	}

	flagx = () => { return this.state.flagadd || this.state.flagupd || this.state.flagdel }

	addobc = (e) => { this.setState({ flagadd: true }) };
	addcancel = (e) => { this.setState({ flagadd: false }) };
	addadd = (name) => {
		this.setState({ flagadd: false });
		let newid = Date.now() % (10 * 365 * 24 * 60 * 60 * 1000);
		let newcompany = { id: newid, name: name };
		this.state.companies.unshift(newcompany);
		this.props.updateCurrentCompany(newcompany);

		Array.from(document.querySelectorAll(".companies-list .company-button"))
			.forEach(button => button.classList.add("disabled-button"));
	}

	updobc = (e) => { this.setState({ flagupd: true }) };
	updcancel = (e) => { this.setState({ flagupd: false }) };
	updupd = (id, name) => {
		this.setState({ flagupd: false });
		let ntx = this.state.companies.findIndex((em) => em.id == id);
		if (~ntx) {
			this.props.updateCurrentCompany(
				this.state.companies[ntx] = { id: id, name: name });
		}

		dataEvents.filter(e => e.company.id == id).forEach(e => e.company = dataCompanies[ntx]);
	}

	delobc = (e) => { this.setState({ flagdel: true }) };
	delcancel = (e) => { this.setState({ flagdel: false }) };
	deldel = (id, flag) => {
		this.props.updateCurrentCompany(null);
		this.setState({ flagdel: false });
		let ntx = this.state.companies.findIndex((em) => em.id == id);
		this.state.companies.splice(ntx, 1);

		if (flag) {
			for (var i = dataEvents.length - 1; i >= 0; --i) {
				if (dataEvents[i].company.id == id) {
					dataEvents.splice(i, 1);
				}
			}
		}

		Array.from(document.querySelectorAll(".companies-list .company-button"))
			.forEach(button => button.classList.add("disabled-button"));
	}

	render() {
		let flag = this.props.currentCompany;

		let companies = [];

		let ops = <div className="operations">
			{!this.flagx() && <button id="addCompany" onClick={this.addobc} title="Add new company" className="action-button">
				<img src="shared/images/add.png" />
			</button>}
			{!this.flagx() && flag && <button id="delCompany" onClick={this.delobc} title="Delete company" className="action-button">
				<img src="shared/images/remove.png" />
			</button>}
			{!this.flagx() && flag && <button id="updCompany" onClick={this.updobc} title="Update company" className="action-button">
				<img src="shared/images/refresh.png" />
			</button>}
		</div>

		if (Array.isArray(this.props.data)) {
			companies = this.state.companies.sort((prev, next) => (prev.name < next.name) ? -1 : 1).map((company, key) =>
				<button key={key} id={company.id} onClick={this.onCompanyClick} className="company-button disabled-button">
					{company.name}
				</button>)
		}
		return <div className="companies">
			{ops}
			{this.state.flagadd && <AddCompany addadd={this.addadd} addCancel={this.addcancel} dataspec={dataSpecialities} />}
			{this.state.flagupd && <UpdCompany updupd={this.updupd} updCancel={this.updcancel} currentCompany={this.props.currentCompany} dataspec={dataSpecialities} />}
			{this.state.flagdel && <DelCompany deldel={this.deldel} delCancel={this.delcancel} currentCompany={this.props.currentCompany} />}
			<div className="companies-list">{companies}</div>
		</div >
	}
}

class Add_Company_Event extends React.Component {
	constructor(props) {
		super(props);
		this.idate = React.createRef();
		this.istud = null;
		this.itext = null;
		this.state = { validate: false };
	}
	getVal = (val) => { this.istud = val }
	obc = (e) => { this.props.addadd(this.idate.current.value, this.istud, this.itext) }
	textChange = (event) => {
		this.itext = event.currentTarget.value;
		let v = this.itext && this.itext.trim();
		if (this.state.validate != v) {
			this.setState({ validate: v });
		}
	}
	render() {
		let date = new Date().toISOString().substr(0, 10);
		return <div>
			<table className="add-student-event-table">
				<thead>
					<tr>
						<th colSpan="2">New </th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Date</td>
						<td><input type="date" defaultValue={date} ref={this.idate} /></td>
					</tr>
					<tr>
						<td>Student</td>
						<td><StudList getVal={this.getVal} data={this.props.datastud} defaultValue={1} /></td>
					</tr>
					<tr>
						<td>Description</td>
						<td><input type="text" onChange={this.textChange} /></td>
					</tr>
					<tr>
						<th colSpan="2">
							<button onClick={this.obc} disabled={!this.state.validate}>Add</button>
							<button onClick={this.props.addCancel}>Cancel</button>
						</th>
					</tr>
				</tbody>
			</table>
			<hr />
		</div>;
	}
}

class Del_Company_Event extends React.Component {
	constructor(props) {
		super(props);
		this.iid = this.props.currentEvent.id;
	}
	obc = (e) => { this.props.deldel(this.iid) }
	render() {
		return <div>
			<table className="del-student-table">
				<thead>
					<tr>
						<th colSpan="2">Delete?</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="delete-student-table-info-cell">
							{this.props.currentEvent.date}, {this.props.currentEvent.text}{this.props.currentEvent.student ? ", " + this.props.currentEvent.student.name : null}
						</td>
					</tr>
					<tr>
						<th>
							<button onClick={this.obc}>Delete</button>
							<button onClick={this.props.delCancel}>Cancel</button>
						</th>
					</tr>
				</tbody>
			</table>
			<hr />
		</div>
	}
}

class Upd_Company_Event extends React.Component {
	constructor(props) {
		super(props);
		this.iid = this.props.currentEvent.id;
		this.istud = this.props.currentEvent.student.id;
		this.idate = React.createRef();
		this.itext = this.props.currentEvent.text;
		this.state = { validate: true };
	}
	getVal = (val) => { this.istud = val }
	obc = (e) => { this.props.updupd(this.iid, this.idate.current.value, this.istud, this.itext) }
	textChange = (event) => {
		this.itext = event.currentTarget.value;
		let v = this.itext && this.itext.trim();
		if (this.state.validate != v) {
			this.setState({ validate: v });
		}
	}
	render() {
		let date = new Date().toISOString().substr(0, 10);
		return <div>
			<table className="add-student-event-table">
				<thead>
					<tr>
						<th colSpan="2">Edit </th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Date</td>
						<td><input type="date" ref={this.idate} defaultValue={this.props.currentEvent.date} /></td>
					</tr>
					<tr>
						<td>Student</td>
						<td><StudList getVal={this.getVal} data={this.props.datastud} defaultValue={this.props.currentEvent.student.id} /></td>
					</tr>
					<tr>
						<td>Description</td>
						<td><input type="text" onChange={this.textChange} defaultValue={this.itext} /></td>
					</tr>
					<tr>
						<th colSpan="2">
							<button onClick={this.obc} disabled={!this.state.validate}>Update</button>
							<button onClick={this.props.updCancel}>Cancel</button>
						</th>
					</tr>
				</tbody>
			</table>
			<hr />
		</div>;
	}
}

class Company_Events extends React.Component {
	state = {}
	constructor(props) {
		super(props);
	}

	flagx = () => { return this.state.flagadd || this.state.flagupd || this.state.flagdel }

	addobc = (e) => {
		this.setState({
			flagupd: false,
			flagadd: true,
			flagdel: false,
		})
	}
	addcancel = (e) => { this.setState({ flagadd: false }) }
	addadd = (date, stud, text) => {
		let newid = Date.now() % (10 * 365 * 24 * 60 * 60 * 1000);
		let newevent = {
			id: newid,
			date: date,
			text: text,
			company: this.props.currentCompany,
			student: dataStudents.find(s => s.id == stud)
		}
		this.props.data.unshift(newevent);
		this.setState({ flagadd: false });
	}

	delobc = (e) => {
		const eventid = e.currentTarget.id;
		const curEvent = dataEvents.find(ev => ev.id == eventid);
		this.setState({
			flagupd: false,
			flagadd: false,
			flagdel: true,
			currentEvent: curEvent
		});
	}
	delcancel = (e) => { this.setState({ flagdel: false }) }
	deldel = (id) => {
		let ntx = dataEvents.findIndex((em) => em.id == id);
		dataEvents.splice(ntx, 1);
		this.setState({ flagdel: false });
	}

	updobc = (e) => {
		const eventid = e.currentTarget.id;
		const curEvent = dataEvents.find(ev => ev.id == eventid);
		this.setState({
			flagupd: true,
			flagadd: false,
			flagdel: false,
			currentEvent: curEvent
		});
	}
	updcancel = (e) => { this.setState({ flagupd: false }) }
	updupd = (id, date, stud, text) => {
		let ntx = dataEvents.findIndex((em) => em.id == id);
		const student = dataStudents.find(c => c.id == stud);
		if (~ntx) {
			dataEvents[ntx].student = student;
			dataEvents[ntx].date = date;
			dataEvents[ntx].text = text;
		}

		this.setState({ flagupd: false });
	}

	render() {
		let flag = this.props.currentCompany;

		if (!flag || !Object.keys(flag).length) {
			return <div></div>
		}

		let header = <h3></h3>;
		let items = null;
		if (this.props.currentCompany) {
			const { name, spec, syear, group } = this.props.currentCompany;
			header = <h3>{name}<hr style={{ width: "360px" }} /></h3>
			items = this.props.data.map((item, key) => {
				if (item.company.id == this.props.currentCompany.id) {
					return <div key={item.id}>
						<button id={item.id} onClick={this.delobc} className="action-detail-button disabled-button">
							<img src="shared/images/remove.png" />
						</button>
						<button id={item.id} onClick={this.updobc} className="action-detail-button disabled-button">
							<img src="shared/images/refresh.png" />
						</button>
						<button key={key} id={item.id} className="company-events-button disabled-button" style={{ width: "315px" }}>
							{item.date}, {item.text}{item.student ? ", " + item.student.name : null}
						</button>
					</div>
				}
			});
		}
		return <div className="company-events">
			{header}

			{this.state.flagadd && < Add_Company_Event addadd={this.addadd} addCancel={this.addcancel} datastud={dataStudents} />}
			{this.state.flagdel && < Del_Company_Event deldel={this.deldel} delCancel={this.delcancel} currentEvent={this.state.currentEvent} />}
			{this.state.flagupd && < Upd_Company_Event updupd={this.updupd} updCancel={this.updcancel} currentEvent={this.state.currentEvent} datastud={dataStudents} />}

			{!this.flagx() && flag && <button onClick={this.addobc} className="action-detail-button" style={{ margin: "-20px 0 20px 0" }}>
				<img src="shared/images/add.png" />
			</button>}

			{items}
		</div>;
	}
}

/*
	Events components
*/

class AddEvent extends React.Component {
	constructor(props) {
		super(props);
		this.icomp = null;
		this.istud = null;
		this.idate = React.createRef();
		this.itext = null;
		this.state = { validate: false };
	}
	getStudVal = (val) => { this.istud = val; }
	getCompVal = (val) => { this.icomp = val; }
	obc = (e) => { this.props.addadd(this.itext, this.icomp, this.istud, this.idate.current.value) }
	textChange = (event) => {
		this.itext = event.currentTarget.value;
		let v = this.itext && this.itext.trim();
		if (this.state.validate != v) {
			this.setState({ validate: v });
		}
	}
	render() {
		let date = new Date().toISOString().substr(0, 10);
		return <table className="upd-student-table">
			<thead>
				<tr>
					<th colSpan="2">New </th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Student</td>
					<td><StudList getVal={this.getStudVal} data={dataStudents} defaultValue={this.istud} /></td>
				</tr>
				<tr>
					<td>Company</td>
					<td><CompList getVal={this.getCompVal} data={dataCompanies} defaultValue={this.icomp} /></td>
				</tr>
				<tr>
					<td>Date</td>
					<td><input type="date" defaultValue={date} ref={this.idate} /></td>
				</tr>
				<tr>
					<td>Description</td>
					<td><input type="text" onChange={this.textChange} style={{ width: "136px" }} /></td>
				</tr>
				<tr>
					<th colSpan="2">
						<button onClick={this.obc} disabled={!this.state.validate}>Add</button>
						<button onClick={this.props.addCancel}>Cancel</button>
					</th>
				</tr>
			</tbody>
		</table>
	}
}

class UpdEvent extends React.Component {
	constructor(props) {
		super(props);
		this.iid = this.props.currentEvent.id;
		this.icomp = this.props.currentEvent.company.name;
		this.istud = this.props.currentEvent.student.id;
		this.idate = React.createRef();
		this.itext = this.props.currentEvent.text;
		this.state = { validate: true };
	}
	getStudVal = (val) => { this.istud = val }
	getCompVal = (val) => { this.icomp = val }
	obc = (e) => { this.props.updupd(this.iid, this.itext, this.icomp, this.istud, this.idate.current.value) }
	textChange = (event) => {
		this.itext = event.currentTarget.value;
		let v = this.itext && this.itext.trim();
		if (this.state.validate != v) {
			this.setState({ validate: v });
		}
	}
	render() {
		let date = new Date().toISOString().substr(0, 10);
		return <table className="upd-student-table">
			<thead>
				<tr>
					<th colSpan="2">Edit </th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Student</td>
					<td><StudList getVal={this.getStudVal} data={dataStudents} defaultValue={this.istud} /></td>
				</tr>
				<tr>
					<td>Company</td>
					<td><CompList getVal={this.getCompVal} data={dataCompanies} defaultValue={this.icomp} /></td>
				</tr>
				<tr>
					<td>Date</td>
					<td><input type="date" defaultValue={this.props.currentEvent.date} ref={this.idate} /></td>
				</tr>
				<tr>
					<td>Description</td>
					<td><input type="text" onChange={this.textChange} defaultValue={this.props.currentEvent.text} style={{ width: "136px" }} /></td>
				</tr>
				<tr>
					<th colSpan="2">
						<button onClick={this.obc} disabled={!this.state.validate}>Add</button>
						<button onClick={this.props.updCancel}>Cancel</button>
					</th>
				</tr>
			</tbody>
		</table>
	}
}

class DelEvent extends React.Component {
	constructor(props) {
		super(props);
		this.iid = this.props.currentEvent.id;
	}
	obc = (e) => { this.props.deldel(this.iid) }
	render() {
		return <table className="del-student-table">
			<thead>
				<tr>
					<th colSpan="2">Delete?</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className="delete-student-table-info-cell">
						{this.props.currentEvent.date}, {this.props.currentEvent.company.name}, {this.props.currentEvent.text}, {this.props.currentEvent.student.name}</td>
				</tr>
				<tr>
					<th>
						<button onClick={this.obc}>Delete</button>
						<button onClick={this.props.delCancel}>Cancel</button>
					</th>
				</tr>
			</tbody>
		</table>
	}
}

class Events extends React.Component {
	state = { events: this.props.data };
	onEventClick = (event) => {
		let targetEvent = event.target;
		this.props.updateCurrentEvent(dataEvents.find((e) => e.id == targetEvent.id));
		Array.from(document.querySelectorAll(".events-list .student-button"))
			.forEach(button => button.classList.add("disabled-button"));
		targetEvent.classList.remove("disabled-button");
		targetEvent.classList.add("enabled-button");
	}

	flagx = () => { return this.state.flagadd || this.state.flagupd || this.state.flagdel }

	addobc = (e) => { this.setState({ flagadd: true }) };
	addcancel = (e) => { this.setState({ flagadd: false }) };
	addadd = (text, comp, stud, date) => {
		this.setState({ flagadd: false });
		let newid = Date.now() % (10 * 365 * 24 * 60 * 60 * 1000);
		const company = dataCompanies.find(c => c.name == comp);
		const student = dataStudents.find(s => s.id == stud);
		let newevent = { id: newid, text: text, company: company, student: student, date: date };
		dataEvents.unshift(newevent);
	}

	updobc = (e) => { this.setState({ flagupd: true }) };
	updcancel = (e) => { this.setState({ flagupd: false }) };
	updupd = (id, text, comp, stud, date) => {
		this.setState({ flagupd: false });
		let ntx = dataEvents.findIndex((em) => em.id == id);
		const company = dataCompanies.find(c => c.name == comp);
		const student = dataStudents.find(s => s.id == stud);
		if (~ntx) {
			this.props.updateCurrentEvent(
				dataEvents[ntx] = { id: id, text: text, company: company, student: student, date: date });
		}
	}

	delobc = (e) => { this.setState({ flagdel: true }) };
	delcancel = (e) => { this.setState({ flagdel: false }) };
	deldel = (id) => {
		this.props.updateCurrentEvent(null);
		this.setState({ flagdel: false });
		let ntx = dataEvents.findIndex((em) => em.id == id);
		dataEvents.splice(ntx, 1);

		Array.from(document.querySelectorAll(".events-list .student-button"))
			.forEach(button => button.classList.add("disabled-button"));
	}

	onFilter = (date, text) => {
		let filteredEvents = dataEvents;
		if (date) {
			filteredEvents = filteredEvents.filter(e => e.date == date);
		}
		if (text) {
			filteredEvents = filteredEvents.filter(e => e.text.includes(text));
		}

		this.setState({ events: filteredEvents });
	}

	render() {
		let flag = this.props.currentEvent;

		let events = [];

		let ops = <div className="operations">
			{!this.flagx() && <button id="addEvent" onClick={this.addobc} title="Add new event" className="action-button">
				<img src="shared/images/add.png" />
			</button>}
			{!this.flagx() && flag && <button id="delEvent" onClick={this.delobc} title="Delete event" className="action-button">
				<img src="shared/images/remove.png" />
			</button>}
			{!this.flagx() && flag && <button id="updEvent" onClick={this.updobc} title="Update event" className="action-button">
				<img src="shared/images/refresh.png" />
			</button>}
		</div>

		if (Array.isArray(this.props.data)) {
			events = this.state.events.sort((prev, next) => (prev.date > next.date) ? -1 : 1).map((event, key) =>
				<button key={key} id={event.id} onClick={this.onEventClick} className="student-button disabled-button">
					{event.date}, {event.company.name}, {event.text}, {event.student.name}
				</button>)
		}
		return <div>
			<div className="events" style={{ display: "flex" }}>
				<div style={{ display: "flex", flexDirection: "column", height: "506px", borderRight: "lightgrey 1px solid" }}>
					{ops}
					{!this.flagx() && <Event_Filters onFilter={this.onFilter} />}
				</div>

				{this.state.flagadd && <AddEvent addadd={this.addadd} addCancel={this.addcancel} datastud={dataStudents} datacomp={dataCompanies} />}
				{this.state.flagupd && <UpdEvent updupd={this.updupd} updCancel={this.updcancel} currentEvent={this.props.currentEvent} datastud={dataStudents} datacomp={dataCompanies} />}
				{this.state.flagdel && <DelEvent deldel={this.deldel} delCancel={this.delcancel} currentEvent={this.props.currentEvent} />}
				<div className="student-events events-list" style={{ overflowY: "auto", overflowX: "hidden", height: "504px" }}>
					<h3>Events</h3>
					<hr style={{ width: "100%", marginTop: "-10px" }} />
					{events}
				</div>
			</div>
		</div>
	}
}

class Event_Filters extends React.Component {
	state = {}
	constructor(props) {
		super(props);
		this.date = null;
		this.text = null;
	}
	dateChange = (e) => {
		this.date = e.currentTarget.value;
	}
	textChange = (e) => {
		this.text = e.currentTarget.value;
	}
	onFilter = () => {
		this.props.onFilter(this.date, this.text);
	}
	onReset = () => {
		this.date = null;
		this.text = null;

		document.getElementById("dateInput").value = null;
		document.getElementById("textInput").value = null;

		this.onFilter();
	}
	render() {
		let date = new Date().toISOString().substr(0, 10);
		return <table className="add-student-event-table" style={{ width: "100px" }}>
			<thead>
				<tr>
					<th colSpan="2">Filter </th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Date</td>
					<td><input style={{ width: "130px" }} id="dateInput" type="date" onChange={this.dateChange} /></td>
				</tr>
				<tr>
					<td>Text</td>
					<td><input style={{ width: "127px" }} id="textInput" type="text" onChange={this.textChange} /></td>
				</tr>
				<tr>
					<th colSpan="2">
						<button onClick={this.onFilter}>Filter</button>
						<button onClick={this.onReset}>Reset</button>
					</th>
				</tr>
			</tbody>
		</table>;
	}
}

/*
	Common components
*/

class SpecList extends React.Component {
	onSpecChange = (event) => { this.props.getVal(event.currentTarget.value) }
	render() {
		if (!this.props.defaultValue) {
			this.props.getVal(this.props.data[0].name);
		}
		let values = this.props.data.map((item, key) => <option key={item.name} value={item.name}>{item.name}</option>);
		return <select onChange={this.onSpecChange} defaultValue={this.props.defaultValue} className="new-student-select">
			{values}
		</select>
	}
}

class CompList extends React.Component {
	onCompChange = (event) => { this.props.getVal(event.currentTarget.value) }
	render() {
		if (!this.props.defaultValue) {
			this.props.getVal(this.props.data[0].name);
		}
		let values = this.props.data.map((item, key) => <option key={item.name} value={item.name}>{item.name}</option>);
		return <select onChange={this.onCompChange} defaultValue={this.props.defaultValue} className="new-student-select">
			{values}
		</select>
	}
}

class StudList extends React.Component {
	onStudChange = (event) => { this.props.getVal(event.currentTarget.value) }
	render() {
		if (!this.props.defaultValue) {
			this.props.getVal(this.props.data[0].id);
		}
		let values = this.props.data.map((item, key) => <option key={item.name} value={item.id}>{item.name}</option>);
		return <select onChange={this.onStudChange} defaultValue={this.props.defaultValue} className="new-student-select">
			{values}
		</select>
	}
}

class Navigation extends React.Component {
	onClick(event) {
		let targetButton = event.currentTarget;
		this.props.changeRegim(REGIM[targetButton.id]);

		Array.from(document.querySelectorAll(".nav-panel div"))
			.forEach(button => button.className = "tab");
		targetButton.className = "tab-selected";
	}
	render() {
		return <nav className="nav-panel">
			<div id="S" onClick={this.onClick.bind(this)} className="tab-selected">Students</div>
			<div id="C" onClick={this.onClick.bind(this)} className="tab">Companies</div>
			<div id="E" onClick={this.onClick.bind(this)} className="tab">Events</div>
		</nav>
	}
}

class Panel extends React.Component {
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

class App extends React.Component {
	state = { Regim: REGIM.S };
	changeRegim = (rId) => this.state.Regim != rId ? this.setState({ Regim: rId }) : null;
	render() {
		return <div className="main-container">
			<Navigation changeRegim={this.changeRegim} />
			<Panel Regim={this.state.Regim} />
		</div>
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);