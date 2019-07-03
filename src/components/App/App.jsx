import React, { Component } from 'react';
import PaletteView from '../PaletteView/PaletteView';

class App extends Component {
	state = {
		loading: false,
		projects: [],
		palettes: [],
		currentProjectId: 0
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
		const { projects, palettes, currentProjectId } = this.state;
		const filteredPalettes = palettes.filter(palette => palette.id === currentProjectId);
		return (
			<div className="App">
				<output>
					<select className="App-project-select" onChange={e => this.setState({ currentProjectId: e.target.value })}>
						{projects.map(p => <option value={p.id}>{p.name}</option>)}
					</select>
					<PaletteView palettes={filteredPalettes} />
				</output>
			</div>
		);
	}
}

export default App;
