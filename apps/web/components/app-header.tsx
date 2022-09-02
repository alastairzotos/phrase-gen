import { Button, PageHeader, Typography } from 'antd';
import React, { useState } from 'react';
import { useAuthState } from '../state/auth';
import { LoginModal } from './login-modal';

const { Text } = Typography;

export const AppHeader: React.FC = () => {
  const userDetails = useAuthState(s => s.userDetails);
  const logout = useAuthState(s => s.logout);

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  let extra: React.ReactNode = [];

  if (!userDetails) {
    extra = [<Button key='login' type='primary' onClick={() => setLoginModalOpen(true)}>Login to save</Button>];
  } else {
    extra = [
      <Text>Welcome {userDetails.givenName}</Text>,
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
        open={loginModalOpen && !userDetails}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  )
};
