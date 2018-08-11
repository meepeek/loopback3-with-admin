import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import Posts from './Posts'
import loopbackRestClient from 'aor-loopback'
import Roles from './Roles'
import authProvider from './authProvider'

const dataProvider = loopbackRestClient('http://localhost:3333/api/');
const App = () => (
    <Admin dataProvider={dataProvider} authProvider={authProvider('http://localhost:3333/login')}>
        <Resource name="Roles" list={Roles.list} create={Roles.create} edit={Roles.edit} />
    </Admin>
);

export default App;
