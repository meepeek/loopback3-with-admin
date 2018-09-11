import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import { Form, Input, Icon, Row, Col, Button, Spin, Divider } from 'antd';
import Login from '../form/Login'
import Signup from '../form/Signup'

const FormItem = Form.Item;

@inject('store')
@observer
export default class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.switch = false
  }
  toggle = () => {
    this.switch = !this.switch
  }
  render() {
    const auth = this.props.store.auth
    return (
      <Spin tip="Loading..." spinning={auth.status.wait}>
        <Row type="flex" justify="space-around" align="middle">
          <Col xs={{span:22}} sm={{span:16}} md={{span:14}} lg={{span: 10}} xl={{span: 8}}>
            <Button block>Continue with Facebook</Button>
            <Divider>Or</Divider>
              <div className={this.switch ? '' : 'hidden'}>
                <Row type="flex" justify="space-around" align="middle">
                  <div>Already have account ?</div>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                  <a href="#" onClick={this.toggle}>Sign in</a>
                </Row>
              </div>

              <div className={!this.switch ? '' : 'hidden'}>
                <Login />
                <Row type="flex" justify="space-around" align="middle">
                  <div>Not a member ?</div>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                  <a href="#" onClick={this.toggle}>Sign up</a>
                </Row>
              </div>

              <div className={this.switch ? '' : 'hidden'}>
                <Signup />
              </div>
          </Col>
        </Row>
      </Spin>
    );
  }
}
