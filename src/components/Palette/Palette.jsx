import React from 'react';

const Palette = props => {
	return (
		<article className="Palette">
			<div className="Palette-color" style={backgroundColor(props.color_1)}>
				<p>{props.color_1}</p>
			</div>
			<div className="Palette-color" style={backgroundColor(props.color_2)}>
				<p>{props.color_2}</p>
			</div>
			<div className="Palette-color" style={backgroundColor(props.color_3)}>
				<p>{props.color_3}</p>
			</div>
			<div className="Palette-color" style={backgroundColor(props.color_4)}>
				<p>{props.color_4}</p>
			</div>
			<div className="Palette-color" style={backgroundColor(props.color_5)}>
				<p>{props.color_5}</p>
			</div>
		</article>
	);
};

const backgroundColor = color => {
	return {
		backgroundColor: color
	};
};

export default Palette;
