import React, { Component } from 'react';
import { Form, Upload, Icon } from 'antd';

const FormItem = Form.Item;

export default (props) => {
  const {label, store, icon, type, field} = props
  const {state, data, update, beforeUpload} = store
  const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
  return (
    <FormItem
      label={label}
      validateStatus={state[field].validateStatus}
      help={state[field].help}
    >
      <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="//jsonplaceholder.typicode.com/posts/"
            fileList= {data.fileList}
            beforeUpload={beforeUpload}
            onChange={ (file, fileList, e) => { this.update(field, fileList) } }
          >
        {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    </FormItem>
  )
}
