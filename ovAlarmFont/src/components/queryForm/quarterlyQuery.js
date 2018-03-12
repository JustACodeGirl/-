import React, { PropTypes } from 'react'
import { Form, Radio, Row, Col, Select, Button } from 'antd'
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

const quarterlyQuery = ({
    quarterlyData,
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
          date.push(date[i])
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
        data.selectDate = handleData(['all'], quarterlyData.bucketDate)
      }else{
        data.selectDate = handleData(data.bucketDate.value, quarterlyData.bucketDate)
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
  const selectInputDate = {}
  if (JSON.stringify(quarterlyData) !== '{}') {
    const fcstWeeks = quarterlyData.fcstWeekDate.data ? quarterlyData.fcstWeekDate.data : [quarterlyData.fcstWeekDate]
    for (let i = 0; i < fcstWeeks.length; i++) {
      children.push(<Option key={fcstWeeks[i]}>{fcstWeeks[i]}</Option>)
    }
    selectInputDate.bucketDate = quarterlyData.bucketDate ? quarterlyData.bucketDate : []
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
        <FormItem hasFeedback {...formItemLayout} style={{ width: 700 }}>
          {getFieldDecorator('bucketDate', {

          })(
            <SelectInput {...selectInputDate}  />
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

quarterlyQuery.propTypes = {
  form: PropTypes.object.isRequired,
  quarterlyData: PropTypes.object,
  onCancel: PropTypes.func,
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
}

export default Form.create()(quarterlyQuery)
