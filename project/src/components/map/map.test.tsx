import React from 'react';
import Map from './map';
import {render, screen} from '@testing-library/react';
import {DEFAULT_CITY} from '../../const';
import {makeFakeOffersList} from '../../utils/mocks';
import {getPointsFromOffers} from '../../utils/common';

describe('Component: Map', () => {
  const mockOffers = makeFakeOffersList();
  const points = getPointsFromOffers(mockOffers);

  it('should render correctly', () => {
    render(
      <Map city={DEFAULT_CITY} points={points} selectedPointId={1} />
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
