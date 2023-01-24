import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './index.less';

import { AppDispatch, RootState } from '@app/store';
import { getRouteData, getRoutes } from '@app/store/slices/appSlice';

const Map: React.FC = () => {
  const store = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getRoutes());
  }, []);

  useEffect(() => {
    dispatch(getRouteData(1));
  }, []);

  console.log(store);
  return <div className="map">it works</div>;
};

export default Map;
