import { Layout } from 'antd';
import React from 'react';
import { AppHeader } from './app-header';

const { Content } = Layout;

export const AppTemplate: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <AppHeader />

      <Layout>
        <Content style={{ height: 'calc(100vh - 72px)' }}>
          {children}
        </Content>
      </Layout>
    </>
  )
};
