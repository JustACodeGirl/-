import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import styles from './search.less'
import { Input, Row, Col, Button, Icon, Modal, message } from 'antd'

class Search extends React.Component {
  state = {
    clearVisible: false
  };

  handleInputChange = e => {
    this.setState({
      ...this.state,
      clearVisible: e.target.value !== '',
    })
  };


  handleDelete = () => {
    const selectedRowKeys = this.props.selectedRowKeys;
    const onDeleteItems = this.props.onDeleteItems;
    if(selectedRowKeys.length === 0) return message.warn('请选择一条记录', 2);
    else if(selectedRowKeys.length>1) return message.warn('只能选择一条记录', 2);
    Modal.confirm({
      title: '确定要删除当前选中的岗位信息吗?',
      content: '点击确定后，信息删除。',
      onOk() {
        onDeleteItems(selectedRowKeys);
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => {});
      },
      onCancel() {},
    });
  };
//<Button size="large" type="danger" icon="delete" disabled={this.props.selectedRowKeys.length === 0} onClick={this.handleDelete}>删除</Button>
  render () {
    const { clearVisible } = this.state;
    return (
      <Row gutter={24}>
        <Col lg={8} md={10} sm={10} xs={24} style={{ marginBottom: 16}}>
          <Button size="large" type="primary" icon="plus-circle-o" onClick={this.props.onAdd}>添加</Button>&nbsp;
        </Col>
      </Row>
    )
  }
}

Search.propTypes = {
  selectedRowKeys: PropTypes.array,
  onAdd: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onSearch: PropTypes.func,
  onReload: PropTypes.func,
};

export default Search
