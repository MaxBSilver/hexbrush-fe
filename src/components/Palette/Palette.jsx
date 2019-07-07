import React from 'react';
import PaletteColor from '../PaletteColor/PaletteColor';

const Palette = props => {
	const { color_1, color_2, color_3, color_4, color_5 } = props;
	const hexCodes = [ color_1, color_2, color_3, color_4, color_5 ];
	return (
		<article className="Palette">
			<div className="Palette-header">
				<h3 className="Palette-title">{props.name || 'Untitled Palette'}</h3>
			</div>

			<div className="Palette-teardrop-container">
				<PaletteColor hexcode={color_1} />
				<PaletteColor hexcode={color_2} />
				<PaletteColor hexcode={color_3} />
				<PaletteColor hexcode={color_4} />
				<PaletteColor hexcode={color_5} />
			</div>
			<div className="Palette-button-container">
				<i className="material-icons Palette-button" role="button" onClick={() => props.addEditState(hexCodes)}>
					edit
				</i>
				<i className="material-icons Palette-button" role="button" onClick={() => props.deletePalette(props.id)}>
					delete
				</i>
			</div>
		</article>
	);
};

export default Palette;
