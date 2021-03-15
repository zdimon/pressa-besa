/* eslint react/jsx-key: off */
import React from 'react';
import { Admin, Resource} from 'react-admin'; // eslint-disable-line import/no-unresolved
import { render } from 'react-dom';
import { Route } from 'react-router-dom';

import comments from './comments';
import CustomRouteLayout from './customRouteLayout';
import CustomRouteNoLayout from './customRouteNoLayout';
import drfProvider, { tokenAuthProvider, fetchJsonWithAuthToken } from 'ra-data-django-rest-framework';
import i18nProvider from './i18nProvider';
import Layout from './Layout';
import article from './article';
import users from './users';
import tags from './tags';
import journal from './journal';

const authProvider = tokenAuthProvider()

const dataProvider = drfProvider("/api", fetchJsonWithAuthToken);

render(
    <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        title="Example Admin"
        layout={Layout}
        
    >
        {permissions => [
            <Resource name="journal" {...journal} />,
            <Resource name="article" {...article} />,
            permissions ? <Resource name="users" {...users} /> : null,
            <Resource name="tags" {...tags} />,
        ]}
    </Admin>,
    document.getElementById('root')
);
