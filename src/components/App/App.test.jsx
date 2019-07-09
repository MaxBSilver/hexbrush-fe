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
			expect(wrapper.instance().fetchProjects).toHaveBeenCalled();
			expect(wrapper.instance().fetchPalettes).toHaveBeenCalled();
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
				return Promise.resolve({
					ok: false
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
					ok: false
				});
			});

			await wrapper.instance().fetchPalettes();
			expect(wrapper.state('error')).toEqual('No data found in "palettes" database.');
		});
	});
});
