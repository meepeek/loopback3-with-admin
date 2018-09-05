import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import { Form, Input, Icon, Row, Col, Button } from 'antd';

const FormItem = Form.Item;

@inject('store')
@observer
@Form.create()
export default class Login extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let payload = values.login
        payload.username = payload.email
        this.props.store.auth.login(payload)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formData = this.props.store.auth.formData
    const auth = this.props.store.auth
    return (
      <div>
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('login.email', {
              rules: [
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'The input is not valid E-mail!' }
            ]
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('login.password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <a className="login-form-forgot" href="">Forgot password</a><br/>
            <Button block type="primary" className="login-form-button" htmlType="submit">
              Login
            </Button><br/>
          </FormItem>
        </Form>
      </div>
    );
  }
}
