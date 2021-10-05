import * as React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function LkMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
      };

    return (
        <>
          
           <a  
            className="rd-nav-options__login"
            onClick={handleClick} 
            href="#">
            <img className="fa-icon" src="/static/images/user.svg" />
           </a>

           <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
        <MenuItem>
            <i className="fa fa-credit-card" aria-hidden="true"></i>
            <a href="/lk/index">Пополнить счет</a>
        </MenuItem>
        <MenuItem>
            <i className="fa fa-handshake-o" aria-hidden="true"></i>
            <a href="/lk/subscription">Подписки</a>
        </MenuItem>
        <MenuItem>
            <i className="fa fa-bookmark" aria-hidden="true"></i>
            <a href="/lk/bookmarks">Закладки</a>
        </MenuItem>
        <MenuItem>
            <i className="fa fa-calendar" aria-hidden="true"></i>
            <a href="/lk/abonement">Абонемент</a>
        </MenuItem>
        <MenuItem>
            <i className="fa fa-folder-open" aria-hidden="true"></i>
            <a href="/lk/collection">Моя коллекция</a>
        </MenuItem>
        <MenuItem>
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            <a href="/lk/payments">Платежи</a>
        </MenuItem>
        
      </Menu>
        </>
    )
}