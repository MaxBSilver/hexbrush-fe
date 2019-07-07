import React, { Component } from 'react';
import ColorGenerator from '../ColorGenerator/ColorGenerator';

export class ColorView extends Component {
	render () {
		return (
			<div>
				<ColorGenerator
					hexCodes={this.props.hexCodes}
					projects={this.props.projects}
					addProject={this.props.addProject}
					addPalette={this.props.addPalette}
					removeEditState={this.props.removeEditState}
					editPalette={this.props.editPalette}
					palettes={this.props.palettes}
					selectedProject={this.props.selectedProject}
				/>
			</div>
		);
	}
}

export default ColorView;
