import React from 'react';
import PaletteColor from '../PaletteColor/PaletteColor';

const Palette = props => {
	return (
		<article className="Palette">
			<PaletteColor hexcode={props.color_1}/>
			<PaletteColor hexcode={props.color_2}/>
			<PaletteColor hexcode={props.color_3}/>
			<PaletteColor hexcode={props.color_4}/>
			<PaletteColor hexcode={props.color_5}/>
		</article>
	);
};

export default Palette;
