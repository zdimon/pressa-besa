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
import posts from './posts';
import users from './users';
import tags from './tags';

const authProvider = tokenAuthProvider()

const dataProvider = drfProvider("/api", fetchJsonWithAuthToken);

render(
    <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        title="Example Admin"
        layout={Layout}
        customRoutes={[
            <Route
                exact
                path="/custom"
                component={props => <CustomRouteNoLayout {...props} />}
                noLayout
            />,
            <Route
                exact
                path="/custom2"
                component={props => <CustomRouteLayout {...props} />}
            />,
        ]}
    >
        {permissions => [
            <Resource name="posts" {...posts} />,
            <Resource name="comments" {...comments} />,
            permissions ? <Resource name="users" {...users} /> : null,
            <Resource name="tags" {...tags} />,
        ]}
    </Admin>,
    document.getElementById('root')
);
