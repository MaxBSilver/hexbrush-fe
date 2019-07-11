 import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import { mockProjects, mockPalettes } from '../../util/mockData';

describe('App', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<App />);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	describe('componentDidMount', () => {
		it('should call fetchProjects and fetchPalettes', () => {
			jest.spyOn(wrapper.instance(), 'fetchProjects');
			jest.spyOn(wrapper.instance(), 'fetchPalettes');
			wrapper.instance().componentDidMount();
			setTimeout(() => {
				expect(wrapper.instance().fetchProjects).toHaveBeenCalled();
				expect(wrapper.instance().fetchPalettes).toHaveBeenCalled();
			}, 1000);
		});

		it('should set the state with the fetched data', () => {
			wrapper.instance().componentDidMount();
			setTimeout(() => {
				expect(wrapper.state('projects')).toEqual(mockProjects);
				expect(wrapper.state('palettes')).toEqual(mockPalettes);
			}, 500);
		});
	});

	describe('fetchProjects', () => {
		it('should return the projects', async () => {
			window.fetch = jest.fn().mockImplementation(() => {
				return Promise.resolve({
					ok: true,
					json: () => Promise.resolve(mockProjects)
				});
			});

			const result = await wrapper.instance().fetchProjects();
			expect(result).toEqual(mockProjects);
		});

		it('should save the error in state', async () => {
			window.fetch = jest.fn().mockImplementation(() => {
				return Promise.reject({
					message: 'No data found in "projects" database.'
				});
			});

			await wrapper.instance().fetchProjects();
			expect(wrapper.state('error')).toEqual('No data found in "projects" database.');
		});
	});

	describe('fetchPalettes', () => {
		it('should return the palettes', async () => {
			window.fetch = jest.fn().mockImplementation(() => {
				return Promise.resolve({
					ok: true,
					json: () => Promise.resolve(mockPalettes)
				});
			});

			const result = await wrapper.instance().fetchPalettes();
			expect(result).toEqual(mockPalettes);
		});

		it('should save the error in state', async () => {
			window.fetch = jest.fn().mockImplementation(() => {
				return Promise.reject({
					message: 'No data found in "palettes" database.'
				});
			});

			await wrapper.instance().fetchPalettes();
			expect(wrapper.state('error')).toEqual('No data found in "palettes" database.');
		});
	});

	describe('renameProject', () => {
		it('should call fetch with the correct params', async () => {
			window.fetch = jest.fn();
			const options = {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: 'My Project' })
			};
			await wrapper.instance().renameProject(1, 'My Project');
			expect(window.fetch).toHaveBeenCalledWith('http://localhost:3001/api/v1/projects/1', options);
		});

		it('should call fetchProjects', async () => {
			jest.spyOn(wrapper.instance(), 'fetchProjects');
			await wrapper.instance().renameProject(1, 'My Project');
			expect(wrapper.instance().fetchProjects).toHaveBeenCalled();
		});
	});

	describe('deleteProject', () => {
		it('should call fetch with the correct params', async () => {
			window.fetch = jest.fn();
			await wrapper.instance().deleteProject(1);
			expect(window.fetch).toHaveBeenCalledWith('http://localhost:3001/api/v1/projects/1', { method: 'DELETE' });
		});

		it('should call fetchProjects', async () => {
			jest.spyOn(wrapper.instance(), 'fetchProjects');
			await wrapper.instance().renameProject(1, 'My Project');
			expect(wrapper.instance().fetchProjects).toHaveBeenCalled();
		});

		it('should set the error in state', async () => {
			const message = 'Unable to delete project';
			window.fetch = jest.fn().mockImplementation(() => {
				return Promise.reject({ message });
			});

			await wrapper.instance().renameProject(999);
			expect(wrapper.state('error')).toBeDefined();
		});
	});

	describe('selectProject', () => {
		it('should set state with the selected project', () => {
			expect(wrapper.state('selectedProject')).toEqual(0);
			wrapper.instance().selectProject(4);
			expect(wrapper.state('selectedProject')).toEqual(4);
		});
	});

	describe('addProject', () => {
		const { color_1, color_2, color_3, color_4, color_5 } = mockPalettes[0];

		let mockColors;
		beforeEach(() => {
			mockColors = [color_1, color_2, color_3, color_4, color_5];
		});

		it('should call fetch with the correct params', async () => {
			window.fetch = jest.fn();
			await wrapper.instance().addProject('My Project', 'My Palette', mockColors);
			const options = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: 'My Project' })
			};
			expect(window.fetch).toHaveBeenCalledWith('http://localhost:3001/api/v1/projects', options);
		});

		it.skip('should set the returned object in state', async () => {
			wrapper.setState({ projects: [] });
			const newProject = mockProjects[0];
			window.fetch = jest.fn().mockImplementation(() => {
				return Promise.resolve({
					ok: true,
					json: () => newProject
				});
			});
			await wrapper.instance().addProject('My Project', 'My Palette', mockColors);
			expect(wrapper.state('projects')).toEqual([newProject]);
		});

		it.skip('should call addPalette', async () => {
			jest.spyOn(wrapper.instance(), 'addPalette');
			window.fetch = jest.fn().mockImplementation(() => {
				return Promise.resolve({
					ok: true,
					json: () => mockProjects[0]
				});
			});
			await wrapper.instance().addProject('My Project', 'My Palette', mockColors);
			expect(wrapper.instance().addPalette).toHaveBeenCalledWith(1, 'My Palette', mockColors);
		});

		it('should set the error in state', async () => {
			window.fetch = jest.fn().mockImplementation(() => {
				return Promise.reject({ message: 'new error' });
			});
			await wrapper.instance().addProject('My Project', 'My Palette', mockColors);
			expect(wrapper.state('error')).toBeDefined();
		});
	});

	describe('addPalette', () => {
		const { color_1, color_2, color_3, color_4, color_5 } = mockPalettes[0];

		let mockColors;
		beforeEach(() => {
			mockColors = [{ hex: color_1 }, { hex: color_2 }, { hex: color_3 }, { hex: color_4 }, { hex: color_5 }];
		});

		it('should call fetch with the correct params', async () => {
			window.fetch = jest.fn();
			const paletteData = { name: 'My Palette', project_id: 1, color_1, color_2, color_3, color_4, color_5 };
			const options = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(paletteData)
			};

			await wrapper.instance().addPalette(1, 'My Palette', mockColors);
			expect(window.fetch).toHaveBeenCalledWith('http://localhost:3001/api/v1/palettes', options);
		});

		it.skip('should set the returned object in state', async () => {
			const newPalette = mockPalettes[0];
			window.fetch = jest.fn().mockImplementation(() => {
				return Promise.resolve({
					ok: true,
					json: () => newPalette
				});
			});
			await wrapper.instance().addPalette(1, 'My Palette', mockColors);
			expect(wrapper.state('palettes')).toEqual([newPalette]);
		});

		it('should set the error in state', async () => {
			window.fetch = jest.fn().mockImplementation(() => {
				return Promise.reject({ message: 'new error' });
			});
			await wrapper.instance().addPalette('My Project', 'My Palette', mockColors);
			expect(wrapper.state('error')).toBeDefined();
		});
	});

	describe('editPalette', () => {
		const { color_1, color_2, color_3, color_4, color_5 } = mockPalettes[0];

		let mockColors;
		beforeEach(() => {
			mockColors = [{ hex: color_1 }, { hex: color_2 }, { hex: color_3 }, { hex: color_4 }, { hex: color_5 }];
			window.fetch = jest.fn().mockImplementation(() => {
				return Promise.resolve({});
			});
		});

		it('should call fetch with the correct params', async () => {
			const paletteData = { name: 'My Updated Palette', color_1, color_2, color_3, color_4, color_5 };
			const options = {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(paletteData)
			};

			await wrapper.instance().editPalette(mockColors, 1, 'My Updated Palette');
			expect(window.fetch).toHaveBeenCalledWith('http://localhost:3001/api/v1/palettes/1', options);
		});

		it('should call fetchPalettes', async () => {
			jest.spyOn(wrapper.instance(), 'fetchPalettes');

			await wrapper.instance().editPalette(mockColors, 1, 'My Updated Palette');
			expect(wrapper.instance().fetchPalettes).toHaveBeenCalled();
		});

		it.skip('should reset state', async () => {
			wrapper.setState({ palettes: [], editInfo: { editing: true, displayEdit: true, hex: mockColors } });
			await wrapper.instance().editPalette(mockColors, 1, 'My Updated Palette');
			expect(wrapper.state('editInfo')).toEqual({ editing: false, displayEdit: false, hex: [] });
		});

		it('should set the error in state', async () => {
			window.fetch = jest.fn().mockImplementation(() => {
				return Promise.reject({ message: 'new error' });
			});
			await wrapper.instance().addPalette(mockColors, 1, 'My Updated Palette');
			expect(wrapper.state('error')).toBeDefined();
		});
	});

	describe('removeEditState', () => {
		it('should set displayEdit state to false', () => {
			wrapper.setState({ editInfo: { editing: true, displayEdit: true } });
			wrapper.instance().removeEditState();
			setTimeout(() => {
				expect(wrapper.state('editInfo')).toEqual({ editing: true, displayEdit: false, hex: [] });
			});
		});
	});

	describe('removeDisplayEdit', () => {
		const { color_1, color_2, color_3, color_4, color_5 } = mockPalettes[0];

		let mockColors;
		beforeEach(() => {
			mockColors = [color_1, color_2, color_3, color_4, color_5];
		});

		it('should set displayEdit state to false', () => {
			wrapper.setState({ editInfo: { editing: true, displayEdit: true } });
			wrapper.instance().removeDisplayEdit(mockColors);
			setTimeout(() => {
				expect(wrapper.state('editInfo')).toEqual({ editing: true, displayEdit: false, hex: mockColors });
			});
		});
	});

	describe('addEditState', () => {
		const { color_1, color_2, color_3, color_4, color_5 } = mockPalettes[0];

		let mockColors;
		beforeEach(() => {
			mockColors = [color_1, color_2, color_3, color_4, color_5];
		});

		it('should set the state', () => {
			wrapper.setState({
				selectedPalette: { id: 0, name: 'unnamed' },
				editInfo: { editing: false, displayEdit: false, hex: [] }
			});

			wrapper.instance().addEditState(mockColors, 1, 'New Title');
			setTimeout(() => {
				expect(wrapper.state('selectedPalette')).toEqual({ id: 1, name: 'New Title' });
				expect(wrapper.state('editInfo')).toEqual({ editing: true, displayEdit: true, hex: mockColors });
			});
		});
	});

	describe('deletePalette', () => {
		beforeEach(() => {
			window.fetch = jest.fn();
		});

		it('should call fetch with the correct params', async () => {
			await wrapper.instance().deletePalette(2);
			expect(window.fetch).toHaveBeenCalledWith('http://localhost:3001/api/v1/palettes/2', { method: 'DELETE' });
		});

		it('should remove the project from state', async () => {
			wrapper.setState({ palettes: mockPalettes });
			await wrapper.instance().deletePalette(2);
			expect(wrapper.state('palettes')).not.toBe(expect.arrayContaining(mockPalettes[1]));
		});
	});
});
