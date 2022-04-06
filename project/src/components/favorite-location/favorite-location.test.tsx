import React from 'react';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import {AuthorizationStatus, DEFAULT_CITY, NameSpace} from '../../const';
import FavoriteLocation from './favorite-location';
import {Provider} from 'react-redux';
import {makeFakeUser} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Offers]: {
    city: DEFAULT_CITY,
    isDataLoaded: true,
  },
});

describe('Component: FavoriteLocation', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoriteLocation locationName={DEFAULT_CITY.name} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('favorites-locations')).toBeInTheDocument();
    expect(screen.getByText(DEFAULT_CITY.name)).toBeInTheDocument();
  });
});
