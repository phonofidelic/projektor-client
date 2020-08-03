import createWorkItems from 'utils/createWorkItems';

export const mockProjects = [
  {
    id: 1,
    title: 'Test Project 1',
    client: 'Client Name',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    budgetedTime: 8,
    timeUsed: 6,
    startDate: 1575153708162,
    deadline: null,
    work: createWorkItems(3, 6),
    color: '#66bb6a',
  },
  {
    id: 2,
    title: 'Test Project 2',
    client: 'Client Name',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    budgetedTime: 40,
    timeUsed: 8,
    startDate: 1575153708162,
    deadline: null,
    work: createWorkItems(2, 8),
    color: '#66bb6a',
  },
  {
    id: 3,
    title: 'Test Project 3',
    client: 'Client Name',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    budgetedTime: 16,
    timeUsed: 4,
    startDate: 1575153708162,
    deadline: null,
    work: createWorkItems(4, 4),
    color: '#66bb6a',
  },
  {
    id: 4,
    title: 'Really looooooooooooooooooooooooooooong title',
    client: 'Client Name',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    budgetedTime: 16,
    timeUsed: 10,
    startDate: 1575153708162,
    deadline: null,
    work: createWorkItems(5, 10),
    color: '#66bb6a',
  },
];

export default mockProjects;
