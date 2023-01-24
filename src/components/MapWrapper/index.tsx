import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import Map from 'ol/Map.js';
import { View } from 'ol';
import { ZoomSlider } from 'ol/control';

import './index.less';

import { AppDispatch, RootState } from '@app/store';
import RoutePicker from '@app/components/RoutePicker';

const MapWrapper: React.FC = () => {
  const store = useSelector((state: RootState) => state);
  const activeRoute = useSelector(
    (state: RootState) => state.app.activeRouteData,
  );
  const dispatch = useDispatch<AppDispatch>();

  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current ?? undefined,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
      overlays: [],
    });

    const zoomSlider = new ZoomSlider();

    map.addControl(zoomSlider);
  }, []);

  return (
    <div className="map-wrapper" ref={mapRef} id="map">
      <RoutePicker />
    </div>
  );
};

export default MapWrapper;
