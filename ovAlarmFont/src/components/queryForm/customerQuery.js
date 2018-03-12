import React, { PropTypes } from 'react'
import { Form, Row, Select, Button } from 'antd'
import SelectInput from '../../components/common/selectInput'

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

const customerQuery = ({
    customerData,
    form: {
      getFieldDecorator,
      validateFields,
      getFieldsValue,
      setFieldsValue,
    },
    onSearch,
    onSelect,
}) => {
  function handleData (date, bucketDate) {
    const dates = []
    if (date[0] === 'all') {
      bucketDate.forEach((item) => {
        item.children.forEach((v) => {
          dates.push(v.value)
        })
      })
    } else {
      for (let i = 0; i < date.length; i++) {
        let temp = false
        bucketDate.forEach((v) => {
          if (date[i] === v.value) {
            temp = true
            v.children.forEach((item) => {
              dates.push(item.value)
            })
          }
        })
        if (!temp) {
          dates.push(date[i])
        }
      }
    }
    return dates
  }

  function handleOk (e) {
    e.preventDefault()
    validateFields((errors) => {
      if (errors) {
        return
      }
      let data = {
        ...getFieldsValue(),
      }
      if(data.bucketDate === undefined  || data.bucketDate.value.length == 0){
        data.selectDate = handleData(['all'], customerData.bucketDate)
      }else{
        data.selectDate = handleData(data.bucketDate.value, customerData.bucketDate)
      }
      onSearch(data)
    })
  }

  function handleReset () {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
  }

  const children = []
  const managers = []
  const selectInputDate = {}
  if (JSON.stringify(customerData) !== '{}') {
    const fcstWeeks = customerData.fcstWeekDate.data ? customerData.fcstWeekDate.data : [customerData.fcstWeekDate]
    for (let i = 0; i < fcstWeeks.length; i++) {
      children.push(<Option key={fcstWeeks[i]}>{fcstWeeks[i]}</Option>)
    }
    const accountmanagers = customerData.accountmanager.data ? customerData.accountmanager.data : [customerData.accountmanager]
    managers.push(<Option key=" ">全部</Option>)
    for (let j = 0; j < accountmanagers.length; j++) {
      managers.push(<Option key={accountmanagers[j]}>{accountmanagers[j]}</Option>)
    }
    selectInputDate.bucketDate = customerData.bucketDate ? customerData.bucketDate : []
  }
  return (
    <Form layout="inline" onSubmit={handleOk}>
      <Row gutter={16}>
        <FormItem hasFeedback {...formItemLayout}>
          {getFieldDecorator('forecast', {
            rules: [{
              required: true, message: '请选择一个日期!',
            }],
          })(
            <Select style={{ width: 150 }} onChange={onSelect} placeholder="Forecast Week">
              {children}
            </Select>
          )}
        </FormItem>
        <FormItem hasFeedback {...formItemLayout} >
          {getFieldDecorator('bucketDate', {
           })(
            <SelectInput {...selectInputDate} />
          )}
        </FormItem>
        <FormItem hasFeedback {...formItemLayout}>
          {getFieldDecorator('confidencelevel', {})(
            <Select style={{ width: 150 }} placeholder="Confidence Level">
              <Option value=" ">全选</Option>
              <Option value="BASE">BASE</Option>
              <Option value="UPSIDE">UPSIDE</Option>
            </Select>
          )}
        </FormItem>
        <FormItem hasFeedback {...formItemLayout}>
          {getFieldDecorator('region', {})(
            <Select style={{ width: 150 }} placeholder="Region">
              <Option value="">全选</Option>
              <Option value="PM">PM</Option>
              <Option value="Sales">SALES</Option>
            </Select>
          )}
        </FormItem>
        <FormItem hasFeedback {...formItemLayout}>
          {getFieldDecorator('accountmanager', {})(
            <Select style={{ width: 150 }} placeholder="Account Manager">
              {managers}
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="margin-right">Search</Button>
          <Button onClick={handleReset}>Reset</Button>
        </FormItem>
      </Row>
    </Form>
  )
}

customerQuery.propTypes = {
  form: PropTypes.object.isRequired,
  customerData: PropTypes.object,
  onCancel: PropTypes.func,
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
}

export default Form.create()(customerQuery)
