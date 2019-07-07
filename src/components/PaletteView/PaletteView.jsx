import React from 'react';
import Palette from '../Palette/Palette';

const PaletteView = props => {
	const { palettes, editPalette } = props;
	return <output className="PaletteView">{palettes.map(palette => <Palette key={palette.id} {...palette} editPalette={editPalette}/>)}</output>;
};

export default PaletteView;
