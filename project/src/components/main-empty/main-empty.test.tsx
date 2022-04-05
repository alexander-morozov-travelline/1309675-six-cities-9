import React from 'react';
import {render, screen} from '@testing-library/react';
import MainEmpty from './main-empty';
import {DEFAULT_CITY} from '../../const';

describe('Component: MainEmpty', () => {

  it('should render correctly', () => {
    render(
      <MainEmpty city={DEFAULT_CITY} />
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${DEFAULT_CITY.name}`)).toBeInTheDocument();
  });
});
