import React, { PropTypes } from 'react'
import { Form, Input, Radio, Row, Col, Select, Button } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
}

const formQuery = ({
    queryData,
    form: {
      getFieldDecorator,
      validateFields,
      getFieldsValue,
    },
    onSearch,
    onExport,
}) => {
  function handleOk (e) {
    e.preventDefault()
    validateFields((errors) => {
      if (errors) {
        return
      }
      let data = {
        ...getFieldsValue(),
      }
      for (let i in data) {
        if (data[i] === undefined) {
          data[i] = ''
        }
      }
      const params = Object.assign({}, data, { pageNo: 1, pageSize: 10 })
      onSearch(params)
    })
  }

  function exportTable () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      let data = {
        ...getFieldsValue(),
      }
      for (let i in data) {
        if (data[i] === undefined) {
          data[i] = ''
        }
      }
      const params = Object.assign({}, data)
      onExport(params)
    })

  }

  const customers = []
  const managers = []
  const forecasts = []
  if (JSON.stringify(queryData) !== '{}') {
    const fcstWeeks = queryData.fcstWeekDate.data ? queryData.fcstWeekDate.data : [queryData.fcstWeekDate]
    for (let i = 0; i < fcstWeeks.length; i++) {
      forecasts.push(<Option key={fcstWeeks[i]}>{fcstWeeks[i]}</Option>)
    }
    const customer = queryData.customer.data ? queryData.customer.data : [queryData.customer]
    customers.push(<Option key=" ">全部</Option>)
    for (let i = 0; i < customer.length; i++) {
      customers.push(<Option key={customer[i]}>{customer[i]}</Option>)
    }
    const accountmanagers = queryData.accountmanager.data ? queryData.accountmanager.data : [queryData.accountmanager]
    managers.push(<Option key=" ">全部</Option>)
    for (let j = 0; j < accountmanagers.length; j++) {
      managers.push(<Option key={accountmanagers[j]}>{accountmanagers[j]}</Option>)
    }
  }

  return (
    <Form layout="inline" onSubmit={handleOk}>
      <Row gutter={16}>
        <FormItem hasFeedback {...formItemLayout}>
          {getFieldDecorator('fcstWeek', {
            rules: [{
              required: true, message: '请选择一个日期!',
            }],
          })(
            <Select placeholder="Select Forecast Week" style={{ width: 200 }}>
              {forecasts}
            </Select>)}
        </FormItem>
        <FormItem hasFeedback {...formItemLayout}>
          {getFieldDecorator('region', {})(
            <Select placeholder="Select Region" style={{ width: 200 }}>
              <Option value="">全选</Option>
              <Option value="PM">PM</Option>
              <Option value="Sales">Sales</Option>
            </Select>)}
        </FormItem>
        <FormItem hasFeedback {...formItemLayout}>
          {getFieldDecorator('customer', {})(
            <Select placeholder="Select Customer" style={{ width: 200 }}>
              {customers}
            </Select>)}
        </FormItem>
        <FormItem hasFeedback {...formItemLayout}>
          {getFieldDecorator('accountManager', {})(
            <Select placeholder="Select Account Manager" style={{ width: 200 }}>
              {managers}
            </Select>)}
        </FormItem>
        <FormItem hasFeedback {...formItemLayout}>
          {getFieldDecorator('market', {})(
            <Select placeholder="Select Account Market" style={{ width: 200 }}>
              <Option value="">全选</Option>
              <Option value="Mobile">Mobile</Option>
              <Option value="Security">Security</Option>
              <Option value="Car">Car</Option>
              <Option value="Tablet">Tablet</Option>
              <Option value="Phone">Phone</Option>
            </Select>)}
        </FormItem>
        <FormItem>
          <Button type="primary"   htmlType="submit">Search</Button>
          <Button  onClick={exportTable} title="Export data and pivot table">Export</Button>
        </FormItem>
      </Row>
    </Form>
  )
}

formQuery.propTypes = {
  queryData: PropTypes.object,
  form: PropTypes.object.isRequired,
  onCancel: PropTypes.func,
  onSearch: PropTypes.func,
  onExport: PropTypes.func,
}

export default Form.create()(formQuery)
