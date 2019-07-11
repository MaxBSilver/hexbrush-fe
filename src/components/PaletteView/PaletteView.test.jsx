import React from 'react';
import PaletteView from '../PaletteView/PaletteView';
import { shallow } from 'enzyme';
import { mockProjects } from '../../util/mockData';

const mockPalettes = [
	{
		color_1: '#899e01',
		color_2: '#ff21c3',
		color_3: '#88b712',
		color_4: '#f7c574',
		color_5: '#6520cc'
	}
];

describe('PaletteView', () => {
	let wrapper, mockRenameProject, mockSelectProject, mockDeleteProject;
	beforeEach(() => {
		mockRenameProject = jest.fn();
		mockSelectProject = jest.fn();
		mockDeleteProject = jest.fn();
		wrapper = shallow(
			<PaletteView
				palettes={mockPalettes}
				renameProject={mockRenameProject}
				selectProject={mockSelectProject}
				deleteProject={mockDeleteProject}
				selectedProject={1}
				projects={mockProjects}
			/>
		);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should update state on change', () => {
		wrapper.find('#edit-project-input').simulate('change', { target: { name: 'projectName', value: 'new title' } });
		expect(wrapper.state('projectName')).toEqual('new title');
	});

	it('should call select project on select menu change', () => {
		wrapper.find('.palette-view-select').simulate('change', { target: { value: 2 } });
		expect(mockSelectProject).toHaveBeenCalledWith(2);
	});

	it('should call delete project on button click', () => {
		wrapper.find('#PaletteView-delete-project-btn').simulate('click');
		expect(mockDeleteProject).toHaveBeenCalledWith(1);
	});

	describe('renameProject', () => {
		it('should call renameProject on function call', () => {
			wrapper.setState({ projectName: 'new name' });
			wrapper.instance().renameProject();
			expect(mockRenameProject).toHaveBeenCalledWith(1, 'new name');
			expect(wrapper.state('projectName')).toEqual('');
		});
	});
});
