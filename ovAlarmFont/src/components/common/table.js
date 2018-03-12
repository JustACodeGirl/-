import React, { PropTypes } from 'react'
import { Table, Modal } from 'antd'
import styles from './list.less'
import classnames from 'classnames'

function table ({ loading, dataSource, columns, scroll }) {
  return (
    <div style={{ marginTop: 10 }}>
      <Table
        className={classnames({ [styles.table]: true })}
        bordered
        scroll={scroll}
        columns={columns}
        pagination={false}
        dataSource={dataSource}
        loading={loading}
        simple
        size="small"
        rowKey={record => record.id}
      />
    </div>
  )
}

table.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
  scroll: PropTypes.object,
  columns: PropTypes.array,
}

export default table
