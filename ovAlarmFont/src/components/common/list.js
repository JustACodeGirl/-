import React, { PropTypes } from 'react'
import { Table, Modal,Card } from 'antd'
import styles from './list.less'
import classnames from 'classnames'
import TableBodyWrapper from './TableBodyWrapper'

const confirm = Modal.confirm;

class list extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource:this.props.list,
    };
  };
  render () {
    const {loading, dataSource, pagination, onPageChange, rowSelection, isMotion, location, columns } = this.props;
    return (
      <div>
        <Table
          className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
          bordered
          scroll={{ x: 900 }}
          //rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          onChange={onPageChange}
          pagination={pagination}
          simple
          rowKey={record => record.id}
          />
      </div>
    )
  }
}
list.propTypes = {
};

export default list

