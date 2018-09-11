import React, { Component } from 'react';
import { Form, Radio } from 'antd';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default (props) => {
  const {label, store, icon, type, field} = props
  const {state, value, update} = store
  return (
    <FormItem
      label={label}
      validateStatus={state[field].validateStatus}
      help={state[field].help}
    >
      <RadioGroup
        value={value[field]}
        onChange={e => {update(field, e.target.value)}}
      >
        {props.radioOptions.props.children}
      </RadioGroup>
    </FormItem>
  )
}
