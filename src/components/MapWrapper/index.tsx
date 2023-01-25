import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import Map from 'ol/Map.js';
import { Feature, View } from 'ol';
import { ZoomSlider } from 'ol/control';
import { LineString, MultiPoint, Point } from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

import './index.less';

import { RootState } from '@app/store';
import RoutePicker from '@app/components/RoutePicker';

const MapWrapper: React.FC = () => {
  const activeRouteData = useSelector(
    (state: RootState) => state.app.activeRouteData,
  );

  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map>();

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
    setMap(map);
  }, []);

  const activeRouteCoords: number[][] = activeRouteData.map((c) => [
    c.lon,
    c.lat,
  ]);

  const route = new LineString(activeRouteCoords);

  const routeFeature = new Feature({
    type: 'route',
    geometry: route,
  });

  // const pointsFeature = new Polyline({
  //   factor: 1e6,
  // }).readGeometry(polyline, {
  //   dataProjection: 'EPSG:4326',
  //   featureProjection: 'EPSG:3857',
  // });

  const pointsFeature = new Feature({
    type: 'points',
    geometry: new MultiPoint(activeRouteCoords).transform(
      'EPSG:4326',
      'EPSG:3857',
    ),
  });

  const startMarker = new Feature({
    type: 'start',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    geometry: new Point(route.getFirstCoordinate()),
  });

  const endMarker = new Feature({
    type: 'end',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    geometry: new Point(route.getLastCoordinate()),
  });

  // const styles = {
  //   route: new Style({
  //     stroke: new Stroke({
  //       width: 6,
  //       color: [237, 212, 0, 0.8],
  //     }),
  //   }),
  //   icon: new Style({
  //     image: new Icon({
  //       anchor: [0.5, 1],
  //       src: 'data/icon.png',
  //     }),
  //   }),
  //   geoMarker: new Style({
  //     image: new CircleStyle({
  //       radius: 7,
  //       fill: new Fill({ color: 'black' }),
  //       stroke: new Stroke({
  //         color: 'white',
  //         width: 2,
  //       }),
  //     }),
  //   }),
  // };

  useEffect(() => {
    map?.getLayers().forEach((layer) => {
      if (layer.get('id') && layer.get('id') === 'activeRouteLayer') {
        map?.removeLayer(layer);
      }
    });
    map && map.addLayer(vectorLayer);
  }, [activeRouteData]);

  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [routeFeature, pointsFeature, startMarker, endMarker],
    }),
  });

  vectorLayer.set('id', 'activeRouteLayer');

  return (
    <div className="map-wrapper" ref={mapRef} id="map">
      <RoutePicker />
    </div>
  );
};

export default MapWrapper;
