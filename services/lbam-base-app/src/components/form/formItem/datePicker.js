import React, { Component } from 'react';
import { Form, DatePicker } from 'antd';
import moment from 'moment'

const FormItem = Form.Item;

export default (props) => {
  const {label, store, icon, type, field} = props
  const {state, value, update} = store
  return (
    <FormItem
      label={label}
      validateStatus={state[field].validateStatus}
      help={state[field].help}
    >
      <DatePicker format="D MMM YYYY"
        value={value[field] ? moment(value[field], "D MMM YYYY") : null}
        onChange={(dateMoment, dateString) => update(field, dateString)}
      />
    </FormItem>
  )
}
