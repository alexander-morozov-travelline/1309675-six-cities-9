import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import React from 'react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, DEFAULT_CITY, NameSpace} from '../../const';
import CityList from './cities-list';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CityList city={DEFAULT_CITY}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('cities-list')).toBeInTheDocument();
    expect(screen.getByText(DEFAULT_CITY.name)).toBeInTheDocument();
  });
});
