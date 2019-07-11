import React, { Component } from 'react';
import Palette from '../Palette/Palette';

class PaletteView extends Component {
	state = {
		projectName: ''
	};

	renameProject = () => {
			this.props.renameProject(this.props.selectedProject, this.state.projectName);
			this.setState({ projectName: '' });
	};

	render () {
		const { palettes, addEditState, deletePalette, selectedProject, projects, deleteProject } = this.props;
		return (
			<React.Fragment>
				<section className="PaletteView-edit-form">
					<select
						className="App-project-select palette-view-select PaletteView-button"
						value={selectedProject}
						onChange={e => this.props.selectProject(parseInt(e.target.value))}>
						<option value="0">--</option>
						{projects.map(p => (
							<option key={p.id} value={p.id}>
								{p.name}
							</option>
						))}
					</select>
					{selectedProject !== 0 && (
						<React.Fragment>
							<input
							className="PaletteView-button PaletteView-edit-input"
								type="text"
								placeholder="Enter new project name"
								id="edit-project-input"
								value={this.state.projectName}
								onChange={e => this.setState({ projectName: e.target.value })}
							/>
							<button id="PaletteView-edit-project-btn" className="PaletteView-button PaletteView-edit-btn" onClick={this.renameProject}>
								Edit Project Name
							</button>

							<button id="PaletteView-delete-project-btn" className="PaletteView-button PaletteView-edit-btn PaletteView-delete-btn" onClick={() => deleteProject(selectedProject)}>Delete Project</button>
						</React.Fragment>
					)}
				</section>
				<output className="PaletteView">
					{palettes.sort((a,b) =>a.name < b.name).map(palette => (
						<Palette key={palette.id} deletePalette={deletePalette} addEditState={addEditState} {...palette} />
					))}
				</output>
			</React.Fragment>
		);
	}
}

export default PaletteView;
