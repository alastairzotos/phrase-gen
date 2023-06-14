import { Button, PageHeader, Typography } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { ProjectList } from './project-list';
import { SaveForm } from './save-form';
import { useAuthUrls, useLoggedInUser, useLogout } from '@bitmetro/auth-react';
import { urls } from '../urls';

const { Text } = Typography;

export const AppHeader: React.FC = () => {
  const { pathname, push } = useRouter();

  const router = useRouter();

  const { loginUrl } = useAuthUrls(router.asPath);

  const handleLogout = useLogout();
  const loggedInUser = useLoggedInUser();

  const handleLoginClick = () => {
    router.push(loginUrl);
  }

  let extra: React.ReactNode = [];

  if (!loggedInUser) {
    extra = [<Button key='login' type='primary' onClick={handleLoginClick}>Login to save</Button>];
  } else {
    extra = [
      <Text key='welcome'>Welcome {loggedInUser!.details.first_name}</Text>,
      <Button key='logout' onClick={handleLogout}>Logout</Button>
    ]
  }

  let tags: React.ReactNode = [];

  if (!!loggedInUser) {
    tags = [
      <div key='save-form-and-projects' style={{ display: 'flex' }}>
        <SaveForm />
        <ProjectList />
      </div>
    ]
  }

  const onBack = pathname === urls.home() ? undefined : () => push(urls.home());

  return (
    <PageHeader
      onBack={onBack}
      title="PhraseGen"
      avatar={{ src: '/bm-logo-new-white.png', style: { backgroundColor: 'black', borderRadius: 5, padding: 2 } }}
      extra={extra}
      tags={tags as any}
    />
  )
};
