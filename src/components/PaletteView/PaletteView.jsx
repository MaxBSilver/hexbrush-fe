import React from 'react';
import Palette from '../Palette/Palette';

const PaletteView = props => {
const { palettes, addEditState, deletePalette} = props;
	return (
		<output className="PaletteView">
			{palettes.map(palette => <Palette key={palette.id} deletePalette={deletePalette}  addEditState={addEditState} {...palette} />)}
		</output>
	);
};

export default PaletteView;
