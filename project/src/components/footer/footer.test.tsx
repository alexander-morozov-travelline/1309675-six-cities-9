import React from 'react';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import Footer from './footer';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>,
    );

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
