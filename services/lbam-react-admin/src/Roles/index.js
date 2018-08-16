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

const Title = ({ record = {} }) =>
    record ? <div>{record.name}</div> : null;

const list = ({ classes, ...props }) => (
    <List
        {...props}
        // filters={<VisitorFilter />}
        // sort={{ field: 'last_seen', order: 'DESC' }}
        perPage={25}
    >
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <EditButton />
      </Datagrid>
    </List>
);

const create = ({ classes, ...props }) => (
    <Create {...props}>
      <SimpleForm redirect="show">
        <TextInput source="name" />
      </SimpleForm>
    </Create>
);

const edit = ({ classes, ...props }) => (
  <Edit title={<Title />} {...props}>
    <SimpleForm>
      <TextField source="id" />
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);

const show = ({ classes, ...props }) => (
  <Show {...props} >
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
    </SimpleShowLayout>
  </Show>
);

export default {
  list,
  create,
  edit,
  show
}
