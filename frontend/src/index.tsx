import * as React from "react";
import { render } from "react-dom";
import UserMenu from './components/account/UserMenu';

const loginEl = document.getElementById("userMenu");

render(<UserMenu />, loginEl);
