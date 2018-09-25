'use strict';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: 'All'
		};
		this.changeFilter = this.changeFilter.bind(this);
	}

	changeFilter(filter) {
		this.setState({
			selected: filter
		});
	}

	filterProjects() {
		if (this.state.selected === 'All') return this.props.projects;

		let projects = [];
		this.props.projects.forEach(item => {
			if (item.category === this.state.selected) {
				projects.push(item);
			}
		});
		return projects;
	}

	render() {
		return (
			<div>
				<Toolbar
					filters={this.props.filters}
					selected={this.state.selected}
					onSelectFilter={this.changeFilter}/>
				<Portfolio projects={this.filterProjects()}/>
			</div>
		)
	}
}
