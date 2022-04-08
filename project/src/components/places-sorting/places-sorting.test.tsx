import React from 'react';
import {render, screen} from '@testing-library/react';
import {DEFAULT_SORT, SortType} from '../../const';
import PlacesSorting from './places-sorting';

describe('Component: PlacesSorting', () => {
  it('should render correctly', () => {
    render(
      <PlacesSorting sortType={DEFAULT_SORT} onSetSortType={jest.fn()}></PlacesSorting>,
    );

    expect(screen.getByTestId('places-sorting')).toBeInTheDocument();
    expect(screen.getByTestId(SortType.POPULAR)).toBeInTheDocument();
    expect(screen.getByTestId(SortType.PRICE_HIGH_TO_LOW)).toBeInTheDocument();
    expect(screen.getByTestId(SortType.PRICE_LOW_TO_HIGH)).toBeInTheDocument();
    expect(screen.getByTestId(SortType.TOP_RATED)).toBeInTheDocument();
  });
});
