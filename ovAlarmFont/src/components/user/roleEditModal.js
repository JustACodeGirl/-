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
        id: item.id,
        };
      onOk(data)
    })
  }

  const modalOpts = {
    title: '编辑岗位',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    width: 600
  };
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="岗位名称：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('roleName', {
            initialValue: item.roleName,
            rules: [
              {
                required: true,
                message: '岗位名称未填写',
              },
            ],
          })(<Input/>)}
        </FormItem>
        <FormItem label="岗位描述：" {...formItemLayout}>
          {getFieldDecorator('roleDesc', {
            initialValue: item.roleDesc,
          })(<Input type="textarea" rows={3}/>)}
        </FormItem>
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
