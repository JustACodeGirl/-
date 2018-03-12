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
      const vedioProps = dataSource[0]
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
      dataSource: props.dataSource,
      hasBorder: false,
      expandedRowKeys: [],
      getMedia: props.mediaItem,
      mediaList: props.mediaList,
    }
  }
  expandedRowRender = (record, index) => {
    // this.state.getMedia(record.recId, this.state.dataSource)
    let children = record.children;
    if (record.children) {
      return <ExpandedApp dataSource={children}/>
    }
  }

  onExpandedChange = (record, index) => {
    this.state.getMedia(record[record.length-1], this.state.dataSource)
    this.setState({ expandedRowKeys: record });
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
          expandedRowRender = {this.expandedRowRender}
          expandedRowKeys = {this.state.expandedRowKeys}
          onExpandedRowsChange = {this.onExpandedChange}
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
