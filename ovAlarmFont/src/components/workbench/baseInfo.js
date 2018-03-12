import React, { PropTypes }  from 'react';
import classnames from 'classnames'
import { Row, Col, Card, Icon, Table, Menu,Badge,Dropdown,Modal, Button } from 'antd';
import Videos from '../common/videos'
import styles from './detail.less';

class ExpandedApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dataSource : props.dataSource,
      flag : true,
      visible :false,
    }
  };
  showModal = ()=> {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  render () {
    const dataSource = this.state.dataSource
    if (dataSource.length > 0 && dataSource[0].mediaType === 'IMAGE') {
      return <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
        <div className="custom-image">
          <img alt="example" width="100%" src={dataSource[0].mediaPath} onClick={this.showModal}/>
        </div>
        <div className="custom-card">
          <Modal title="  " footer = {null}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            >
            <img alt="example" width="100%" src={dataSource[0].mediaPath} />
          </Modal>
        </div>
      </Card>
    } else if (dataSource.length > 0) {
      const vedioProps = dataSource[0];
      return <Card style={{ width: 400, heigth: 350 }} bodyStyle={{ padding: 0 }}>
        <Videos {...vedioProps} />
      </Card>
    }
  }
  load() {
    let {dataSource} = this.state
    this.setState({ dataSource })
  }
}

const render = (value, index, record) => {
  return <a>Remove({record.id})</a>;
}


class BaseInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: [],
      hasBorder: false,
      expandedRowKeys: [],
      getMedia: props.mediaItem,
      rowClick: props.rowClickItem,
      mediaList: props.mediaList,
    }
  }
  onRowClick = (record,index) => {
    console.log(index);
    console.log(record);
    var tr = document.getElementsByTagName("tr");
    for(var i=0;i<tr.length;i++){
      tr[i].style.backgroundColor = '#fff';
    }
    var trIndex = tr[index+1];
    trIndex.style.backgroundColor = '#7bb6d8';
    const selectRecId = record.recId;
    this.state.rowClick(selectRecId);
  };
  expandedRowRender = (record) => {
    if (record.children) {
      let children = record.children;
      return <ExpandedApp dataSource={children}/>
    }
  };
  onExpandedRowsChange = (dataSource,expandedRows)=>{
    if(expandedRows.length>0){
      const selectedexpandedRowkey = dataSource[expandedRows[expandedRows.length-1]].recId;
      this.state.getMedia(selectedexpandedRowkey, dataSource,this.props.selectedBoxType)
    }
    this.setState({ expandedRowKeys: expandedRows });
  }
  render(){
    const {loading, columns, dataSource, mediaItem, mediaList, rowClickItem,pagination, onPageChange,location,rowSelection,isMotion,selectedBoxType} = this.props;
    for(let i=0; i<dataSource.length; i++){
      dataSource[i].createTime =new Date(dataSource[i].createTime).format("yyyy-MM-dd hh:mm:ss").toString();
      dataSource[i].key = i;
    };
    return <span >
        <Table id="table"
          className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
          bordered
          scroll={{ x: 900 }}
          columns={columns}
          dataSource={dataSource}
          //rowSelection={rowSelection}
          onRowClick = {this.onRowClick}
          expandedRowRender = {this.expandedRowRender}
          expandedRowKeys = {this.state.expandedRowKeys}
          onExpandedRowsChange={this.onExpandedRowsChange.bind(this,this.props.dataSource)}
          loading={loading}
          onChange={onPageChange}
          pagination={pagination}
          rowKey={record => record.key}
          >
        </Table>

    </span>
  }
}

BaseInfo.propTypes = {
};

export default BaseInfo
