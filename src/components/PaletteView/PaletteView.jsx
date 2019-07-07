import React from 'react';
import Palette from '../Palette/Palette';

const PaletteView = props => {
	const { palettes, addEditState } = props;
	return <output className="PaletteView">{palettes.map(palette => <Palette key={palette.id} {...palette} addEditState={addEditState}/>)}</output>;
};

export default PaletteView;
