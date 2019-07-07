import React, { Component } from 'react';
import ColorGenerator from '../ColorGenerator/ColorGenerator';

export class ColorView extends Component {
	render() {
		return (
			<div>
				<ColorGenerator
					projects={this.props.projects}
					addProject={this.props.addProject}
					addPalette={this.props.addPalette}
				/>
			</div>
		);
	}
}

export default ColorView;
