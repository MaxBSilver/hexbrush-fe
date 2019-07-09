import React, { Component } from 'react';
import Palette from '../Palette/Palette';

class PaletteView extends Component {
	state = {
		projectName: '',
	};

	render() {
		const { palettes, addEditState, deletePalette, selectedProject, projects } = this.props;
		return (
			<React.Fragment>
				<form>
				<select
					className="App-project-select palette-view-select"
					value={selectedProject}
					onChange={e => this.props.selectProject(e.target.value)}
				>
					<option value="0">--</option>
					{projects.map(p => (
						<option key={p.id} value={p.id}>
							{p.name}
						</option>
					))}
				</select>
					<input
						type="text"
						value={this.state.projectName}
						onChange={e => this.setState({ paletteName: e.target.value })}
					/>
					<button id="PaletteView-edit-project-btn">Edit Project Name</button>
					<button id="PaletteView-delete-project-btn">Delete Project</button>
				</form>
				<output className="PaletteView">
					{palettes.map(palette => (
						<Palette key={palette.id} deletePalette={deletePalette} addEditState={addEditState} {...palette} />
					))}
				</output>
			</React.Fragment>
		);
	}
}

export default PaletteView;
