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
  children=[],
  roleList={},
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
    title: '编辑用户',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    width: 600
  };
  for (let i = 0; i < roleList.length; i++) {
    children.push(<Option key={roleList[i].id}>{roleList[i].roleName}</Option>);
  }
  const handleChange= (value)=> {

  }
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="用户编码：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('userCode', {
            initialValue: item.userCode,
            rules: [
              {
                required: true,
                message: '用户编码未填写',
              },
            ],
          })(<Input/>)}
        </FormItem>
        <FormItem label="用户名称：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('userName', {
            initialValue: item.userName,
            rules: [
              {
                required: true,
                message: '用户名称未填写',
              },
            ],
          })(<Input/>)}
        </FormItem>
        <FormItem label="岗位：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('roleId', {
            initialValue: item.roleName,
            rules: [
              {
                required: true,
                message: '',
              },
            ],
          })
          (<Select   style={{width:300}}
                      initialValue="item.roleId"
                      onChange={handleChange}
                      style={{ width: 380 }}
                      ref=""
              >
              {children}
            </Select>
          )}
        </FormItem>
        <FormItem label="电话号码：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: item.phone,
            rules: [
              {
                required: true,
                message: '电话号码未填写',
              },
            ],
          })(<Input/>)}
        </FormItem>
        <div style={{display:"none"}}>
          <FormItem label="旧密码：" hasFeedback {...formItemLayout}>
            {getFieldDecorator('password', {
              initialValue: item.password,
              rules: [
                {
                  required: false,
                  message: '',
                },
              ],
            })(<Input/>)}
          </FormItem>
          <FormItem label="新密码：" hasFeedback {...formItemLayout}>
            {getFieldDecorator('newPassword', {
              initialValue: item.newPassword,
              rules: [
                {
                  required: false,
                  message: '',
                },
              ],
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
