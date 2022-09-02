import { Button } from 'antd';
import React from 'react';

import styles from './google-login-button.module.css';

export const GoogleLoginButton: React.FC<React.ComponentProps<typeof Button>> = (props) => (
  <Button {...props} size='large' className={styles.button}>
    <span className={styles.span}>Login with Google</span>
  </Button>
)
