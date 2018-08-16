import React from 'react';
import {
    SelectInput,
    Datagrid,
    List,
    TextField,
    SimpleForm,
    Create,
    Edit,
    TextInput,
    EditButton,
    ReferenceField,
    ReferenceInput,
    Show,
    SimpleShowLayout
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/icons/Person';

const Title = ({ record = {}, ...props }) =>
    record ? <div>{record.name}</div> : null;

const listStyles = {
    nb_commands: { color: 'purple' },
};

const list = withStyles(listStyles)(({ classes, ...props }) => (
    <List
        {...props}
        title={props.options.label}
        // filters={<VisitorFilter />}
        // sort={{ field: 'last_seen', order: 'DESC' }}
        perPage={25}
    >
      <Datagrid >
        <TextField source="id" />
        <TextField source="principalType" />
        <ReferenceField label="Principal" source="principalId" reference="SystemUsers">
            <TextField source="email" />
        </ReferenceField>
        <ReferenceField label="Role" source="roleId" reference="Roles">
            <TextField source="name" />
        </ReferenceField>
        <EditButton />
      </Datagrid>
    </List>
));

const create = ({ classes, record, ...props }) => (
  <Create title={<Title />} {...props}>
    <SimpleForm redirect="list">
        <SelectInput
            source="principalType"
            choices={[
                    { id: 'USER', name: 'User' },
                    { id: 'ROLE', name: 'Role' },
                    { id: 'APPLICATION', name: 'Application' }
                ]}
        />
        <ReferenceInput label="Principal" reference="SystemUsers" source="principalId">
          <SelectInput optionText="email"/>
        </ReferenceInput>
        <ReferenceInput label="Role" reference="Roles" source="roleId">
          <SelectInput optionText="name"/>
        </ReferenceInput>
    </SimpleForm>
  </Create>
);

const edit = ({ classes, record, ...props }) => (
  <Edit title={<Title />} {...props}>
    <SimpleForm>
        <SelectInput
            source="principalType"
            choices={[
                    { id: 'USER', name: 'User' },
                    { id: 'ROLE', name: 'Role' },
                    { id: 'APPLICATION', name: 'Application' }
                ]}
        />
        <ReferenceInput label="Principal" reference="SystemUsers" source="principalId">
          <SelectInput optionText="email"/>
        </ReferenceInput>
        <ReferenceInput label="Role" reference="Roles" source="roleId">
          <SelectInput optionText="name"/>
        </ReferenceInput>
    </SimpleForm>
  </Edit>
);

const show = ({ classes, ...props }) => (
  <Show {...props} >
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="principalType" />
      <ReferenceField label="Principal" reference="SystemUsers" source="principalId">
        <TextField source="email" />
      </ReferenceField>
      <ReferenceField label="Role" reference="Roles" source="roleId">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export default {
  list,
  create,
  edit,
  show
}
