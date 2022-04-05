import {renderHook} from '@testing-library/react-hooks';
import {Map} from 'leaflet';
import useMap from './use-map';
import {DEFAULT_CITY} from '../const';

const rootElement = document.createElement('div');

const expectedMapOptions = {
  center: {
    lat: DEFAULT_CITY.location.latitude,
    lng: DEFAULT_CITY.location.longitude,
  },
  zoom: DEFAULT_CITY.location.zoom,
};

const fakeRef = {
  all: [],
  current: rootElement,
};

describe('Hook: useMap', () => {
  it('should return map', () => {
    const {result} = renderHook(() =>
      useMap(fakeRef, DEFAULT_CITY),
    );

    expect(result.current).toBeInstanceOf(Map);
    expect(result.current?.options).toEqual(expectedMapOptions);
  });
});
