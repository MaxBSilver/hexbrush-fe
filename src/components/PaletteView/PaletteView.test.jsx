import React from 'react';
import PaletteView from '../PaletteView/PaletteView';
import { shallow } from 'enzyme';

const mockPalettes = [{
	color_1: '#899e01',
	color_2: '#ff21c3',
	color_3: '#88b712',
	color_4: '#f7c574',
	color_5: '#6520cc'
}];

describe('PaletteView', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<PaletteView palettes={mockPalettes} />);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
