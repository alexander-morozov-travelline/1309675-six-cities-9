import React from 'react';
import {render, screen} from '@testing-library/react';
import {makeFakeOffersList} from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, NameSpace} from '../../const';
import FavoritesPlaces from './favorites-places';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

describe('Component: FavoritePlaces', () => {
  it('should render correctly', () => {
    const mockOffersList = makeFakeOffersList();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesPlaces offers={mockOffersList}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('favorites-places')).toBeInTheDocument();
    expect(screen.getAllByTestId('place-card').length).toBe(mockOffersList.length);
  });
});
