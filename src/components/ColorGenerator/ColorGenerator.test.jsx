import React from 'react';
import ColorGenerator from './ColorGenerator';
import { shallow } from 'enzyme';
import { mockProjects, mockPalettes } from '../../util/mockData';

const { color_1, color_2, color_3, color_4, color_5 } = mockPalettes[0];
const mockHexCodes = [color_1, color_2, color_3, color_4, color_5];

describe('ColorGenerator', () => {
	let wrapper, mockAddPalette, mockAddProject, mockRemoveEditState;

	beforeEach(() => {
		mockAddPalette = jest.fn();
		mockAddProject = jest.fn();
		mockRemoveEditState = jest.fn();
		wrapper = shallow(
			<ColorGenerator
				projects={mockProjects}
				hexCodes={mockHexCodes}
				addProject={mockAddProject}
				addPalette={mockAddPalette}
				removeEditState={mockRemoveEditState}
			/>
		);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	describe('componentDidMount', () => {
		it('should call generateHex and createColors on mount', () => {
			jest.spyOn(wrapper.instance(), 'generateHex');
			jest.spyOn(wrapper.instance(), 'createColors');

			wrapper.instance().componentDidMount();
			expect(wrapper.instance().generateHex).toHaveBeenCalledTimes(1);
			expect(wrapper.instance().createColors).toHaveBeenCalledTimes(1);
		});
	});

	describe('generateHex', () => {
		it('should call removeEditState', () => {
			wrapper.instance().generateHex();
      expect(mockRemoveEditState).toHaveBeenCalled();
		});

		it('should set state with an array of colors', () => {
			const initialState = wrapper.state('colors');
			setTimeout(() => {
				wrapper.instance().generateHex();
			  }, 500);
			expect(wrapper.state('colors')).not.toEqual(initialState);
		});
	});
});
