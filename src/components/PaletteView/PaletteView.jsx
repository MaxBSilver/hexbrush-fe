import React from 'react';
import Palette from '../Palette/Palette';

const PaletteView = props => {
	const { palettes } = props;
	return <output class="PaletteView">{palettes.map(palette => <Palette key={palette.id} {...palette} />)}</output>;
};

export default PaletteView;
