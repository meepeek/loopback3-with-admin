import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import { Form, Input, Icon, Row, Col, Button, Spin } from 'antd';

import textInput from './formItem/textInput'

const FormItem = Form.Item;

@inject('formStore')
@observer
export default class Login extends React.Component {
  render() {
    const store = this.props.formStore.login
    const handleSubmit = (e) => {
      e.preventDefault();
      store.submit()
    }
    return (
      <div>
        <Spin tip="Loading..." spinning={store.state.wait}>

          <Form className="login-form" onSubmit={handleSubmit}>
            {textInput({label: 'Email', field: 'email', icon: 'mail', store})}
            {textInput({label: 'Password', field: 'password', icon: 'lock', store, type: 'password'})}
            <FormItem>
              <a className="login-form-forgot" href="">Forgot password</a><br/>
              <Button block type="primary" className="login-form-button" htmlType="submit">
                Login
              </Button><br/>
            </FormItem>
          </Form>

        </Spin>
      </div>
    );
  }
}
