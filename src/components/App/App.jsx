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
			const projectsRes = await fetch('http://localhost:3001/api/v1/projects');
			const palettesRes = await fetch('http://localhost:3001/api/v1/palettes');
			const projects = await projectsRes.json();
			const palettes = await palettesRes.json();
			this.setState({ loading: false, projects, palettes });
		});
	}

	render() {
		const { projects, palettes, selectedProject } = this.state;
		const filteredPalettes = palettes.filter(palette => palette.project_id === selectedProject);
		return (
			<div className="App">
				<select className="App-project-select" onChange={e => this.setState({ selectedProject: e.target.value })}>
					<option selected value="0">
						--
					</option>
					{projects.map(p => <option value={p.id}>{p.name}</option>)}
				</select>
				<PaletteView palettes={filteredPalettes} />
			</div>
		);
	}
}

export default App;
