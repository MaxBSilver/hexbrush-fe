import React from 'react';
import PaletteColor from '../PaletteColor/PaletteColor';

const Palette = props => {
	return (
		<article className="Palette">
			<div className="Palette-header">
				<h3 className="Palette-title">{props.name || 'Untitled Palette'}</h3>
			</div>
			<div className="Palette-teardrop-container">
				<PaletteColor hexcode={props.color_1} />
				<PaletteColor hexcode={props.color_2} />
				<PaletteColor hexcode={props.color_3} />
				<PaletteColor hexcode={props.color_4} />
				<PaletteColor hexcode={props.color_5} />
			</div>
			<div className="Palette-button-container">
				<i className="material-icons Palette-button" role="button">
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
