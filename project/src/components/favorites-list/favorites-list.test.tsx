import {render, screen} from '@testing-library/react';
import {makeFakeOffersList} from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import React from 'react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, NameSpace} from '../../const';
import FavoritesList from './favorites-list';
import {groupOffersByCity} from '../../utils/common';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

describe('Component: NearPlaces', () => {
  it('should render correctly', () => {
    const mockOffersList = makeFakeOffersList();
    const offersGroupByCity = groupOffersByCity(mockOffersList);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesList offersGroupByCity={offersGroupByCity}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('favorites-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('place-card').length).toBe(mockOffersList.length);
  });
});
