import React from 'react';
import { render } from 'test-utils';
import Header from 'components/Header';
import { Router } from 'react-router-dom';
import { history } from 'config';

describe('Header', () => {
  test('can display a title', () => {
    const { container } = render(
      <Router history={history}>
        <Header title="Test" />
      </Router>
    );

    expect(container).toHaveTextContent(/test/i);
  });

  test('can have a back button', () => {
    const { container, getByTestId } = render(
      <Router history={history}>
        <Header title="Test" back="/test" />
      </Router>
    );

    const backButton = getByTestId('header-back-button');

    expect(backButton).toBeInTheDocument();
  });

  test('can render child components', () => {
    const { container } = render(
      <Router history={history}>
        <Header title="Test" back="/test">
          <span>Test Header children</span>
        </Header>
      </Router>
    );

    expect(container).toHaveTextContent('Test Header children');
  });
});
