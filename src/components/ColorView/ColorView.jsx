import React, { Component } from 'react';
import ColorGenerator from '../ColorGenerator/ColorGenerator';

export class ColorView extends Component {
	render() {
		return (
			<div>
				<ColorGenerator
					editInfo={this.props.editInfo}
					projects={this.props.projects}
					addProject={this.props.addProject}
					addPalette={this.props.addPalette}
					removeEditState={this.props.removeEditState}
				/>
			</div>
		);
	}
}

export default ColorView;
