import React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';
import { SharedColors } from '@fluentui/theme';

function LoginForm() {

  const login = () => {
      console.log('OK');
  }

  return (
    <div className="App">
        <input type="text" name="username" />
        <input type="text" name="password" />
        <PrimaryButton style={{ backgroundColor: '#FE0000' }} onClick={ () => login() } text="Primary" />
    </div>
  );
}

export default LoginForm;
