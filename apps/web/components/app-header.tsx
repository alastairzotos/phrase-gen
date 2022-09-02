import { Button, PageHeader, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuthState } from '../state/auth';
import { getUserDetails } from '../utils/user';
import { LoginModal } from './login-modal';
import { SaveForm } from './save';

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

  if (!!accessToken && pathname !== '/') {
    tags = [<SaveForm key='save' />]
  }

  const onBack = pathname === '/' ? undefined : () => push('/');

  return (
    <>
      <PageHeader
        onBack={onBack}
        title="PhraseGen"
        avatar={{ src: '/bitmetro-logo.png', style: { backgroundColor: 'black', borderRadius: 0 } }}
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
