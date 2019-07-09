import React from 'react';
import Palette from '../Palette/Palette';

const PaletteView = props => {
	const { palettes, addEditState, deletePalette, selectedProject, projects } = props;
	console.log(palettes)
	console.log(palettes.sort((a,b) =>  b.id - a.id))
	return (
		<React.Fragment>
			<select
				className="App-project-select palette-view-select"
				value={selectedProject}
				onChange={e => props.selectProject(e.target.value)}>
				<option value="0">--</option>
				{projects.map(p => (
					<option key={p.id} value={p.id}>
						{p.name}
					</option>
				))}
			</select>
			<output className="PaletteView">
				{palettes.sort((a,b) =>  b.id - a.id).map(palette => (
					<Palette key={palette.id} deletePalette={deletePalette} addEditState={addEditState} {...palette} />
				))}
			</output>
		</React.Fragment>
	);
};

export default PaletteView;
