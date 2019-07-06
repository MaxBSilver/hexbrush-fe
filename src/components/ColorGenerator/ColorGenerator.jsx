import React, { Component } from 'react';
import randomColor from 'randomcolor';
import Color from '../Color/Color';
export class ColorGenerator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			name: '',
			colors: [
				{ isLocked: false, id: 1, hex: '#ffffff' },
				{ isLocked: false, id: 2, hex: '#ffffff' },
				{ isLocked: false, id: 3, hex: '#ffffff' },
				{ isLocked: true, id: 4, hex: '#ffffff' },
				{ isLocked: false, id: 5, hex: '#ffffff' }
			],
			selectedProject: 0
		};
	}
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
    const {selectedProject, name, colors} = this.state;
    if(selectedProject === 0) {
      this.createNewProject()
    } else {
      this.updateProject()
    }
	};

	render() {
		return (
			<div className="ColorGenerator">
				<section>{this.createColors()}</section>
				<section>
					<button onClick={this.generateHex}>Generate new colors</button>
				</section>
				<form onSubmit={this.handleSubmit}>
					<select
						className="App-project-select"
						value={this.state.selectedProject}
						onChange={e => this.setState({ selectedProject: parseInt(e.target.value) })}
					>
						<option value="0">Create New Project</option>
						{this.props.projects.map(p => (
							<option key={p.id} value={p.id}>
								{p.name}
							</option>
						))}
					</select>
					{this.state.selectedProject === 0 && (
						<input
							type="text"
              name="name"
              placeholder="New Project Name"
							value={this.state.name}
							onChange={e => this.setState({ name: e.target.value })}
						/>
					)}
				</form>
			</div>
		);
	}
}

export default ColorGenerator;
