import React, { Component } from 'react';

class Color extends Component {
	state = {
		hex: '#FFFFFF',
		locked: false
	};

	render() {
		const { locked, hex } = this.state;
		return (
			<section className="Color">
				<p className="Color-hex">{hex}</p>
				<i className="Color-lock-icon material-icons" onClick={this.setState({ locked: !locked })}>
					{locked ? 'lock' : 'lock_open'}
				</i>
			</section>
		);
	}
}

export default Color;
