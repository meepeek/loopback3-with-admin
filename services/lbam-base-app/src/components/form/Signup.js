import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Link } from 'react-router-dom';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker, Radio } from 'antd';

import textInput from './formItem/textInput'
import datePicker from './formItem/datePicker'
import radioGroup from './formItem/radioGroup'


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@inject('formStore')
@observer
export default class Signup extends React.Component {
  render() {
    const store = this.props.formStore.signup
    const handleSubmit = (e) => {
      e.preventDefault();
      store.submit()
    }
    return (
      <div>
        <Form className="login-form" onSubmit={handleSubmit}>
          {textInput({label: 'Name', field: 'name', store})}
          {textInput({label: 'Surname', field: 'surname', store})}
          <Row gutter={16}>
            <Col span={12}>{datePicker({label:'Birthdate', field: 'birthdate', store})}</Col>
            <Col span={12}>{radioGroup({label:'Gender', field: 'gender', store,
                radioOptions: (
                  <div>
                  <RadioButton value="male">Male</RadioButton>
                  <RadioButton value="female">Female</RadioButton>
                  </div>
                )
              })}</Col>
          </Row>
          {textInput({label: 'Email', field: 'email', icon: 'mail', store})}
          {textInput({label: 'Password', field: 'password', icon: 'lock', store, type: 'password'})}
          {textInput({label: 'Confirm Password', field: 'passwordConfirm', icon: 'lock', store, type: 'password'})}
          <FormItem>
            <a className="login-form-forgot" href="">Forgot password</a><br/>
            <Button block type="primary" className="login-form-button" htmlType="submit">
              Sign Up
            </Button><br/>
          </FormItem>
        </Form>
      </div>
    );
  }
}
