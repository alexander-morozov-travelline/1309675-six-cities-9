import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import {Location, Points} from '../../types/offer';
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
  city: Location;
  points: Points;
  selectedPointId: number | null;
};

function Map(props: MapProps): JSX.Element {
  const {city, points, selectedPointId} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(
            point.id === selectedPointId ? currentCustomIcon : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
  }, [map, points, selectedPointId]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
