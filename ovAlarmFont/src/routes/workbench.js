import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Modal, Button  } from 'antd';
import Detail from '../components/workbench/detail'
import RecActionModal from '../components/workbench/recActionModal'
import AcceptModal from '../components/workbench/acceptModal'

function Workbench ({ location, dispatch, workbench, loading }) {
  const {list, pagination, currentItem,dealOptionItem,actProcessData, modalVisible,modalAcceptVisible, modalType, selectedBoxType, currentMedial ,selectedRowKeys} = workbench;
  const { patientNo } = location.query;
  const DetailProps = {
    dataSource: list,
    mediaList: currentMedial,
    pagination,
    selectedRowKeys,
    selectedBoxType,
    location,
    mediaItem(id, datasource,boxType) {
      dispatch({
        type: 'workbench/mediaInfo',
        payload: {
          id: id,
          datasource: datasource,
          boxType: boxType
        },
      });
    },
    queryItem(boxType) {
      dispatch({
        type: 'workbench/query',
        payload: {
          index:0,
          count:10,
          boxType: boxType
        },
      });
    },
    onPageChange (page) {
      const { query, pathname } = location;
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          index: (page.current-1)*page.pageSize,
          page: page.current,
          count: page.pageSize,
          boxType: selectedBoxType,
        },
      }))
    },
    recsDetailItem (recId,dealType,boxType,dealOpinion) {
      dispatch({
        type: 'workbench/recsDeal',
        payload: {
          recId:recId,
          dealType:dealType,
          boxType:boxType,
          dealOpinion:dealOpinion,
        }
      })
    },
    recsActProcess (recId) {
      dispatch({
        type: 'workbench/recsActProcess',
        payload: recId,
      })
    },

    rowSelection: {
      list,
      selectedRowKeys,
      onChange: (selectedRowKeys) => {
        dispatch({
          type: 'workbench/selectRowKeys',
          payload: selectedRowKeys,
        })
      }
    },
    rowClickItem(selectRecId){
        dispatch({
          type: 'workbench/selectRowKeys',
          payload: [selectRecId],
        })
    },
    columns:[
      { title: '案件单号', dataIndex: 'taskNum', key: 'taskNum' },
      { title: '门铃账号', dataIndex: 'callerAccount', key: 'callerAccount' },
      { title: '报警人姓名', dataIndex: 'callerName', key: 'callerName' },
      { title: '报警人电话', dataIndex: 'callerPhone', key: 'callerPhone' },
      { title: '报警人地址', dataIndex: 'callerAddress', key: 'callerAddress' },
      { title: '报警人描述', dataIndex: 'callerDesc', key: 'callerDesc' },
      { title: '案件状态', dataIndex: 'state', key: 'state' },
      { title: '报警时间', dataIndex: 'createTime', key: 'createTime' },
    ],
  };
  const recActionModalProps = {
    visible: modalVisible === 1,
    item : actProcessData,
    onCancel () {
      dispatch({
        type: 'workbench/hideModal',
      })
    },
  };
  const acceptModalProps = {
    item: dealOptionItem,
    visible: modalAcceptVisible === 1,
    onOk (data) {
      dispatch({
        type: 'workbench/dealOption',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'workbench/hideAcceptModal',
      })
    },
  };
  const RecActionModalGen = () =>
    <RecActionModal {...recActionModalProps} />
  const AcceptModalGen = () =>
    <AcceptModal {...acceptModalProps} />
  return (
    <div className="content-inner">
      <Detail {...DetailProps}/>
      <RecActionModalGen/>
      <AcceptModalGen/>
    </div>
  )
}

Workbench.propTypes = {
  workbench: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
};

export default connect(({ workbench, loading }) => ({ workbench, loading: loading.models.workbench }))(Workbench)
