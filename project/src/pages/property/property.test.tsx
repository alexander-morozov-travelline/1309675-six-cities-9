import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, DEFAULT_CITY, NameSpace} from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import {makeFakeCommentList, makeFakeOffer, makeFakeOffersList, makeFakeUser} from '../../utils/mocks';
import React from 'react';
import Property from './property';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const mockOffer = makeFakeOffer();
const mockOfferList = makeFakeOffersList();

describe('Component: Property', () => {
  const store = mockStore({
    [NameSpace.Offers]: {
      city: DEFAULT_CITY,
      offers: [],
      itemOffer: mockOffer,
      nearOffers: mockOfferList,
      favorites: [],
      isDataLoaded: true,
    },
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: makeFakeUser(),
    },
    [NameSpace.Comments]: {
      comments: makeFakeCommentList(),
    },
  });
  it('should render correctly', () => {
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Property />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
    expect(screen.getByTestId('near-places')).toBeInTheDocument();
  });
});
