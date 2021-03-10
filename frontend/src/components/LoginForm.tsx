import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export default function LoginForm() {

    const login = () => {
        console.log('OK');
    }

  return (
    <div className="loginForm">
      <h1>login</h1>
      <TextField label="Required " required />
      <TextField label="Required " required />
      <PrimaryButton onClick={ () => login() } text="Primary" />

    </div>
  );
}