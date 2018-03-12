import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Modal } from 'antd'
import AdminUserList from '../../components/common/list'
import AdminUserSearch from '../../components/common/userSearch'
import UserAddModal from '../../components/user/userAddModal'

function AdminList ({ location, dispatch, adminLists,loading }) {
  const {list, pagination, currentItem, modalVisible, modalType, selectedRowKeys,roleList ,selectedRecId,onSearch} = adminLists;
  const userAddModalProps = {
    item: {},
    visible: modalVisible === 1,
    onOk (data) {
      dispatch({
        type: 'adminLists/create',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'adminLists/hideModal',
      })
    },
  };
  const query = ()=>{
      dispatch({
        type: 'query',
        payload: location.query,
      })
  };
  const onEditItem = (item) => {
    dispatch({
      type: 'adminLists/showEditModal',
      payload: {
        modalType: 'edit',
        currentItem: item,
      },
    })
  };
  const onDeleteItem = (item) => {
    Modal.confirm({
      title: '确定要删除当前选中的用户'+item.userName+'吗?',
      content: '点击确定后，信息删除。',
      onOk() {
        dispatch({
          type: 'adminLists/remove',
          payload: item.id,
        })
      },
      onCancel() {},
    });
  };
  const adminListProps = {
    dataSource: list,
    pagination,
    location,
    onPageChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          index: (page.current-1)*page.pageSize,
          page: page.current,
          count: page.pageSize,
        },
      }))
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (selectedRowKeys) => {
        dispatch({
          type: 'adminLists/selectRowKeys',
          payload: selectedRowKeys,
        })
      }
    },
    columns: [
      {
        title: '用户编码',
        dataIndex: 'userCode',
        key: 'userCode',
      }, {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
      }, {
        title: '电话号码',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '岗位',
        dataIndex: 'roleName',
        key: 'roleName',
      },
      {
        title: '操作',
        key: 'operation',
        width: 150,
        render: (text, record) => (
          <span onClick={(e) => {e.stopPropagation()}}>
            <a onClick={() => {onDeleteItem(record)}}>删除</a>
          </span>
        ),
      },
    ],
  };

  const adminSearchProps = {
    selectedRowKeys,
    roleList,
    onSearch (selectedRecId) {
      dispatch({
        type: 'adminLists/query',
        payload: {
          index:0,
          count:10,
          roleId:selectedRecId
        },
      })
    },
    onAdd () {
      dispatch({
        type: 'adminLists/showAddModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onDeleteItems (ids) {
      dispatch({
        type: 'adminLists/remove',
        payload: ids[0]
      })
    },
    onReload () {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: pagination.current,
          count: pagination.pageSize,
        },
      }))
    },
  };

  const UserAddModalGen = () =>
    <UserAddModal {...userAddModalProps} />
  return (
    <div className="content-inner">
      <AdminUserSearch {...adminSearchProps} />
      <AdminUserList {...adminListProps} />
      <UserAddModalGen />
    </div>
  )
}

AdminList.propTypes = {
  adminLists: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
};

export default connect(({ adminLists, loading }) => ({ adminLists, loading: loading.models.adminLists }))(AdminList)

