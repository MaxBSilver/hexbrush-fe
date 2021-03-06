import React, { Component } from 'react';
import randomColor from 'randomcolor';
import Color from '../Color/Color';

export class ColorGenerator extends Component {
	state = {
		loading: true,
		projectName: '',
		paletteName: '',
		editedName: '',
		colors: [
			{ isLocked: false, id: 1, hex: '' },
			{ isLocked: false, id: 2, hex: '' },
			{ isLocked: false, id: 3, hex: '' },
			{ isLocked: false, id: 4, hex: '' },
			{ isLocked: false, id: 5, hex: '' }
		],
		selectedProject: 0
	};

	componentDidMount() {
		this.generateHex();
		this.createColors();
	}

	generateHex = () => {
		let colorsArr = [];
		this.props.removeDisplayEdit();
		let colors = this.state.colors;
		colors.forEach(color => {
			if (!color.isLocked) color.hex = randomColor();
			colorsArr.push(color);
		});
		this.setState({ colors: colorsArr });
	};

	displayEditColors = () => {
		let colorsArr = [];
		if (!this.props.editInfo.displayEdit) this.setState({ colors: colorsArr });
	};

	createColors = () => {
		const { colors } = this.state;
		const colorArr = colors.map(color => {
			return (
				<Color isLocked={color.isLocked} key={color.id} id={color.id} hex={color.hex} lockColor={this.lockColor} />
			);
		});
		return colorArr;
	};

	createEditColors = () => {
		const { hex } = this.props.editInfo;
		const { colors } = this.state;
		colors.forEach((color, index) => {
			color.hex = hex[index];
			color.isLocked = false;
		});
		const colorArr = colors.map((color, index) => {
			return (
				<Color isLocked={color.isLocked} key={color.id} id={color.id} hex={color.hex} lockColor={this.lockColor} />
			);
		});
		return colorArr;
	};

	determineColors = () => {
		if (!this.props.editInfo.displayEdit) {
			return this.createColors();
		} else {
			return this.createEditColors();
		}
	};

	lockColor = id => {
		this.props.removeDisplayEdit();
		const colors = this.state.colors.map(color => {
			if (color.id === id) {
				color.isLocked = !color.isLocked;
			}
			return color;
		});
		this.setState({ colors });
	};

	selectProject = e => {
		this.props.selectProject(e.target.value);
		this.setState({ selectedProject: parseInt(e.target.value) });
	};

	handleSubmit = e => {
		e.preventDefault();
		const { selectedProject, projectName, paletteName, colors } = this.state;
		if (selectedProject === 0) {
			this.props.addProject(projectName, paletteName, colors);
		} else {
			this.props.addPalette(selectedProject, paletteName, colors);
		}
	};

	editPalette = e => {
		if (e.target.id === 'save-btn') {
			this.props.editPalette(this.state.colors, this.props.selectedPalette.id, this.state.editedName);
			this.setState({ editedName: '' });
		} else {
			this.props.editPalette(this.state.colors);
		}
	};

	render() {
		const { selectedProject, projectName, paletteName } = this.state;
		const { existingProject } = this.props;
		return (
			<div className="ColorGenerator">
				<section className="ColorGenerator-colors">
					{this.determineColors()}
					<button className="ColorGenerator-button" onClick={this.generateHex}>
						Generate New Colors
					</button>
					{this.props.editInfo.editing && (
						<React.Fragment>
							<input
								className="ColorGenerator-button"
								value={this.state.editedName}
								placeholder="Edit Palette Name"
								onChange={e => this.setState({ editedName: e.target.value })}
							/>
							<button id="save-btn" className="ColorGenerator-button" onClick={this.editPalette}>
								Save
							</button>
							<button id="cancel-btn" className="ColorGenerator-button" onClick={() => this.props.removeEditState()}>
								Cancel
							</button>
						</React.Fragment>
					)}
				</section>
				<form className="ColorGenerator-form" onSubmit={this.handleSubmit}>
					<div className="ColorGenerator-form-container">
						<label htmlFor="project-selector">Select a Project:</label>
						<select
							className="App-project-select"
							id="project-selector"
							value={selectedProject}
							onChange={e => this.selectProject(e)}
						>
							<option value="0">-- Create New Project --</option>
							{this.props.projects.map(p => (
								<option key={p.id} value={p.id}>
									{p.name}
								</option>
							))}
						</select>
						{selectedProject === 0 && (
							<div className="ColorGenerator-form-container">
								<label htmlFor="new-project-name">New Project Name</label>
								<input
									className="ColorGenerator-form-input"
									id="new-project-name"
									type="text"
									name="name"
									placeholder="Untitled Project"
									value={projectName}
									onChange={e => this.setState({ projectName: e.target.value })}
								/>
							</div>
						)}
					</div>
					<div className="ColorGenerator-form-container">
						<label htmlFor="palette-name">Palette Name</label>
						<input
							className="ColorGenerator-form-input"
							type="text"
							id="palette-name"
							name="paletteName"
							placeholder="Untitled Palette"
							value={paletteName}
							onChange={e => this.setState({ paletteName: e.target.value })}
						/>
					</div>

					<button className="ColorGenerator-form-input" type="submit">
						Create
					</button>
					{existingProject && <p className="error-message">A project with that name already exists. Please choose a new name.</p>}
				</form>
			</div>
		);
	}
}

export default ColorGenerator;
