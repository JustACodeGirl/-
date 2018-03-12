import React, { PropTypes } from 'react'
import { Form, Input, Modal } from 'antd'

const FormItem = Form.Item;

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
  type,
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

  const RoleAddModalGen = () =>
    <RoleAddModal {...roleAddModalProps} />
  const modalOpts = {
    title: `${type === 'create' ? '添加用户' : '编辑用户'}`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    width: 800
  };
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="描述：" {...formItemLayout}>
          {getFieldDecorator('desc', {
            initialValue: item.desc
          })(<Input type="textarea" rows={4}/>)}
        </FormItem>

      </Form>
    </Modal>
  )
};

modal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  type: PropTypes.string,
  item: PropTypes.object,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
};

export default Form.create()(modal)
