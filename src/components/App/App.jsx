import React, { Component } from 'react';
import PaletteView from '../PaletteView/PaletteView';
import ColorView from '../ColorView/ColorView';

const url = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class App extends Component {
	state = {
		loading: false,
		projects: [],
		palettes: [],
		selectedProject: 0,
		editInfo: { editing: false, displayEdit: false, hex: [] },
		error: '',
		selectedPalette: {}
	};

	componentDidMount () {
		this.setState({ loading: true }, async () => {
			let projects = await this.fetchProjects();
			let palettes = await this.fetchPalettes();
			this.setState({ loading: false, projects, palettes });
		});
	}

	fetchProjects = async () => {
		try {
			const res = await fetch(`${url}/api/v1/projects`);
			return await res.json();
		} catch (err) {
			this.setState({ error: err.message });
		}
	};

	fetchPalettes = async () => {
		try {
			const res = await fetch(`${url}/api/v1/palettes`);
			return await res.json();
		} catch (err) {
			this.setState({ error: err.message });
		}
	};

	renameProject = async (id, name) => {
		try {
			await fetch(`http://localhost:3001/api/v1/projects/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name })
			});
			const projects = await this.fetchProjects();
			this.setState({ projects });
		} catch (err) {
			this.setState({ error: err.message });
		}
	};

	deleteProject = async id => {
		try {
			await fetch(`http://localhost:3001/api/v1/projects/${id}`, {
				method: 'DELETE'
			});
			const projects = await this.fetchProjects();
			this.setState({ projects, selectedProject: 0 });
		} catch (err) {
			this.setState({ error: err.message });
		}
	};

	selectProject = projectNum => {
		this.setState({ selectedProject: projectNum });
	};

	addProject = async (projectName, paletteName, colors) => {
		const { projects } = this.state;
		const projectNames = projects.map(project => project.name);
		if (!projectNames.includes(projectName)) {
			try {
				const res = await fetch(`${url}/api/v1/projects`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ name: projectName })
				});
				const newProject = await res.json();
				this.setState({ projects: [ ...projects, newProject ] }, () => {
					this.addPalette(newProject.id, paletteName, colors);
				});
				let projects = await this.fetchProjects();
				this.setState({ projects });
			} catch (err) {
				this.setState({ error: err.message });
			}
		} else {
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
			const res = await fetch(`${url}/api/v1/palettes`, {
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

	editPalette = async (colors, id, name) => {
		const { selectedPalette } = this.state;
		const palette = {
			name: name || selectedPalette.name,
			color_1: colors[0].hex,
			color_2: colors[1].hex,
			color_3: colors[2].hex,
			color_4: colors[3].hex,
			color_5: colors[4].hex
		};
		try {
			await fetch(`${url}/api/v1/palettes/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(palette)
			});
			const palettes = await this.fetchPalettes();
			this.setState({ palettes, editInfo: { editing: false, displayEdit: false, hex: [] } });
		} catch (err) {
			this.setState({ error: err.message });
		}
	};

	removeEditState = () => {
		this.setState({ editInfo: { editing: false, displayEdit: false, hex: [] } });
	};

	removeDisplayEdit = hexCodes => {
		const editing = this.state.editInfo.editing;
		this.setState({ editInfo: { editing, displayEdit: false, hex: hexCodes } });
	};

	addEditState = (hexCodes, id, name) => {
		this.setState({ selectedPalette: { id, name }, editInfo: { editing: true, displayEdit: true, hex: hexCodes } });
	};

	deletePalette = async id => {
		const { palettes } = this.state;
		try {
			await fetch(`${url}/api/v1/palettes/${id}`, {
				method: 'DELETE'
			});
			this.setState({ palettes: palettes.filter(p => p.id !== id) });
		} catch (err) {
			this.setState({ error: err.message });
		}
	};
	render () {
		const { projects, palettes, selectedProject, editInfo, selectedPalette } = this.state;
		const filteredPalettes = palettes.filter(palette => palette.project_id === parseInt(selectedProject));
		return (
			<div className="App">
				<h1>
					<img src="https://i.imgur.com/f6WRRJm.png" alt="logo" />Hexbrush.io
				</h1>
				<ColorView
					editInfo={editInfo}
					removeEditState={this.removeEditState}
					projects={projects}
					addProject={this.addProject}
					addPalette={this.addPalette}
					removeDisplayEdit={this.removeDisplayEdit}
					editPalette={this.editPalette}
					selectProject={this.selectProject}
					selectedPalette={selectedPalette}
				/>
				<hr />

				<PaletteView
					projects={projects}
					selectedProject={selectedProject}
					palettes={filteredPalettes}
					deletePalette={this.deletePalette}
					addEditState={this.addEditState}
					selectProject={this.selectProject}
					renameProject={this.renameProject}
					deleteProject={this.deleteProject}
				/>
			</div>
		);
	}
}

export default App;
