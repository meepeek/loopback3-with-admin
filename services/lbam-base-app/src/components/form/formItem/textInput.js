import React, { Component } from 'react';
import { Form, Input, Icon, Row, Col, Button } from 'antd';

const FormItem = Form.Item;

export default (props) => {
  const {label, store, icon, type, field} = props
  const {state, data, update} = store
  return (
    <FormItem
      label={label}
      validateStatus={state[field].validateStatus}
      help={state[field].help}
    >
        <Input type={type} prefix={icon ? <Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} /> : ''} placeholder={label}
          value={data[field]}
          onChange={e => update(field, e.currentTarget.value)}
        />
    </FormItem>
  )
}
