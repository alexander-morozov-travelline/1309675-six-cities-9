import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, DEFAULT_CITY, NameSpace} from '../../const';
import MainPage from './main-page';
import HistoryRouter from '../../components/history-route/history-route';
import {makeFakeOffersList, makeFakeUser} from '../../utils/mocks';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: MainPage', () => {
  const store = mockStore({
    [NameSpace.Offers]: {
      city: DEFAULT_CITY,
      offers: makeFakeOffersList(),
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
          <MainPage />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('main')).toBeInTheDocument();
    expect(screen.getByTestId('cities-list')).toBeInTheDocument();
    expect(screen.getByTestId('offer-list')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
