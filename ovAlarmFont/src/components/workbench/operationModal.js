import React, { PropTypes } from 'react'
import { Form, Input, Button, Modal, Row, Col, Icon, Select } from 'antd'
import styles from './operationModal.less'

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const form2ItemLayout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    span: 20, offset: 4 ,
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
    getFieldValue,
    setFieldsValue,
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

  function add() {
    const injects = getFieldValue('injects');
    const nextInjects = injects.concat({id: injects.length+1, type: 1, count: 100});
    setFieldsValue({
      injects: nextInjects,
    });
  }

  function remove(id) {
    const paths = getFieldValue('injects');
    if (paths.length > 1) {
      setFieldsValue({
        injects: paths.filter(path => path.id !== id),
      });
    }
  }

  getFieldDecorator('injects', { initialValue: [{id: 1, type: 1, count: 100}] });
  const injects = getFieldValue('injects');
  const injectNodes = injects.map((inject, index) => {
    return (
      <Row key={index}>
        <Col span={12}>
          <FormItem label="输血类型：" hasFeedback {...formItemLayout}>
            {getFieldDecorator('type', {
              initialValue: (item.type || 1)+'',
            })(<Select>
              <Option value="1">悬浮洗涤红细胞</Option>
              <Option value="2">新鲜冰冻血浆</Option>
              <Option value="3">冷沉淀</Option>
              <Option value="4">血小板</Option>
            </Select>)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="输血量：" hasFeedback {...form2ItemLayout}>
            {getFieldDecorator('count', {
              initialValue: inject.count,
              rules: [
                {
                  required: true,
                  message: '输血量未填写',
                },
              ],
            })(<Input />)}
          </FormItem>
        </Col>
        <Col span={4}>
          {
            index !== 0 && <Icon
              className={styles.dynamicDeleteButton}
              type="minus-circle-o"
              onClick={() => remove(inject.id)}
            />
          }
        </Col>
      </Row>
    )
  });
  const modalOpts = {
    title: '编辑',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    width: 600
  };
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        {injectNodes}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={add} style={{ width: '40%' }} icon="plus">添加</Button>
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
