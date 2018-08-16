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
        title={props.options.label}
        // filters={<VisitorFilter />}
        // sort={{ field: 'last_seen', order: 'DESC' }}
        perPage={25}
    >
      <Datagrid >
        <TextField source="id" />
        <TextField source="email" />
        <EditButton />
      </Datagrid>
    </List>
);

const create = ({ classes, ...props }) => (
    <Create {...props}>
      <SimpleForm redirect="list">
        <TextInput
            source="email"
            type="email"
        />
        <TextInput
            source="password"
            type="password"
        />
      </SimpleForm>
    </Create>
);

const edit = ({ classes, ...props }) => (
  <Edit title={<Title />} {...props}>
    <SimpleForm>
        <TextInput
            source="email"
            type="email"
        />
    </SimpleForm>
  </Edit>
);

const show = ({ classes, ...props }) => (
  <Show {...props} >
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="email" />
    </SimpleShowLayout>
  </Show>
);

export default {
  list,
  create,
  edit,
  show
}
