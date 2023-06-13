import { Button, PageHeader, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuthState } from '../state/auth';
import { urls } from '../urls';
import { getUserDetails } from '../utils/user';
import { LoginModal } from './login-modal';
import { ProjectList } from './project-list';
import { SaveForm } from './save-form';

const { Text } = Typography;

export const AppHeader: React.FC = () => {
  const { pathname, push } = useRouter();

  const accessToken = useAuthState(s => s.accessToken);
  const logout = useAuthState(s => s.logout);

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const userDetails = getUserDetails();

  let extra: React.ReactNode = [];

  if (!accessToken) {
    extra = [<Button key='login' type='primary' onClick={() => setLoginModalOpen(true)}>Login to save</Button>];
  } else {
    extra = [
      <Text key='welcome'>Welcome {userDetails!.givenName}</Text>,
      <Button key='logout' onClick={logout}>Logout</Button>
    ]
  }

  let tags: React.ReactNode = [];

  if (!!accessToken) {
    tags = [
      <div key='save-form-and-projects' style={{ display: 'flex' }}>
        <SaveForm />
        <ProjectList />
      </div>
    ]
  }

  const onBack = pathname === urls.home() ? undefined : () => push(urls.home());

  return (
    <>
      <PageHeader
        onBack={onBack}
        title="PhraseGen"
        avatar={{ src: '/bm-logo-new-white.png', style: { backgroundColor: 'black', borderRadius: 5, padding: 2 } }}
        extra={extra}
        tags={tags as any}
      />

      <LoginModal
        open={loginModalOpen && !accessToken}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  )
};
