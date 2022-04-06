import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, NameSpace} from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import {makeFakeOffersList, makeFakeUser} from '../../utils/mocks';
import FavoritesContent from './favorites-content';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const mockOfferList = makeFakeOffersList();

describe('Component: Favorites', () => {

  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.Offers]: {
        favorites: mockOfferList,
        isDataLoaded: true,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: makeFakeUser(),
      },
    });
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesContent favorites={mockOfferList} />
        </HistoryRouter>
      </Provider>,
    );
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByTestId('favorites-list')).toBeInTheDocument();
  });
});
