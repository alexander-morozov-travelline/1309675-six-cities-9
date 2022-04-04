import {render, screen} from '@testing-library/react';
import FavoriteCard from './favorite-card';
import {makeFakeOffer} from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import React from 'react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, NameSpace} from '../../const';

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
          <FavoriteCard offer={mockOffer} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByTestId('place-card')).toBeInTheDocument();
    expect(screen.getByTestId('place-card-info')).toBeInTheDocument();
    expect(screen.getByTestId('place-card-rating')).toBeInTheDocument();
  });
});
