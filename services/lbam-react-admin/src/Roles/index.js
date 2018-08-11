import React from 'react';
import {
    BooleanField,
    Create,
    Datagrid,
    DateField,
    DateInput,
    Edit,
    EditButton,
    Filter,
    FormTab,
    List,
    LongTextInput,
    NullableBooleanInput,
    NumberField,
    ReferenceManyField,
    Responsive,
    TabbedForm,
    TextField,
    TextInput,
    SimpleForm
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/icons/Person';

const Title = ({ record = {} }) =>
    record ? <div>{record.name}</div> : null;

const listStyles = {
    nb_commands: { color: 'purple' },
};

const list = withStyles(listStyles)(({ classes, ...props }) => (
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
));

const editStyles = {
    first_name: { display: 'inline-block' },
    last_name: { display: 'inline-block', marginLeft: 32 },
    email: { width: 544 },
    address: { maxWidth: 544 },
    zipcode: { display: 'inline-block' },
    city: { display: 'inline-block', marginLeft: 32 },
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
};

const create = withStyles(editStyles)(({ classes, ...props }) => (
    <Create {...props}>
      <SimpleForm>
          <TextInput
              source="name"
              formClassName={classes.name}
          />
      </SimpleForm>
    </Create>
));

const edit = withStyles(editStyles)(({ classes, ...props }) => (
  <Edit title={<Title />} {...props}>
    <SimpleForm>
        <TextInput
            source="name"
            formClassName={classes.name}
        />
    </SimpleForm>
  </Edit>
));

export default {
  list,
  create,
  edit
}
