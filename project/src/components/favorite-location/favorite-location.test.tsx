import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import {DEFAULT_CITY} from '../../const';
import FavoriteLocation from './favorite-location';
import {store} from '../../store';
import {Provider} from 'react-redux';

const history = createMemoryHistory();

describe('Component: FavoriteLocation', () => {
  it('should render correctly', () => {
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoriteLocation locationName={DEFAULT_CITY.name} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('favorites-locations')).toBeInTheDocument();
    expect(screen.getByText(DEFAULT_CITY.name)).toBeInTheDocument();
  });
});
