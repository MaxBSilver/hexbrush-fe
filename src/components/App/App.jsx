import React, { Component } from 'react';

class App extends Component {
	state = {
		loading: false,
		projects: [],
		palettes: []
	};

	componentDidMount() {
		this.setState({ loading: true }, async () => {
			const projectsRes = await fetch('http://localhost:3001/api/v1/projects');
			const palettesRes = await fetch('http://localhost:3001/api/v1/palettes');
			const projects = await projectsRes.json();
			const palettes = await palettesRes.json();
			this.setState({ loading: false, projects, palettes });
		});
	}

	render() {
		return <div />;
	}
}

export default App;
