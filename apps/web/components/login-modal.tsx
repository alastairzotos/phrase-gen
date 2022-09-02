import { Modal } from 'antd';
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { GoogleLoginButton } from './google-login-button/google-login-button';
import { useAuthState } from '../state/auth/state';
import { getEnv } from '../env';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<Props> = ({ open, onClose }) => {
  const loginWithGoogle = useAuthState(s => s.loginWithGoogle);
  const loginWithFacebook = useAuthState(s => s.loginWithFacebook);

  const loginGoogle = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: response => {
      loginWithGoogle(response);
      onClose();
    }
  })

  const handleFacebookLogin = (response: ReactFacebookLoginInfo & { first_name: string }) => {
    loginWithFacebook(response);
    onClose();
  }

  return (
    <Modal
      title="Login to save"
      visible={open}
      onCancel={onClose}
      onOk={onClose}
    >
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <GoogleLoginButton onClick={loginGoogle} />
        <br />
        <FacebookLogin
          size='small'
          buttonStyle={{ width: '100%' }}
          appId={getEnv().fbAppId}
          fields="name,email,first_name"
          callback={handleFacebookLogin}
          icon='fa-facebook'
        />
      </div>
    </Modal>
  )
}
