import React, { PropTypes } from 'react'
import { Form, Input, Modal, Select ,Table} from 'antd'

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
        id: item.roleId,
        };
      onOk(data)
    })
  }

  const modalOpts = {
    title: '案件办理过程',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    width: 600
  };
  for(let i=0; i<item.length; i++){
    item[i].createTime =new Date(item[i].createTime).format("yyyy-MM-dd hh:mm:ss").toString();
  };
  const columns = [ {
    title: '办理人',
    dataIndex: 'userName',
    key: 'userName',
  }, {
    title: '岗位',
    dataIndex: 'roleName',
    key: 'roleName',
  },{
    title: '操作',
    dataIndex: 'dealType',
    key: 'dealType',
  },{
    title: '办理意见',
    dataIndex: 'dealOpinion',
    key: 'dealOpinion',
  },{
    title: '办理时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },];
  return (
    <Modal {...modalOpts} footer={null}>
      <Table dataSource={item} columns={columns} pagination={false} />
    </Modal>
  )
};

modal.propTypes = {
};

export default Form.create()(modal)
