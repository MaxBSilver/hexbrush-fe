import React, { Component } from "react";
import PaletteView from "../PaletteView/PaletteView";
import ColorView from "../ColorView/ColorView";

class App extends Component {
	state = {
		loading: false,
		projects: [],
		palettes: [],
		selectedProject: 0,
		error: ''
	};

	componentDidMount() {
		this.setState({ loading: true }, async () => {
			const projects = await this.fetchProjects();
			const palettes = await this.fetchPalettes();
			this.setState({ loading: false, projects, palettes });
		});
	}

	fetchProjects = async () => {
		try {
			const res = await fetch('http://localhost:3001/api/v1/projects');
			return await res.json();
		} catch (err) {
			this.setState({ error: err.message });
		}
	};

	fetchPalettes = async () => {
		try {
			const res = await fetch('http://localhost:3001/api/v1/palettes');
			return await res.json();
		} catch (err) {
			this.setState({ error: err.message });
		}
	};

	render() {
		const { projects, palettes, selectedProject } = this.state;
		const filteredPalettes = palettes.filter(palette => palette.project_id === parseInt(selectedProject));
		return (
			<div className="App">
				<ColorView projects={this.state.projects}/>
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
