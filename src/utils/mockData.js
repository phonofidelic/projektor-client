export const mockProject = {
  description:
    "What is Lorem Ipsum?\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  timeUsed: 559011,
  status: 'active',
  work: [
    {
      _id: '5df68683c1181c125b671ef1',
      userId: '5deae94a77d40a110ddb30ea',
      projectId: '5df5e2d85032413df009eebc',
      date: '2019-12-15T19:15:30.327Z',
      start: '2019-12-15T19:15:30.327Z',
      end: '2019-12-15T19:16:18.786Z',
      duration: 48459,
      created: '2019-12-15T19:16:19.291Z',
      __v: 0,
    },
  ],
  _id: '5deccf102d02734c530164ff',
  userId: '5deae2fc0538f147d0eace3c',
  created: '2019-12-08T10:23:12.298Z',
  title: 'Test 1',
  client: 'Phonofidelic',
  budgetedTime: 10,
  startDate: '2019-12-09T10:22:00.000Z',
  deadline: '2019-12-16T10:22:00.000Z',
  color: '#66bb6a',
  __v: 3,
};

export const mockSelectedProject = {
  description: 'No description provided',
  timeUsed: 48459,
  status: 'active',
  work: [
    {
      _id: '5df68683c1181c125b671ef1',
      userId: '5deae94a77d40a110ddb30ea',
      projectId: '5df5e2d85032413df009eebc',
      date: '2019-12-15T19:15:30.327Z',
      start: '2019-12-15T19:15:30.327Z',
      end: '2019-12-15T19:16:18.786Z',
      duration: 48459,
      created: '2019-12-15T19:16:19.291Z',
      __v: 0,
    },
  ],
  _id: '5df5e2d85032413df009eebc',
  userId: '5deae94a77d40a110ddb30ea',
  created: '2019-12-15T07:38:00.967Z',
  title: 'Short project',
  client: 'Phonofidelic',
  budgetedTime: 0.5,
  startDate: null,
  deadline: null,
  __v: 0,
};

export const mockWork = {
  _id: '5df68683c1181c125b671ef1',
  userId: '5deae94a77d40a110ddb30ea',
  projectId: '5df5e2d85032413df009eebc',
  date: '2019-12-15T19:15:30.327Z',
  start: '2019-12-15T19:15:30.327Z',
  end: '2019-12-15T19:16:18.786Z',
  duration: 48459,
  created: '2019-12-15T19:16:19.291Z',
  __v: 0,
};

export const mockError = {
  status: 500,
  message: 'Something went wrong',
};

export const mockUserInfo = {
  _id: '5deae2fc0538f147d0eace3c',
  email: 'test1@test.com',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGVhZTJmYzA1MzhmMTQ3ZDBlYWNlM2MiLCJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwicnQiOiI4MGY5OGNjMi04MjU4LTQzZGEtYjI0ZC1iMDlmNDgzYTQ3ZDUiLCJpYXQiOjE1NzY1NjcxNzUsImV4cCI6MTU3NjU2ODA3NSwiYXVkIjoicHJvamVrdG9yX2NsaWVudCIsImlzcyI6InByb2pla3Rvcl9hcGkiLCJzdWIiOiI1ZGVhZTJmYzA1MzhmMTQ3ZDBlYWNlM2MiLCJqdGkiOiJmOTZkMGVkZi1iYmY2LTQ1ZmQtYWYxMi1mNmYwYTkyODcxNWUifQ.-hqUCC-l1GGu6kl-yxsrph2TcCgE3r2MhFiyFWTTMdU',
};
