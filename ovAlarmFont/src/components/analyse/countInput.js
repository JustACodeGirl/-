import React, { PropTypes } from 'react'
import styles from './queryInput.less'
import { Select, Button } from 'antd'

class QueryInput extends React.Component {
  state = {
    clearVisible: false
  };

  render () {
    const { clearVisible } = this.state
    return (
      <div className={styles.query}>
        <Select
          showSearch
          style={{width: 200}}
          placeholder="CRF"
          optionFilterProp="children"
          filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >

        </Select>
        <Select
          showSearch
          style={{width: 200, marginLeft: 5}}
          placeholder="SECTION"
          optionFilterProp="children"
          filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >

        </Select>
        <Select
          showSearch
          style={{width: 200, marginLeft: 5}}
          placeholder="条目"
          optionFilterProp="children"
          filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >

        </Select>
        <Select
          showSearch
          style={{width: 100, marginLeft: 5}}
          placeholder=""
          optionFilterProp="children"
          filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >

        </Select>
        <Button type="danger" style={{float: 'right'}}>删除</Button>
        <Button type="primary" style={{float: 'right', marginRight: 5}}>添加</Button>
      </div>
    )
  }
}


QueryInput.propTypes = {
  selectedRowKeys: PropTypes.array,
  onAdd: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onSearch: PropTypes.func,
  onReload: PropTypes.func,
};

export default QueryInput
