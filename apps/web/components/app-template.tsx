import { Layout, Space, Typography } from 'antd';
import Image from 'next/image';
import React from 'react';

const { Header, Content } = Layout;
const { Title } = Typography;

export const AppTemplate: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <Header>
        <Space direction="horizontal" size="large">
          <Image
            src="/bitmetro-logo.png"
            width={50}
            height={50}
            alt="BitMetro Logo"
          />

          <Title style={{ color: 'white' }} level={3}>PhraseGen</Title>
        </Space>
      </Header>

      <Layout>
        <Content style={{ height: 'calc(100vh - 64px)' }}>
          {children}
        </Content>
      </Layout>
    </>
  )
};
