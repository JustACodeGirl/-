import React, { PropTypes }  from 'react';
import styles from './detail.less';
import classnames from 'classnames'
import { Row, Col, Card, Icon, Table, Menu,Badge,Dropdown,Modal, Button } from 'antd';
import Videos from '../common/videos'

class ExpandedApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dataSource : props.dataSource
    }
  }

  render () {
    const dataSource = this.state.dataSource
    if (dataSource.length > 0 && dataSource[0].mediaType === 'IMAGE') {
      return <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
        <div className="custom-image">
          <img alt="example" width="100%" src={dataSource[0].mediaPath} onClick={this.showModal}/>
        </div>
        <div className="custom-card">
          <Modal visible={this.state.visible} footer={null}
                 onOk={this.handleOk} onCancel={this.handleCancel}>
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
    // dataSource = dataSource.concat(dataSource);
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
      mediaList: props.mediaList,
    }
  }
  expandedRowRender = (dataSource,record) => {
    if (record.children) {
      let children = record.children;
      return <ExpandedApp dataSource={children}/>
    }
  }
  onExpandedRowsChange = (dataSource,expandedRows)=>{
    if(expandedRows.length>0){
      this.state.getMedia(expandedRows[expandedRows.length-1], dataSource)
      this.setState({ expandedRowKeys: expandedRows });
    }
  }
  onExpandedChange = (dataSource,expanded,record) => {
    const recId = record.recId;
    this.state.getMedia(recId,dataSource)
    this.setState({ expandedRowKeys: [recId] });
  }

  render(){
    const {loading, columns, dataSource, mediaItem, mediaList, pagination, onPageChange,location,rowSelection,isMotion} = this.props;
    for(let i=0; i<dataSource.length; i++){
      dataSource[i].createTime =new Date(dataSource[i].createTime).format("yyyy-MM-dd hh:mm:ss").toString();
    };
    return <span>
        <Table
          className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
          bordered
          scroll={{ x: 900 }}
          columns={columns}
          dataSource={dataSource}
          rowSelection={rowSelection}
          expandedRowRender = {this.expandedRowRender.bind(this,this.props.dataSource)}
          expandedRowKeys = {this.state.expandedRowKeys}
          onExpandedRowsChange={this.onExpandedRowsChange.bind(this,this.props.dataSource)}
          //onExpand = {this.onExpandedChange.bind(this,this.props.dataSource)}
          loading={loading}
          onChange={onPageChange}
          pagination={pagination}
          simple
          rowKey={record => record.recId}>
        </Table>
    </span>
  }
}

BaseInfo.propTypes = {

};

export default BaseInfo
