import React, { PropTypes }  from 'react';
import { Tabs, Icon, Button,Modal,message  } from 'antd';
import styles from './detail.less'
import BaseInfo from './baseInfo';
import Case from './case';
import Operation from './operation';
import Inspect from './inspect';
const TabPane = Tabs.TabPane;

class Detail extends React.Component {
  constructor(props){
    super(props);
    this.state = {             //控制display的值来隐藏与显示
      todoProps:{display: 'inline'},
      doingProps:{display: 'none'},
      handledProps:{display: 'none'},
      hangupProps:{display: 'none'},
    }
  };
  showRecsActProcess = () => {
    const recsActProcess = this.props.recsActProcess;
    const selectedRowKeys = this.props.selectedRowKeys;
    const dataSource = this.props.dataSource;
    recsActProcess(selectedRowKeys[0]);
  }
  showCashModal = (dealType,event) => {
    const recsDetailItem = this.props.recsDetailItem;
    const selectedRowKeys = this.props.selectedRowKeys;
    const dataSource = this.props.dataSource;
    recsDetailItem(selectedRowKeys[0],dealType,this.props.selectedBoxType);
  };

  render () {
    const {dataSource, columns, mediaItem,rowClickItem, mediaList, queryItem, pagination, onPageChange, location, selectedRowKeys, modalVisible,selectedBoxType} = this.props;
    const callback = (key) => {
      var tr = document.getElementsByTagName("tr");
      for(var i=0;i<tr.length;i++){
        tr[i].style.backgroundColor = '#fff';
      }
      queryItem(key);
      if(key=='TODO'){
        this.setState({
          todoProps:{display: 'inline'},
          doingProps:{display: 'none'},
          handledProps:{display: 'none'},
          hangupProps:{display: 'none'},
        })
      }else if(key=='DOING'){
        this.setState({
          todoProps:{display: 'none'},
          doingProps:{display: 'inline'},
          handledProps:{display: 'none'},
          hangupProps:{display: 'none'},
        })
      }else if(key=='HANDLED'){
        this.setState({
          todoProps:{display: 'none'},
          doingProps:{display: 'none'},
          handledProps:{display: 'inline'},
          hangupProps:{display: 'none'},
        })
      }else if(key=='HANGUP'){
        this.setState({
          todoProps:{display: 'none'},
          doingProps:{display: 'none'},
          handledProps:{display: 'none'},
          hangupProps:{display: 'inline'},
        })
      }

    }
      return (
        <div>
          <div style={{float:"right", display:this.state.todoProps.display}}>
            <Button type="primary" disabled={this.props.selectedRowKeys.length === 0} onClick={this.showCashModal.bind(this,"受理")}>受理</Button>
            <Button type="primary" disabled={this.props.selectedRowKeys.length === 0} onClick={this.showCashModal.bind(this,"退回")}>退回</Button>
            <Button type="primary" disabled={this.props.selectedRowKeys.length === 0} onClick={this.showCashModal.bind(this,"作废")}>作废</Button>
            <Button type="primary" disabled={this.props.selectedRowKeys.length === 0} onClick={this.showRecsActProcess}>查看办理过程</Button>
          </div>
          <div style={{float:"right",display:this.state.doingProps.display }}>
            <Button type="primary" disabled={this.props.selectedRowKeys.length === 0} onClick={this.showCashModal.bind(this,"办结")}>办结</Button>
            <Button type="primary" disabled={this.props.selectedRowKeys.length === 0} onClick={this.showCashModal.bind(this,"退回")}>退回</Button>
            <Button type="primary" disabled={this.props.selectedRowKeys.length === 0} onClick={this.showCashModal.bind(this,"转交")}>转交</Button>
            <Button type="primary" disabled={this.props.selectedRowKeys.length === 0} onClick={this.showCashModal.bind(this,"挂起")}>挂起</Button>
            <Button type="primary" disabled={this.props.selectedRowKeys.length === 0} onClick={this.showCashModal.bind(this,"作废")}>作废</Button>
            <Button type="primary" disabled={this.props.selectedRowKeys.length === 0} onClick={this.showRecsActProcess}>查看办理过程</Button>
          </div>
          <div style={{float:"right",display:this.state.handledProps.display}}>
            <Button type="primary" disabled={this.props.selectedRowKeys.length === 0} onClick={this.showRecsActProcess}>查看办理过程</Button>
          </div>
          <div style={{float:"right",display:this.state.hangupProps.display }}>
            <Button type="primary" disabled={this.props.selectedRowKeys.length === 0} onClick={this.showCashModal.bind(this,"办结")}>办结</Button>
            <Button type="primary" disabled={this.props.selectedRowKeys.length === 0} onClick={this.showRecsActProcess}>查看办理过程</Button>
          </div>
          <Tabs className={styles.detail} defaultActiveKey="TODO" onChange={callback}>
            <TabPane tab={<span><Icon type="file" />待办案件</span>} key="TODO">
            </TabPane>
            <TabPane tab={<span><Icon type="file" />处理中案件</span>} key="DOING">
            </TabPane>
            <TabPane tab={<span><Icon type="file" />经办案件</span>} key="HANDLED">
            </TabPane>
            <TabPane tab={<span><Icon type="file" />挂起案件</span>} key="HANGUP">
            </TabPane>
          </Tabs>
          <BaseInfo {...this.props}/>
        </div>
      );
  }
}

Detail.propTypes = {
  selectedRowKeys: PropTypes.array,
};

export default Detail
