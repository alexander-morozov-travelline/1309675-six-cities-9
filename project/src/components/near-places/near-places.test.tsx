import {render, screen} from '@testing-library/react';
import {makeFakeOffersList} from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import React from 'react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, NameSpace} from '../../const';
import NearPlaces from './near-places';

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

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NearPlaces offerList={mockOffersList} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('near-places')).toBeInTheDocument();
    expect(screen.getAllByTestId('place-card').length).toBe(mockOffersList.length);
  });
});
