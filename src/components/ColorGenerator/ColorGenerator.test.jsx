import React from 'react';
import ColorGenerator from './ColorGenerator';
import { shallow } from 'enzyme';
import { mockProjects, mockPalettes } from '../../util/mockData';

const { color_1, color_2, color_3, color_4, color_5 } = mockPalettes[0];
const mockHexCodes = [ color_1, color_2, color_3, color_4, color_5 ];
const mockEditInfo = { editing: false, displayEdit: false, hex: mockHexCodes };

describe('ColorGenerator', () => {
	let wrapper, mockAddPalette, mockAddProject, mockRemoveEditState, mockRemoveDisplayEdit;

	beforeEach(() => {
		mockAddPalette = jest.fn();
		mockAddProject = jest.fn();
		mockRemoveEditState = jest.fn();
		mockRemoveDisplayEdit = jest.fn();
		wrapper = shallow(
			<ColorGenerator
				projects={mockProjects}
				paletteName="max-palette"
				hexCodes={mockHexCodes}
				addProject={mockAddProject}
				addPalette={mockAddPalette}
				editInfo={mockEditInfo}
				removeEditState={mockRemoveEditState}
				removeDisplayEdit={mockRemoveDisplayEdit}
			/>
		);
	});
	afterEach(() => {
		mockAddPalette = jest.fn();
		mockAddProject = jest.fn();
		mockRemoveEditState = jest.fn();
		mockRemoveDisplayEdit = jest.fn();
		wrapper = shallow(
			<ColorGenerator
				projects={mockProjects}
				paletteName="max-palette"
				hexCodes={mockHexCodes}
				addProject={mockAddProject}
				addPalette={mockAddPalette}
				editInfo={mockEditInfo}
				removeEditState={mockRemoveEditState}
				removeDisplayEdit={mockRemoveDisplayEdit}
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
			expect(wrapper.instance().createColors).toHaveBeenCalledTimes(2);
		});
	});

	describe('generateHex', () => {
		it('should call removeEditState', () => {
			wrapper.instance().generateHex();
			expect(mockRemoveDisplayEdit).toHaveBeenCalled();
		});
		it('should add new colors to colorsArr if color is not locked', () => {
			const initialState = wrapper.state('colors');
			wrapper.instance().generateHex();
			setTimeout(() => {
				expect(wrapper.state('colors')).not.toEqual(initialState);
			}, 500);
		});
		it('should not add new colors to colorsArr if color is locked', () => {
			const mockLockHexCodes = [ { isLocked: true, id: 1, hex: '#kskfka' }, color_2, color_3, color_4, color_5 ];
			const mockLockEditInfo = { editing: false, displayEdit: false, hex: mockLockHexCodes };
			wrapper = shallow(
				<ColorGenerator
					projects={mockProjects}
					hexCodes={mockHexCodes}
					addProject={mockAddProject}
					addPalette={mockAddPalette}
					editInfo={mockLockEditInfo}
					removeEditState={mockRemoveEditState}
					removeDisplayEdit={mockRemoveDisplayEdit}
				/>
			);
			const initialState = wrapper.state('colors');
			wrapper.instance().generateHex();
			setTimeout(() => {
				expect(wrapper.state('colors')).not.toEqual(initialState);
			}, 500);
		});

		it('should set state with an array of colors', () => {
			const initialState = wrapper.state('colors');
			setTimeout(() => {
				wrapper.instance().generateHex();
				expect(wrapper.state('colors')).not.toEqual(initialState);
			}, 500);
		});
	});
	describe('displayEditColors', () => {
		it('should call set state if editInfo.displayEdit is false', () => {
			wrapper.instance().displayEditColors();
			expect(wrapper.state('colors')).toEqual([]);
		});

		it('should set state to an empty array if editinfo.displayEdit is true', () => {
			const mockTrueEditInfo = { editing: true, displayEdit: true, hex: mockHexCodes };
			const initialState = wrapper.state('colors');
			wrapper = shallow(
				<ColorGenerator
					projects={mockProjects}
					hexCodes={mockHexCodes}
					addProject={mockAddProject}
					addPalette={mockAddPalette}
					editInfo={mockTrueEditInfo}
					removeEditState={mockRemoveEditState}
					removeDisplayEdit={mockRemoveDisplayEdit}
				/>
			);
			wrapper.instance().displayEditColors();
			expect(wrapper.state('colors')).not.toEqual(initialState);
		});
	});
	describe('createColors', () => {
		it('should return an array of HTML elements', () => {
			let colors = wrapper.instance().createColors();
			expect(typeof colors).toBe('object');
		});
		it('should return an array of HTML elements', () => {
			let colors = wrapper.instance().createEditColors();
			expect(typeof colors).toBe('object');
		});
	});
	describe('lockColor', () => {
		it('should', () => {
			wrapper.instance().lockColor(1);
		});
	});
});
