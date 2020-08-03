import React from 'react';
import { mockProject } from './__mock_data';
import ProjectGridItem from 'components/ProjectGridItem';
// import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { render, fireEvent, waitFor, screen } from 'test-utils';
import 'moment-duration-format';
import { MemoryRouter } from 'react-router-dom';

describe('ProjectGridItem', () => {
  test('shows a project title', () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <ProjectGridItem project={mockProject} />
      </MemoryRouter>
    );

    expect(container).toHaveTextContent('Test 1');
  });
});
