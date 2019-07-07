import React from 'react';
import Palette from './Palette';
import { shallow } from 'enzyme';

const mockPalette = {
	color_1: '#899e01',
	color_2: '#ff21c3',
	color_3: '#88b712',
	color_4: '#f7c574',
	color_5: '#6520cc'
};

describe('Palette', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Palette {...mockPalette} />);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
