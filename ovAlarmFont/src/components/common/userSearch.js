import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import styles from './search.less'
import { Input, Row, Col, Button, Icon, Modal, message,Select  } from 'antd'
const Option = Select.Option;

const children = [];
class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {             //控制display的值来隐藏与显示
      clearVisible: false,
      selectedRecId:10,
    }
  };
   handleChange= (value)=> {
     this.setState({
       selectedRecId: value,
     })
  }
  handleSearch = (value) => {
    const onSearch = this.props.onSearch;
    onSearch(this.state.selectedRecId);
  };

  handleInputChange = e => {
    this.setState({
      ...this.state,
      clearVisible: e.target.value !== '',
    })
  };

  handleClearInput = () => {
    const onSearch = this.props.onSearch;
    //console.log(ReactDOM.findDOMNode(this.refs.searchInput));
    //console.log(ReactDOM.findDOMNode(this.refs.searchInput).value);
    ReactDOM.findDOMNode(this.refs.searchInput).value = '';
    this.setState({
      clearVisible: false,
    });
    onSearch()
  };
  render () {
    const { clearVisible } = this.state;
    const { roleList } = this.props;
  for (let i = 0; i < this.props.roleList.length; i++) {
    children.push(
      <Option key={this.props.roleList[i].id}>{this.props.roleList[i].roleName}</Option>
    );
  }
  return (
      <Row gutter={24}>
        <Col lg={8} md={10} sm={10} xs={24} style={{ marginBottom: 16}}>
          <Button size="large" type="primary" icon="plus-circle-o" onClick={this.props.onAdd}>添加</Button>&nbsp;
        </Col>
        <Col lg={{ offset: 6, span: 10 }} md={14} sm={14} xs={24} style={{ marginBottom: 16, textAlign: 'right' }}>
            <Select
              defaultValue="请选择岗位"
              onChange={this.handleChange}
              style={{ width: 200 }}
              ref="searchInput"
              >
              {children}
            </Select>
            <Button size="large" type="primary" onClick={this.handleSearch.bind(this)}>搜索</Button>
            {clearVisible && <Icon type="cross" onClick={this.handleClearInput} />}
            <Button size="large" icon="reload" style={{marginLeft: 4, borderRadius: 3}} onClick={this.handleClearInput}>刷新</Button>
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
