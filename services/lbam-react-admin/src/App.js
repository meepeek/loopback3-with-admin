import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import Posts from './Posts'
import loopbackRestClient from 'aor-loopback'
import Roles from './Roles'
import SystemUsers from './SystemUsers'
import RoleMappings from './RoleMappings'
import authProvider from './authProvider'

const dataProvider = loopbackRestClient('http://localhost:3333/api');
const App = () => (
    <Admin dataProvider={dataProvider} authProvider={authProvider('http://localhost:3333')}>
      <Resource name="SystemUsers" options={{label: "System Users"}} list={SystemUsers.list} create={SystemUsers.create} edit={SystemUsers.edit} />
      <Resource name="RoleMappings" options={{label: "Role Assignment"}} list={RoleMappings.list} create={RoleMappings.create} edit={RoleMappings.edit} />
      <Resource name="Roles" list={Roles.list} create={Roles.create} edit={Roles.edit} />
    </Admin>
);

export default App;
