import React from 'react';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import './index.less';

import { RootState } from '@app/store';
interface IBaseLayoutProps {
  children: React.ReactNode;
}

const McBaseLayout: React.FC<IBaseLayoutProps> = ({ children }) => {
  const isLoading = useSelector((state: RootState) => state.app.isLoading);

  return (
    <Layout className="base-layout">
      <Spin spinning={isLoading} size="large">
        <Content className="base-layout__content">{children}</Content>
      </Spin>
    </Layout>
  );
};

export default McBaseLayout;
