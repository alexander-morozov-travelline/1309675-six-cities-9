import React from 'react';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import {DEFAULT_CITY} from '../../const';
import FavoriteLocation from './favorite-location';

const history = createMemoryHistory();

describe('Component: FavoriteLocation', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <FavoriteLocation locationName={DEFAULT_CITY.name} />
      </HistoryRouter>,
    );

    expect(screen.getByTestId('favorites-locations')).toBeInTheDocument();
    expect(screen.getByText(DEFAULT_CITY.name)).toBeInTheDocument();
  });
});
