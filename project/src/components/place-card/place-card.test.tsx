import {render, screen} from '@testing-library/react';
import PlaceCard from './place-card';
import {makeFakeOffer} from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, CardPlaceType, CardType, NameSpace} from '../../const';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

describe('Component: FavoriteCard', () => {
  it('should render correctly', () => {
    const mockOffer = makeFakeOffer();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlaceCard
            cardType={CardType.Cities}
            cardPlaceType={CardPlaceType.Cities}
            offer={mockOffer}
            onMouseEnter={jest.fn()}
            onMouseLeave={jest.fn()}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByTestId('place-card')).toBeInTheDocument();
    expect(screen.getByTestId('place-card-info')).toBeInTheDocument();
    expect(screen.getByTestId('place-card-image')).toBeInTheDocument();
    expect(screen.getByTestId('place-card-rating')).toBeInTheDocument();
  });
});
