import React from 'react';
import ColorGenerator from './ColorGenerator';
import { shallow } from 'enzyme';
import { mockProjects, mockPalettes } from '../../util/mockData';

const { color_1, color_2, color_3, color_4, color_5 } = mockPalettes[0];
const mockHexCodes = [ color_1, color_2, color_3, color_4, color_5 ];
const mockEditInfo = { editing: false, displayEdit: false, hex: mockHexCodes };
const mockSelectedProject = 0;
const mockSelectedPalette = { id: 1, name: "max's" };

describe('ColorGenerator', () => {
	let wrapper,
		mockAddPalette,
		mockAddProject,
		mockRemoveEditState,
		mockRemoveDisplayEdit,
		mockSelectProject,
		mockEditPalette;

	beforeEach(() => {
		mockAddPalette = jest.fn();
		mockAddProject = jest.fn();
		mockRemoveEditState = jest.fn();
		mockRemoveDisplayEdit = jest.fn();
		mockSelectProject = jest.fn();
		mockEditPalette = jest.fn();
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
				selectProject={mockSelectProject}
				selectedProject={mockSelectedProject}
				editPalette={mockEditPalette}
				selectedPalette={mockSelectedPalette}
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
			}, 300);
		});

		it('should set state with an array of colors', () => {
			const initialState = wrapper.state('colors');
			setTimeout(() => {
				wrapper.instance().generateHex();
				expect(wrapper.state('colors')).not.toEqual(initialState);
			}, 300);
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
		it('should be able to lock colors', () => {
			const initialState = wrapper.state('colors');
			setTimeout(() => {
				wrapper.instance().lockColor(2);
				expect(wrapper.state('colors')).not.toEqual(initialState);
			}, 2000);
		});
		it("should do nothing if id doesn't exist", () => {
			const initialState = wrapper.state('colors');
			setTimeout(() => {
				wrapper.instance().lockColor(12);
			}, 300);
			expect(wrapper.state('colors')).toEqual(initialState);
		});
	});
	describe('selectProject', () => {
		it('should be able to selectProjects', () => {
			const e = { target: { value: 1 } };
			wrapper.instance().selectProject(e);
			expect(mockSelectProject).toHaveBeenCalled();
			expect(wrapper.state('selectedProject')).toEqual(1);
		});
	});
	describe('handleSubmit', () => {
		it('should handle submit if project is selected', () => {
			const e = { preventDefault: jest.fn() };
			wrapper.instance().handleSubmit(e);
			expect(mockAddProject).toHaveBeenCalled();
		});
		it('should handle submit if palette is selected', () => {
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
					selectProject={mockSelectProject}
					selectedProject={1}
				/>
			);
			let e = { preventDefault: jest.fn() };
			wrapper.instance().handleSubmit(e);
			expect(mockAddProject).toHaveBeenCalled();
		});
	});
	describe('editPalette', () => {
		it('editPalette should set the value of paletteName in state to an empty string', () => {
			let e = { target: { id: 'save-btn' } };
			wrapper.instance().editPalette(e);
			expect(wrapper.state('paletteName')).toEqual('');
		});
	});
});
