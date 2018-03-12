import React, { PropTypes } from 'react'
import { Form, Input, Modal, Select } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const modal = ({
  visible,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    },
  }) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
          ...getFieldsValue(),
      //id: item.id,
        };
      onOk(data)
    })
  }

  const dealType = item.dealType+"案件";
  const optionTitle = item.dealType+"意见："
  const message = item.dealType+"意见必须填写"
  const modalOpts = {
    title: dealType,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    width: 600
  };

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label={optionTitle} {...formItemLayout}>
          {getFieldDecorator('dealOpinion', {
            initialValue: item.dealOpinion,
            rules: [
              {
                required: true,
                message: message,
              },
            ],
          })(<Input type="textarea" rows={3}/>)}
        </FormItem>
        <div style={{display:"none"}}>
          <FormItem label="受理人：" hasFeedback {...formItemLayout}>
            {getFieldDecorator('dealType', {
              initialValue: item.dealType,
            })(<Input/>)}
          </FormItem>
          <FormItem label="案件ID：" hasFeedback {...formItemLayout}>
            {getFieldDecorator('recId', {
              initialValue: item.recId,
            })(<Input/>)}
          </FormItem>
          <FormItem label="案件类型：" hasFeedback {...formItemLayout}>
            {getFieldDecorator('boxType', {
              initialValue: item.boxType,
            })(<Input/>)}
          </FormItem>
        </div>
      </Form>
    </Modal>
  )
};

modal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  item: PropTypes.object,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
};

export default Form.create()(modal)













