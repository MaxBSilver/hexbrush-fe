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
		let colors = this.state.colors;
		colors.forEach(color => {
			if (!color.isLocked) color.hex = randomColor();
			colorsArr.push(color);
		});
		this.setState({ colors: colorsArr });
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
		const { selectedProject } = this.state;
		if (selectedProject === 0) {
			this.addProject();
		} else {
			this.addPalette(selectedProject);
		}
	};

	addProject = async () => {
		const projectData = { name: this.state.projectName };
		try {
			const project = await fetch('http://localhost:3001/api/v1/projects', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(projectData)
			});
			this.addPalette(project.id);
		} catch (err) {
			this.setState({ error: err.message });
		}
	};

	addPalette = async projectId => {
		const { paletteName, colors } = this.state;
		const palette = {
			name: paletteName,
			project_id: projectId,
			color_1: colors[0].hex,
			color_2: colors[1].hex,
			color_3: colors[2].hex,
			color_4: colors[3].hex,
			color_5: colors[4].hex
		};
		try {
			await fetch(`http://localhost:3001/api/v1/palettes/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(palette)
			});
		} catch (err) {
			this.setState({ error: err.message });
		}
	};

	render() {
		const { selectedProject, projectName, paletteName } = this.state;
		return (
			<div className="ColorGenerator">
				<section>{this.createColors()}</section>
				<section>
					<button onClick={this.generateHex}>Generate new colors</button>
				</section>
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="paletteName"
						placeholder="Palette Name"
						value={paletteName}
						onChange={e => this.setState({ paletteName: e.target.value })}
					/>
					<select
						className="App-project-select"
						value={selectedProject}
						onChange={e => this.setState({ selectedProject: parseInt(e.target.value) })}
					>
						<option value="0">Create New Project</option>
						{this.props.projects.map(p => (
							<option key={p.id} value={p.id}>
								{p.name}
							</option>
						))}
					</select>
					{selectedProject === 0 && (
						<input
							type="text"
							name="name"
							placeholder="New Project Name"
							value={projectName}
							onChange={e => this.setState({ name: e.target.value })}
						/>
					)}
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default ColorGenerator;
