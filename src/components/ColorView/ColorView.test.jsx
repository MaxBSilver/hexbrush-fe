import React from 'react';
import ColorView from './ColorView';
import { shallow } from 'enzyme';
import { mockProjects } from '../../util/mockData';

describe('ColorView', () => {
	let wrapper, mockRemoveEditState, mockAddProject, mockAddPalette;
	const hexcodes = ['#4712E5', '#57D6A3', '#460DA8', '#08E0C3', '#43369B'];

	beforeEach(() => {
		mockAddPalette = jest.fn();
		mockAddProject = jest.fn();
		mockRemoveEditState = jest.fn();

		wrapper = shallow(
			<ColorView
				projects={mockProjects}
				hexcodes={hexcodes}
				addProject={mockAddProject}
				addPalette={mockAddPalette}
				removeEditState={mockRemoveEditState}
			/>
		);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
