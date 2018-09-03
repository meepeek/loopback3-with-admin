import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import { Form, Input, Icon, Row, Col, Button } from 'antd';

const FormItem = Form.Item;

@inject('store')
@observer
@Form.create()
export default class Login extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formData = this.props.store.auth.formData
    const auth = this.props.store.auth
    return (
      <div>
        <Form className="login-form">
          <FormItem>
            {getFieldDecorator('lgoin.username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" onChange={e => auth.formUpdate('login', 'username', e.currentTarget.value)} />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('login.password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onChange={e => auth.formUpdate('login', 'password', e.currentTarget.value)} />
            )}
          </FormItem>
          <FormItem>
            <a className="login-form-forgot" href="">Forgot password</a><br/>
            <Button block type="primary" htmlType="submit" className="login-form-button" onClick={auth.login}>
              Login
            </Button><br/>
          </FormItem>
        </Form>
      </div>
    );
  }
}
