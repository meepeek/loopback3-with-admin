import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import { Form, Input, Icon, Row, Col, Button, Divider, Modal } from 'antd';
import Login from '../form/Login'
import Signup from '../form/Signup'

const FormItem = Form.Item;

@inject('auth')
@observer
export default class Auth extends React.Component {
  render() {
    const auth = this.props.auth
    return (
      <Modal style={{ top: 30 }} title="Sign Up or Login" visible={auth.state.visible} footer={null} maskClosable={true} onCancel={auth.toggleVisible} >
        <Row type="flex" justify="space-around" align="middle">
          <Col span={22}>
            <Button block>Continue with Facebook</Button>
            <Divider>Or</Divider>
              <div className={auth.state.showSignup ? '' : 'hidden'}>
                <Row type="flex" justify="space-around" align="middle">
                  <div>Already have account ?</div>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                  <a href="#" onClick={auth.toggleShowSignup}>Sign in</a>
                </Row>
              </div>

              <div className={!auth.state.showSignup ? '' : 'hidden'}>
                <Login />
                <Row type="flex" justify="space-around" align="middle">
                  <div>Not a member ?</div>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                  <a href="#" onClick={auth.toggleShowSignup}>Sign up</a>
                </Row>
              </div>

              <div className={auth.state.showSignup ? '' : 'hidden'}>
                <Signup />
              </div>
          </Col>
        </Row>
      </Modal>
    );
  }
}
