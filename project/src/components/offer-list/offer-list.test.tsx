import {render, screen} from '@testing-library/react';
import {makeFakeOffersList} from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import React, {useState} from 'react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, NameSpace} from '../../const';
import OfferList from './offer-list';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

describe('Component: OfferLists', () => {
  it('should render correctly', () => {
    const mockOffersList = makeFakeOffersList();
    const [activeOffer, setActiveOffer] = useState<null|number>(null);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferList offerList={mockOffersList} setActiveOffer={setActiveOffer}/>
          <div>{activeOffer}</div>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('offer-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('place-card').length).toBe(mockOffersList.length);
  });
});
