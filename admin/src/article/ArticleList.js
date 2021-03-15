/* eslint react/jsx-key: off */
import PeopleIcon from '@material-ui/icons/People';
import memoize from 'lodash/memoize';
import { useMediaQuery } from '@material-ui/core';
import React from 'react';
import {
    BulkDeleteWithConfirmButton,
    Datagrid,
    Filter,
    List,
    SearchInput,
    SimpleList,
    TextField,
    ImageField,
    TextInput,
} from 'react-admin';


export const ArticleIcon = PeopleIcon;

const ArticleFilter = ({ permissions, ...props }) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <TextInput source="name" />
        {permissions === 'admin' ? <TextInput source="role" /> : null}
    </Filter>
);

const ArticleBulkActionButtons = props => (
    <BulkDeleteWithConfirmButton {...props} />
);

const rowClick = memoize(permissions => (id, basePath, record) => {
    return permissions === 'admin'
        ? Promise.resolve('edit')
        : Promise.resolve('show');
});

const ArticleList = ({ permissions, ...props }) => (
    <List
        {...props}
        filters={<ArticleFilter permissions={permissions} />}
        filterDefaultValues={{ role: 'Article' }}
        sort={{ field: 'name', order: 'ASC' }}
        bulkActionButtons={<ArticleBulkActionButtons />}
    >
        {useMediaQuery(theme => theme.breakpoints.down('sm')) ? (
            <SimpleList
                primaryText={record => record.name}
                secondaryText={record =>
                    permissions === 'admin' ? record.role : null
                }
            />
        ) : (
            <Datagrid
                rowClick={rowClick(permissions)}
                optimized
            >
                <TextField source="id" />
                <TextField source="title" />
                <ImageField source="cover_url" title="title" />
               
            </Datagrid>
        )}
    </List>
);

export default ArticleList;
