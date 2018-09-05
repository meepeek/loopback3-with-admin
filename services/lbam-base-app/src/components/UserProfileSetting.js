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
class UserProfileSetting extends React.Component {

  render() {
    const { getFieldDecorator } = this.props.form;

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    return (
      <Row type="flex" justify="space-around" align="middle">
        <Col xs={{span:22}} sm={{span:16}} md={{span:14}} lg={{span: 10}} xl={{span: 8}}>
          <Form>
            <h5>Basic Information</h5>
            <FormItem
              label="Name"
            >
              {getFieldDecorator('name', {
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
              {getFieldDecorator('surname', {
                rules: [{
                  required: true, message: 'Your surname is required',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="text" />
              )}
            </FormItem>
            <FormItem
              label="DatePicker"
            >
              {getFieldDecorator('birthdate', {
                  rules: [{ type: 'object', required: true, message: 'Birthdate is required' }],
                })(
                <DatePicker format="D MMM YYYY" />
              )}
            </FormItem>
            <FormItem
              label="Gender"
            >
              {getFieldDecorator('gender', {rules: [{required: true}]})(
                <RadioGroup>
                  <RadioButton value="male">Male</RadioButton>
                  <RadioButton value="female">Female</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
            <h5>Contact Information</h5>
            <FormItem
              label="Email"
            >
              {getFieldDecorator('email', {
                rules: [{
                  required: true, message: 'Your email is required for login',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="text" />
              )}
            </FormItem>

            <h5>Change Password</h5>
            <FormItem
              label="Password"
            >
              {getFieldDecorator('password', {
                rules: [{
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
              {getFieldDecorator('confirm', {
                rules: [{
                  message: 'Please confirm your password!',
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
              )}
            </FormItem>
            <FormItem
              label="Current Password"
            >
              {getFieldDecorator('currentPassword', {
                rules: [{
                  message: 'Please input the current password!',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="password" />
              )}
            </FormItem>
            <Button>Submit</Button> <Button>Reset</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default UserProfileSetting
