import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route/history-route';
import ReviewForm from './review-form';
import {makeFakeOffer, makeFakeOffersList, makeFakeUser} from '../../utils/mocks';
import {AuthorizationStatus, DEFAULT_CITY, NameSpace} from '../../const';

const mockStore = configureMockStore();
const mockOffers = makeFakeOffersList();
const mockItemOffer = makeFakeOffer();

const store = mockStore({
  [NameSpace.Offers]: {
    city: DEFAULT_CITY,
    offers: mockOffers,
    itemOffer: mockItemOffer,
    nearOffers: [],
    favorites: [],
    isDataLoaded: true,
  },
  [NameSpace.Comments]: [],
  [NameSpace.User]: {
    user: makeFakeUser(),
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

describe('Component: ReviewForm', () => {
  it('should render "ReviewForm"', () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('review-form')).toBeInTheDocument();
    expect(screen.getByTestId('rating-form')).toBeInTheDocument();
    expect(screen.getByTestId('comment-text')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('comment-text'), 'comment text');

    expect(screen.getByDisplayValue(/comment text/i)).toBeInTheDocument();
  });
});
