import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Link } from 'react-router-dom';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker, Radio } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@inject('store')
@observer
@Form.create()
export default class Signup extends React.Component {
  state = {
    confirmDirty: false
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['signup.confirm'], { force: true });
    }
    callback();
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('signup.password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let payload = values.signup
        payload.birthdate = payload.birthdate.format('YYYY-MM-DD')
        this.props.store.auth.signup(payload)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const auth = this.props.store.auth
    const formData = this.props.store.auth.formData

    return (
      <Form onSubmit={this.handleSubmit}>
      <FormItem
        label="Name"
      >
        {getFieldDecorator('signup.name', {
          rules: [{
            required: true, message: 'Your name is required',
          }],
        })(
          <Input type="text" />
        )}
      </FormItem>
      <FormItem
        label="Surname"
      >
        {getFieldDecorator('signup.surname', {
          rules: [{
            required: true, message: 'Your surname is required',
          }],
        })(
          <Input type="text" />
        )}
      </FormItem>

      <Row gutter={16}>
        <Col span={12}>
          <FormItem
            label="Birthdate"
          >
            {getFieldDecorator('signup.birthdate', {
                rules: [{ type: 'object', required: true, message: 'Birthdate is required' }],
              })(
              <DatePicker format="D MMM YYYY" />
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label="Gender"
          >
            {getFieldDecorator('signup.gender', {rules: [{required: true}]})(
              <RadioGroup>
                <RadioButton value="male">Male</RadioButton>
                <RadioButton value="female">Female</RadioButton>
              </RadioGroup>
            )}
          </FormItem>
        </Col>
      </Row>
        <FormItem
          label="Email"
        >
          {getFieldDecorator('signup.email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!'
            },{
              required: true, message: 'Your email is required for login',
            }],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label="Password"
        >
          {getFieldDecorator('signup.password', {
            rules: [{
              required: true,
              message: 'Please input new password!',
            }, {
              min: 5, max: 40,
              message: 'Password length must be 5-40 characters'
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          label="Confirm Password"
        >
          {getFieldDecorator('signup.confirm', {
            rules: [{
              required: true,
              message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <Button block type="primary" htmlType="submit" >Submit</Button>

      </Form>
    );
  }
}
