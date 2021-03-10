import * as React from "react";
import { hot } from "react-hot-loader";
import { PrimaryButton } from 'office-ui-fabric-react';

import "./../assets/scss/App.scss";

class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <div className="app">
        <h1>Hellovv World!</h1>
        <PrimaryButton onClick={ () => login() } text="Primary" />
      </div>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
