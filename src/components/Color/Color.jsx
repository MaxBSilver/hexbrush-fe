import React from 'react';

const Color = props => {
	const { isLocked, hex, id, lockColor } = props;
	return (
		<section className="Color" style={{ backgroundColor: hex }}>
			<p className="Color-hex">{hex.toUpperCase()}</p>
			<i role="button" className="Color-lock-icon material-icons" onClick={() => lockColor(id)}>
				{isLocked ? 'lock' : 'lock_open'}
			</i>
		</section>
	);
};

export default Color;
