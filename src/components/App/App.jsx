import React, { Component } from 'react';
import PaletteView from '../PaletteView/PaletteView';
import ColorView from '../ColorView/ColorView';

class App extends Component {
	state = {
		loading: false,
		projects: [],
		palettes: [],
		selectedProject: 0,
		editInfo: { editing: false, displayEdit: false, hex: [] },
		error: ''
	};

	componentDidMount () {
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

	addProject = async (projectName, paletteName, colors) => {
		const { projects } = this.state;
		try {
			const res = await fetch('http://localhost:3001/api/v1/projects', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: projectName })
			});
			const newProject = await res.json();
			this.setState({ projects: [ ...projects, newProject ] }, () => {
				this.addPalette(newProject.id, paletteName, colors);
			});
		} catch (err) {
			this.setState({ error: err.message });
		}
	};

	addPalette = async (projectId, name, colors) => {
		const { palettes } = this.state;
		const paletteData = {
			name,
			project_id: projectId,
			color_1: colors[0].hex,
			color_2: colors[1].hex,
			color_3: colors[2].hex,
			color_4: colors[3].hex,
			color_5: colors[4].hex
		};
		try {
			const res = await fetch(`http://localhost:3001/api/v1/palettes/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(paletteData)
			});
			const newPalette = await res.json();
			this.setState({ palettes: [ ...palettes, newPalette ] });
		} catch (err) {
			this.setState({ error: err.message });
		}
	};

	editPalette = async paletteData => {
		const { selectedPalette } = this.state;
		const palette = {
			name: selectedPalette.name,
			color_1: paletteData[0].hex,
			color_2: paletteData[1].hex,
			color_3: paletteData[2].hex,
			color_4: paletteData[3].hex,
			color_5: paletteData[4].hex
		};
		try {
			await fetch(`http://localhost:3001/api/v1/palettes/${selectedPalette.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(palette)
			});
		} catch (err) {
			this.setState({ error: err.message });
		}
		const palettesData = await this.fetchPalettes();
		this.setState({ palettes: palettesData, editInfo: { editing: false, displayEdit: false, hex: [] } });
	};

	removeEditState = () => {
		this.setState({ editInfo: { editing: false, displayEdit: false, hex: [] } });
	};

	removeDisplayEdit = hexCodes => {
		const editing = this.state.editInfo.editing;
		this.setState({ editInfo: { editing: editing, displayEdit: false, hex: hexCodes } });
	};

	addEditState = (hexCodes, id, name) => {
		this.setState({ selectedPalette: { id, name }, editInfo: { editing: true, displayEdit: true, hex: hexCodes } });
	};

	deletePalette = async id => {
		const { palettes } = this.state;
		try {
			await fetch(`http://localhost:3001/api/v1/palettes/${id}`, {
				method: 'DELETE'
			});
			this.setState({ palettes: palettes.filter(p => p.id !== id) });
		} catch (err) {
			this.setState({ error: err.message });
		}
	};

	render () {
		const { projects, palettes, selectedProject, editInfo } = this.state;
		const filteredPalettes = palettes.filter(palette => palette.project_id === parseInt(selectedProject));
		return (
			<div className="App">
				<h1>Hexbrush</h1>
				<ColorView
					editInfo={editInfo}
					removeEditState={this.removeEditState}
					projects={projects}
					addProject={this.addProject}
					addPalette={this.addPalette}
					removeDisplayEdit={this.removeDisplayEdit}
					editPalette={this.editPalette}
				/>
				<hr />
				<select
					className="App-project-select palette-view-select"
					value={selectedProject}
					onChange={e => this.setState({ selectedProject: e.target.value })}>
					<option value="0">--</option>
					{projects.map(p => (
						<option key={p.id} value={p.id}>
							{p.name}
						</option>
					))}
				</select>
				<PaletteView palettes={filteredPalettes} deletePalette={this.deletePalette} addEditState={this.addEditState} />
			</div>
		);
	}
}

export default App;
