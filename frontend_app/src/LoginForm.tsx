import * as React from 'react';

function LoginForm() {

  var login = () => {
    console.log('OK');
  }

  return (
    <div className="login-form">
      <h1>login</h1>
      <input name="username" />
      <input name="password" />
      <button onClick={() => login()}> Login </button>
    </div>
  );
}

export default LoginForm;
