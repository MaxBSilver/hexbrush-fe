import React, { Component } from 'react';
import ColorGenerator from '../ColorGenerator/ColorGenerator';

export class ColorView extends Component {
	render () {
		return (
			<div>
				<ColorGenerator
					editInfo={this.props.editInfo}
					projects={this.props.projects}
					addProject={this.props.addProject}
					addPalette={this.props.addPalette}
					removeEditState={this.props.removeEditState}
					removeDisplayEdit={this.props.removeDisplayEdit}
					editPalette={this.props.editPalette}
					selectProject={this.props.selectProject}
					selectedPalette={this.props.selectedPalette}
					existingProject={this.props.existingProject}
				/>
			</div>
		);
	}
}

export default ColorView;
