import React from 'react';

const Palette = props => {
	const { hexCode } = props;
	return (
		<article className="Palette">
			<div className="Palette-color">
				<p>{hexCode}</p>
			</div>
			<div className="Palette-color">
				<p>{hexCode}</p>
			</div>
			<div className="Palette-color">
				<p>{hexCode}</p>
			</div>
			<div className="Palette-color">
				<p>{hexCode}</p>
			</div>
			<div className="Palette-color">
				<p>{hexCode}</p>
			</div>
			<div className="Palette-color">
				<p>{hexCode}</p>
			</div>
		</article>
	);
};

export default Palette;
