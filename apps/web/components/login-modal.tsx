import { Modal } from 'antd';
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuthState } from '../state/auth/state';
import { GoogleLoginButton } from './google-login-button/google-login-button';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<Props> = ({ open, onClose }) => {
  const loginWithGoogle = useAuthState(s => s.loginWithGoogle);

  const loginGoogle = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: response => {
      loginWithGoogle(response);
      onClose();
    }
  })

  return (
    <Modal
      title="Login to save"
      visible={open}
      onCancel={onClose}
      onOk={onClose}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <GoogleLoginButton onClick={loginGoogle} />
      </div>
    </Modal>
  )
}
