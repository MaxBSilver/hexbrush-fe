import React from 'react';
// import './_PaletteColor.scss';

const PaletteColor = props => {
	return (
		<div className="PaletteColor">
			<svg className="PaletteColor-teardrop" width="50px" viewBox="0 0 30 42">
				<path
					fill={props.hexcode}
					stroke={props.hexcode}
					strokeWidth=".1"
					d="M15 3
              Q16.5 6.8 25 18
              A12.8 12.8 0 1 1 5 18
              Q13.5 6.8 15 3z"
				/>
			</svg>
			<p className="PaletteColor-hexcode">{props.hexcode.toUpperCase()}</p>
		</div>
	);
};

export default PaletteColor;
