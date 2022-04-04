import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import {City, Points} from '../../types/offer';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

type MapProps = {
  city: City;
  points: Points;
  selectedPointId: number | null;
};

function Map(props: MapProps): JSX.Element {
  const {city, points, selectedPointId} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markers = points.map((point, number) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });
        marker
          .setIcon( selectedPointId === point.id ? currentCustomIcon : defaultCustomIcon)
          .addTo(map);
        return marker;
      });

      return () => {
        markers.forEach((marker) => {
          if (map) {
            map.removeLayer(marker);
          }
        });
      };
    }
  }, [map, points, selectedPointId]);

  return <div style={{height: '100%'}} ref={mapRef} data-testid="map"></div>;
}

export default Map;
