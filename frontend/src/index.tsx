import * as React from "react";
import { render } from "react-dom";
import UserMenu from './components/account/UserMenu';

// theme
import { loadTheme } from '@fluentui/react';
// import { initializeIcons } from '@uifabric/icons';

// initializeIcons();
loadTheme({
    semanticColors: {
        primaryButtonBackgroundHovered: 'silver',
        buttonBackground: 'silver',
        inputBackground: '#f7efef'
    },
    palette: {
      themePrimary: '#FE0000'
    }});
//////////////////

const loginEl = document.getElementById("userMenu");

render(<UserMenu />, loginEl);
