import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Link } from 'react-router-dom';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker, Radio } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@Form.create()
export default class Signup extends React.Component {

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form>
      <FormItem
        label="Name"
      >
        {getFieldDecorator('signup.name', {
          rules: [{
            required: true, message: 'Your name is required',
          }, {
            validator: this.validateToNextPassword,
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
          }, {
            validator: this.validateToNextPassword,
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
              required: true, message: 'Your email is required for login',
            }, {
              validator: this.validateToNextPassword,
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
        <Button block type="primary">Submit</Button>

      </Form>
    );
  }
}
