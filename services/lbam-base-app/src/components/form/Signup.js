import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Link } from 'react-router-dom';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker, Radio, Upload } from 'antd';

import textInput from './formItem/textInput'
import datePicker from './formItem/datePicker'
import radioGroup from './formItem/radioGroup'


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

@inject('formStore')
@observer
export default class Signup extends React.Component {
  state = {
    loading: false,
    imageUrl: 'https://c1.staticflickr.com/6/5337/8940995208_5da979c52f.jpg'
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
      window.test = info
    }
  }
  render() {
    const store = this.props.formStore.signup
    const handleSubmit = (e) => {
      e.preventDefault();
      store.submit()
    }
    return (
      <div>
        <Form className="login-form" onSubmit={handleSubmit}>

          <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
            {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" /> : uploadButton}
          </Upload>

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
