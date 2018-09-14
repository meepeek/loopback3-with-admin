import React, { Component } from 'react';
import { Form, DatePicker } from 'antd';
import moment from 'moment'

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
      <DatePicker format="D MMM YYYY"
        value={data[field] ? moment(data[field], "D MMM YYYY") : null}
        onChange={(dateMoment, dateString) => update(field, dateString)}
      />
    </FormItem>
  )
}
