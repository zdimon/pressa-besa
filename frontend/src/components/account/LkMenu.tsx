import * as React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';


export default function LkMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { t, i18n } = useTranslation();
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
            <img className="fa-icon" src="/static/images/icons/user.svg" />
           </a>

           <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
        <MenuItem>
            <i className="fa fa-credit-card color-red" aria-hidden="true"></i>
            <a href="/lk/index">{t('m_replanish')}</a>
        </MenuItem>
        <MenuItem>
            <i className="fa fa-handshake-o color-red" aria-hidden="true"></i>
            <a href="/lk/subscription">{t('m_subscription')}</a>
        </MenuItem>
        <MenuItem>
            <i className="fa fa-bookmark color-red" aria-hidden="true"></i>
            <a href="/lk/bookmarks">{t('m_bookmarks')}</a>
        </MenuItem>
        <MenuItem>
            <i className="fa fa-calendar color-red" aria-hidden="true"></i>
            <a href="/lk/abonement">{t('m_abonement')}</a>
        </MenuItem>
        <MenuItem>
            <i className="fa fa-folder-open color-red" aria-hidden="true"></i>
            <a href="/lk/collection">{t('m_collection')}</a>
        </MenuItem>
        <MenuItem>
            <i className="fa fa-shopping-cart color-red" aria-hidden="true"></i>
            <a href="/lk/payments">{t('m_payments')}</a>
        </MenuItem>
        
      </Menu>
        </>
    )
}