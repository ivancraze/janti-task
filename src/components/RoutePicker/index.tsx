import React, { Key, memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './index.less';

import { IRoute, ITableColumnsType, ITableDataType } from '@app/types';
import { AppDispatch, RootState } from '@app/store';
import { Button, Table } from 'antd';
import {
  clearSelectedRoute,
  getRouteData,
  getRoutes,
  setSelectedRoute,
} from '@app/store/slices/appSlice';

const columns: ITableColumnsType[] = [
  {
    title: 'Название',
    dataIndex: 'routeName',
    key: 'routeName',
    className: 'fixed-column',
  },
];
const RoutePicker: React.FC = () => {
  const routes = useSelector((state: RootState) => state.app.routes);
  const activeRoute = useSelector((state: RootState) => state.app.activeRoute);
  const dispatch = useDispatch<AppDispatch>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const dataSource: ITableDataType[] = routes.map((route: IRoute) => ({
    key: route.id,
    routeId: route.id,
    routeName: route.name,
  }));

  console.log(activeRoute);

  useEffect(() => {
    dispatch(getRoutes());
  }, []);

  // useEffect(() => {
  //   activeRoute && dispatch(getRouteData(activeRoute.id));
  // }, [activeRoute]);

  const onRowSelect = (
    selectedRowKeys: Key[],
    selectedRows: ITableDataType[],
  ): void => {
    const rowData = routes.find((r) => r.id === selectedRows[0].routeId);
    rowData && setSelectedRowKeys([rowData.id]);
    rowData && dispatch(getRouteData(rowData.id));
    dispatch(setSelectedRoute(rowData));
  };

  const onClearRoute = () => {
    setSelectedRowKeys([]);
    dispatch(clearSelectedRoute());
  };

  return (
    <div className="route-picker">
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        rowSelection={{
          type: 'radio',
          onChange: onRowSelect,
          selectedRowKeys: selectedRowKeys,
        }}
      />
      <Button
        className="route-picker__button"
        onClick={onClearRoute}
        type="primary"
      >
        Отменить выбор
      </Button>
    </div>
  );
};

export default memo(RoutePicker);
