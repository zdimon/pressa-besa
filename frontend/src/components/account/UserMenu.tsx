import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { useBoolean } from '@uifabric/react-hooks';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Request } from '../../Request';


export default function UserMenu() {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
  const req = new Request();
  const login = () => {
    req.post('account/login',{email: 'fdsfs', password: 'dsfsd'})
    .then((payload) => {
      console.log(payload);
    });
    
  }
    
  if (window.localStorage.getItem('token')) {
    return (
      <div className="loginForm">
        <PrimaryButton onClick={ () => login() } text="Выход" />
      </div>
    );
  } else {
    return (
      <div className="loginForm">
        <PrimaryButton onClick={openPanel} text="Вход" />
        <a className="btn btn-primary" href="/login/google-oauth2/">
          <img src="/static/images/google.png" />
        </a>
        <Panel
          headerText="Вход на сайт!,,,,,,"
          isOpen={isOpen}
          onDismiss={dismissPanel}
          closeButtonAriaLabel="Close"
        >


          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <TextField label="Логин" required />
            </div>
            <div className="ms-Grid-row">
              <TextField label="Пароль" required />
            </div>
            <div className="ms-Grid-row">
              <PrimaryButton onClick={ () => login() } text="Вход" />
              <a className="btn btn-primary" href="/login/google-oauth2/">
                Вход через гугл
              </a>

            </div>
          </div>
      </Panel>

      </div>
    )
  }

}