import React, { PropTypes } from 'react'
import { TreeSelect } from 'antd'

const SHOW_PARENT = TreeSelect.SHOW_PARENT

class SelectInput extends React.Component {
  state = {
    value: [''],
  }

  onChange = (value) => {
    this.setState({ value })
    this.triggerChange({ value })
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue))
    }
  }

  render () {
    const bucketDate = this.props.bucketDate

    const treeData = [{
      label: '全选',
      value: 'all',
      key: 'all',
      children: bucketDate,
    }]

    const show = []
    if (treeData[0].children) {
      treeData[0].children.forEach(item => {
        show.push(item.key)
      })
    }
    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChange,
      multiple: true,
      treeCheckable: true,
      defaultExpandedKeys: show,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Please Select BucketDate',
      style: {
        width: 400,
      },
    }
    return <TreeSelect {...tProps} />
  }
}

SelectInput.propTypes = {
  bucketDate: PropTypes.array,
  onChange: PropTypes.function,
}

export default SelectInput
