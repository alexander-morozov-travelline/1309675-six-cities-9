import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, DEFAULT_CITY, NameSpace} from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import {makeFakeOffersList, makeFakeUser} from '../../utils/mocks';
import React from 'react';
import MainContent from './main-content';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const mockOfferList = makeFakeOffersList();

describe('Component: MainContent', () => {
  const store = mockStore({
    [NameSpace.Offers]: {
      city: DEFAULT_CITY,
      offers: mockOfferList,
      itemOffer: undefined,
      nearOffers: [],
      favorites: [],
      isDataLoaded: true,
    },
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: makeFakeUser(),
    },
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainContent offers={mockOfferList} city={DEFAULT_CITY} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('places-sorting')).toBeInTheDocument();
    expect(screen.getByTestId('offer-list')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
