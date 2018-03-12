/**
 * Created by leo on 2017/3/19.
 */
import React, {PropTypes} from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Select, Button, Tabs, Icon, Input} from 'antd'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts'
import QueryInput from '../components/analyse/queryInput'
import UserEditModal from '../components/analyse/recActionModal'
import QueryList from '../components/common/caselist'

function CaseQuery ({ location, dispatch, queryItem,loading }) {
  const { list, pagination, currentItem, modalVisible,actProcessData, modalType, selectedRowKeys,queryInfo,inputQuery,searchItem,currentMedial } = queryItem;
  const QueryInputProps = {
    inputQuery (data) {
      data.index=0;
      data.count=10;
      dispatch({
        type: 'queryItem/query',
        payload: data,
      })
    },
    onReload () {
      searchItem :{};
      dispatch({
        type: 'queryItem/query',
        payload: {
          index:0,
          count:10
        },
      })
    },
  }

  const userEditModalProps = {
    item: actProcessData,
    visible: modalVisible === 1,
    onCancel () {
      dispatch({
        type: 'queryItem/hideModal',
      })
    },
  };

  const recsActionItem = (item) => {
    dispatch({
      type: 'queryItem/recsActionModal',
      payload: item
    })
  };
  const adminListProps = {
    dataSource: list,
    mediaList: currentMedial,
    pagination,
    searchItem,
    location,
    mediaItem(id, datasource) {
      dispatch({
        type: 'queryItem/mediaInfo',
        payload: {
          id: id,
          datasource: datasource
        },
      });
    },
    onPageChange (page) {
      dispatch({
        type: 'queryItem/query',
        payload: {
          index: (page.current-1)*page.pageSize,
          page: page.current,
          count: page.pageSize,
          startTime:searchItem.startTime,
          endTime:searchItem.endTime,
          state:searchItem.state,
          keyword:searchItem.keyword,
        },
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'queryItem/delete',
        payload: id,
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (selectedRowKeys) => {
        dispatch({
          type: 'queryItem/selectRowKeys',
          payload: selectedRowKeys,
        })
      }
    },
    columns: [
      { title: '案件单号', dataIndex: 'taskNum', key: 'taskNum' },
      { title: '门铃账号', dataIndex: 'callerAccount', key: 'callerAccount' },
      { title: '报警人姓名', dataIndex: 'callerName', key: 'callerName' },
      { title: '报警人电话', dataIndex: 'callerPhone', key: 'callerPhone' },
      { title: '报警人地址', dataIndex: 'callerAddress', key: 'callerAddress' },
      { title: '报警人描述', dataIndex: 'callerDesc', key: 'callerDesc' },
      { title: '案件状态', dataIndex: 'state', key: 'state' },
      { title: '报警时间', dataIndex: 'createTime', key: 'createTime' },
      {title: '案件办理过程', key: 'operation', width: 150, render: (text, record) => (
        <span onClick={(e) => {e.stopPropagation()}}>
            <a onClick={() => {recsActionItem(record)}}>查看</a>
          </span>
      ),
      },
    ],
  };
  const UserEditModalGen = () =>
    <UserEditModal {...userEditModalProps} />
  return (
    <div className="content-inner">
      <QueryInput {...QueryInputProps}/>
      <QueryList {...adminListProps} />
      <UserEditModalGen />
    </div>
  )
}
CaseQuery.propTypes = {
  queryItem: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
};

export default connect(({ queryItem, loading }) => ({ queryItem, loading: loading.models.queryItem }))(CaseQuery)
