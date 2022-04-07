import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {AppRoute, AuthorizationStatus, DEFAULT_CITY, NameSpace} from '../../const';
import App from './app';
import {makeFakeOffersList, makeFakeOffer, makeFakeUser, makeFakeComment} from '../../utils/mocks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockOffers = makeFakeOffersList();
const mockItemOffer = makeFakeOffer();
const store = mockStore({
  [NameSpace.Offers]: {
    city: DEFAULT_CITY,
    offers: mockOffers,
    itemOffer: mockItemOffer,
    nearOffers: [],
    favorites: mockOffers,
    isDataLoaded: true,
  },
  [NameSpace.Comments]: makeFakeComment(),
  [NameSpace.User]: {
    user: makeFakeUser(),
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainPage & Paris" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/in Paris/i)).toBeInTheDocument();
  });

  it('should render "AuthScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);


    expect(screen.getByRole('button', {name: /Sign in/i})).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should render Offer when user navigate to "/offer/1"', () => {
    history.push(`${AppRoute.Offer}/1`);

    render(fakeApp);

    expect(screen.getByText(mockItemOffer.title)).toBeInTheDocument();
  });

  it('should render "Favorites" when authorized user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText(/Nothing yet saved|Saved listing/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
