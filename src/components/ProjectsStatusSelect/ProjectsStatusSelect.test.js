import React from 'react';
import ProjectsStatusSelect from '.';
import { render, fireEvent, waitFor, screen } from 'test-utils';
import { ACTIVE, ARCHIVED, DELETED } from 'constants/status';

describe('ProjectsStatusSelect', () => {
  test('shows an "ACTIVE" label when status is "active"', () => {
    const mockFn = jest.fn();

    const { container } = render(
      <ProjectsStatusSelect
        projectStatusView={ACTIVE}
        setProjectStatusView={mockFn}
      />
    );

    expect(container).toHaveTextContent(/active/i);
  });

  test('shows an "ARCHIVED" label when status is "archived"', () => {
    const mockFn = jest.fn();

    const { container } = render(
      <ProjectsStatusSelect
        projectStatusView={ARCHIVED}
        setProjectStatusView={mockFn}
      />
    );

    expect(container).toHaveTextContent(/archived/i);
  });

  test('shows an "REMOVED" label when status is "removed"', () => {
    const mockFn = jest.fn();

    const { container } = render(
      <ProjectsStatusSelect
        projectStatusView={DELETED}
        setProjectStatusView={mockFn}
      />
    );

    expect(container).toHaveTextContent(/removed/i);
  });

  test('shows a status selection menu when clicked', async () => {
    const mockFn = jest.fn();

    const { getByTestId, getByText } = render(
      <ProjectsStatusSelect
        projectStatusView={ACTIVE}
        setProjectStatusView={mockFn}
      />
    );

    fireEvent.click(getByTestId('project-status-select-button'));

    await waitFor(() => getByTestId('project-status-select'));

    expect(getByTestId('project-status-select')).toHaveTextContent(
      /activearchivedremoved/i
    );

    fireEvent.click(getByText('Archived'));

    expect(mockFn).toHaveBeenCalled();
  });

  test('shows an "ACTIVE" label by default when no projectStatusView prop is provided', () => {
    const mockFn = jest.fn();

    const { container } = render(
      <ProjectsStatusSelect setProjectStatusView={mockFn} />
    );

    expect(container).toHaveTextContent(/active/i);
  });
});
