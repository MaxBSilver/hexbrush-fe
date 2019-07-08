import React from 'react';
import Color from './Color';
import { shallow } from 'enzyme';

describe('Color', () => {
	let wrapper, mockLockColor;
	beforeEach(() => {
		mockLockColor = jest.fn();
		wrapper = shallow(<Color isLocked={false} hex="#fa5b27" id={1} lockColor={mockLockColor} />);
	});

	it('should match the snapshot if unlocked', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should match the snapshot if locked', () => {
		const wrapper = shallow(<Color isLocked={true} hex="#fa5b27" id={1} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should call props.lockColor when the icon is clicked', () => {
		wrapper.find('.Color-lock-icon').simulate('click');
		expect(mockLockColor).toHaveBeenCalledWith(1);
	});
});
