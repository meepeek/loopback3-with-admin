import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import Roles from './Roles'
import SystemUsers from './SystemUsers'
import RoleMappings from './RoleMappings'
import authProvider from './authProvider'
import loopbackRestClient, {authClient} from 'aor-loopback'

const dataProvider = loopbackRestClient('http://localhost:3333/api');
const App = () => (
    <Admin dataProvider={dataProvider} authProvider={authClient('http://localhost:3333/login')}>
      <Resource name="SystemUsers" options={{label: "System Users"}}
        list={SystemUsers.list} create={SystemUsers.create}
        edit={SystemUsers.edit} show={SystemUsers.show} />
      <Resource name="RoleMappings" options={{label: "Role Assignment"}}
        list={RoleMappings.list} create={RoleMappings.create}
        edit={RoleMappings.edit} show={RoleMappings.show} />
      <Resource name="Roles"
        list={Roles.list} create={Roles.create}
        edit={Roles.edit} show={Roles.show} />
    </Admin>
);

export default App;
