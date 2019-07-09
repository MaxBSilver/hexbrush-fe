import React from 'react';
import PaletteColor from './PaletteColor';
import { shallow } from 'enzyme';

describe('PaletteColor', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<PaletteColor hexcode="#fa97d3" />);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
