import React from 'react';
import Palette from './Palette';
import { shallow } from 'enzyme';

const mockPalette = {
	id: 99,
	project_id: 3,
	name: 'My Palette',
	color_1: '#899e01',
	color_2: '#ff21c3',
	color_3: '#88b712',
	color_4: '#f7c574',
	color_5: '#6520cc'
};

describe('Palette', () => {
	let wrapper, mockAddEditState, mockDeletePalette;
	beforeEach(() => {
		mockAddEditState = jest.fn();
		mockDeletePalette = jest.fn();
		wrapper = shallow(<Palette {...mockPalette} addEditState={mockAddEditState} deletePalette={mockDeletePalette} />);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should call addEditState on edit button click with hexcodes', () => {
		const { color_1, color_2, color_3, color_4, color_5 } = mockPalette;
		const mockHexCodes = [color_1, color_2, color_3, color_4, color_5];
		wrapper.find('.edit-btn').simulate('click');
		expect(mockAddEditState).toHaveBeenCalledWith(mockHexCodes, 99, 'My Palette');
	});

	it('should call deletePalette on delete click with id', () => {
		wrapper.find('.delete-btn').simulate('click');
		expect(mockDeletePalette).toHaveBeenCalledWith(mockPalette.id);
	});
});
