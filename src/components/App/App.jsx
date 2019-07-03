import React, { Component } from 'react';
import PaletteView from '../PaletteView/PaletteView';

class App extends Component {
	state = {
		loading: false,
		projects: [],
		palettes: [],
		selectedProject: 0
	};

	componentDidMount() {
		this.setState({ loading: true }, async () => {
			const projects = await this.fetchProjects();
			const palettes = await this.fetchPalettes();
			this.setState({ loading: false, projects, palettes });
		});
	}

	fetchProjects = async () => {
		const res = await fetch('http://localhost:3001/api/v1/projects');
		return await res.json();
	};

	fetchPalettes = async () => {
		const res = await fetch('http://localhost:3001/api/v1/palettes');
		return await res.json();
	};

	render() {
		const { projects, palettes, selectedProject } = this.state;
		const filteredPalettes = palettes.filter(palette => palette.project_id === parseInt(selectedProject));
		return (
			<div className="App">
				<select
					className="App-project-select"
					value={selectedProject}
					onChange={e => this.setState({ selectedProject: e.target.value })}
				>
					<option value="0">--</option>
					{projects.map(p => (
						<option key={p.id} value={p.id}>
							{p.name}
						</option>
					))}
				</select>
				<PaletteView palettes={filteredPalettes} />
			</div>
		);
	}
}

export default App;
