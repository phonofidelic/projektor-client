import React from 'react';
import { shallow, mount } from 'enzyme';
import ProjectGrid from 'components/ProjectsGrid';
import ProjectGridItem from 'components/ProjectGridItem';

const mockProject = {
  description:
    "What is Lorem Ipsum?\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  timeUsed: 559011,
  status: 'active',
  work: [
    '5deccf552d02734c53016500',
    '5decd0492d02734c53016501',
    '5dee0ed9ceab8853d5c83650'
  ],
  _id: '5deccf102d02734c530164ff',
  userId: '5deae2fc0538f147d0eace3c',
  created: '2019-12-08T10:23:12.298Z',
  title: 'Test 1',
  client: 'Phonofidelic',
  budgetedTime: 10,
  startDate: '2019-12-09T10:22:00.000Z',
  deadline: '2019-12-16T10:22:00.000Z',
  __v: 3
};

describe('ProjectGridItem', () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('shows a message if no Project item exists', () => {
    wrapper = shallow(<ProjectGrid projects={[]} />);
    expect(wrapper.text()).toBe('Add a project to get started');
  });

  it('shows a Project item if one exists', () => {
    wrapper = shallow(<ProjectGrid projects={[mockProject]} />);
    expect(wrapper.find(ProjectGridItem).length).toBe(1);
  });
});
