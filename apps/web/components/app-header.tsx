import { Button, PageHeader, Typography } from 'antd';
import React, { useState } from 'react';
import { useAuthState } from '../state/auth';
import { getUserDetails } from '../utils/user';
import { LoginModal } from './login-modal';

const { Text } = Typography;

export const AppHeader: React.FC = () => {
  const accessToken = useAuthState(s => s.accessToken);
  const logout = useAuthState(s => s.logout);

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const userDetails = getUserDetails();

  let extra: React.ReactNode = [];

  if (!accessToken) {
    extra = [<Button key='login' type='primary' onClick={() => setLoginModalOpen(true)}>Login to save</Button>];
  } else {
    extra = [
      <Text>Welcome {userDetails!.givenName}</Text>,
      <Button key='logout' onClick={logout}>Logout</Button>
    ]
  }

  return (
    <>
      <PageHeader
        title="PhraseGen"
        avatar={{ src: '/bitmetro-logo.png', style: { backgroundColor: 'black', borderRadius: 0 } }}
        extra={extra}
      />

      <LoginModal
        open={loginModalOpen && !accessToken}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  )
};
