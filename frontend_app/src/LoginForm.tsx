import React from 'react';


function LoginForm() {

  const login = () => {
      console.log('OK');
  }

  return (
    <div className="App">
        <input type="text" name="username" />
        <input type="text" name="password" />
        <button onClick={ () => login() }> Login!!</button>
    </div>
  );
}

export default LoginForm;
