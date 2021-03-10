import * as React from "react";
import { render } from "react-dom";
import App from "./components/App";
import LoginForm from "./components/LoginForm";
import { loadTheme } from '@fluentui/react';

loadTheme({
    semanticColors: {
        primaryButtonBackgroundHovered: 'silver',
        buttonBackground: 'silver',
        inputBackground: '#f7efef'
    },
    palette: {
      themePrimary: '#FE0000'
    }});

const rootEl = document.getElementById("root");

render(<App />, rootEl);

const loginEl = document.getElementById("loginForm");

render(<LoginForm />, loginEl);
