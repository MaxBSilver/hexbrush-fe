import React, { Component } from 'react';
import randomColor from 'randomcolor';
import Color from '../Color/Color';

export class ColorGenerator extends Component {
	state = {
		loading: true,
		projectName: '',
		paletteName: '',
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
		this.props.removeEditState();
		let colors = this.state.colors;
		colors.forEach(color => {
			if (!color.isLocked) color.hex = randomColor();
			colorsArr.push(color);
		});
		this.setState({ colors: colorsArr });
	};

	displayEditColors = () => {
		let colorsArr = [];
		if (this.props.hexCodes !== []) this.setState({ colors: colorsArr });
	};

	createColors = () => {
		const { colors } = this.state;
		const colorArr = colors.map(color => {
			return (
				<Color
					isLocked={color.isLocked}
					key={color.id}
					id={color.id}
					hex={color.hex}
					hexCodes={this.props.hexCodes}
					lockColor={this.lockColor}
				/>
			);
		});
		return colorArr;
	};
	determineColors = () => {
		if (this.props.hexCodes.length === 0) {
			return this.createColors();
		} else {
			const { hexCodes } = this.props;
			const { colors } = this.state;
			const colorArr = colors.map((color, index) => {
				return (
					<Color
						isLocked={color.isLocked}
						key={color.id}
						id={color.id}
						hex={hexCodes[index]}
						lockColor={this.lockColor}
					/>
				);
			});
			return colorArr;
		}
	};

	lockColor = id => {
		const colors = this.state.colors.map(color => {
			if (color.id === id) {
				color.isLocked = !color.isLocked;
			}
			return color;
		});
		this.setState({ colors });
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

	render() {
		const { selectedProject, projectName, paletteName } = this.state;
		return (
			<div className="ColorGenerator">
				<section className="ColorGenerator-colors">
					{this.determineColors()}
					<button onClick={this.generateHex}>Generate New Colors</button>
				</section>
				<form className="ColorGenerator-form" onSubmit={this.handleSubmit}>
					<div className="ColorGenerator-form-container">
						<label htmlFor="palette-name">Palette Name</label>
						<input
							className="ColorGenerator-form-input"
							type="text"
							id="palette-name"
							name="paletteName"
							placeholder="Palette Name"
							value={paletteName}
							onChange={e => this.setState({ paletteName: e.target.value })}
						/>
					</div>
					<div className="ColorGenerator-form-container">
						<label htmlFor="project-selector">Select a Project:</label>
						<select
							className="App-project-select"
							id="project-selector"
							value={selectedProject}
							onChange={e => this.setState({ selectedProject: parseInt(e.target.value) })}
						>
							<option value="0">-- Create New Project --</option>
							{this.props.projects.map(p => (
								<option key={p.id} value={p.id}>
									{p.name}
								</option>
							))}
						</select>
					</div>
					{selectedProject === 0 && (
						<div className="ColorGenerator-form-container">
							<label htmlFor="new-project-name">Project Name</label>
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
					<input className="ColorGenerator-form-input" type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default ColorGenerator;
