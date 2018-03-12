import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Modal } from 'antd'
import AdminRoleList from '../../components/common/list'
import AdminRoleSearch from '../../components/common/roleSearch'
import RoleAddModal from '../../components/user/roleAddModal'
import RoleEditModal from '../../components/user/roleEditModal'

function AdminRole({ location, dispatch, adminRoles, loading }) {
  const { list, pagination, currentItem, modalVisible, selectedRowKeys } = adminRoles;
  const roleAddModalProps = {
    item: {},
    visible: modalVisible === 1,
    onOk (data) {
      dispatch({
        type: 'adminRoles/create',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'adminRoles/hideModal',
      })
    },
  };

  const roleEditModalProps = {
    item: currentItem,
    visible: modalVisible === 2,
    onOk (data) {
      dispatch({
        type: 'adminRoles/edit',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'adminRoles/hideModal',
      })
    },
  };

  const onEditItem = (item) => {
    dispatch({
      type: 'adminRoles/showEditModal',
      payload: {
        modalType: 'update',
        currentItem: item,
      },
    })
  };
  const onDeleteItem = (item) => {
    Modal.confirm({
      title: '确定要删除当前选中的岗位'+item.roleName+'吗?',
      content: '点击确定后，信息删除。',
      onOk() {
        dispatch({
          type: 'adminRoles/remove',
          payload: item.id,
        })
      },
      onCancel() {},
    });
  };
  const roleListProps = {
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
          type: 'adminRoles/selectRowKeys',
          payload: selectedRowKeys,
        })
      }
    },
    columns: [
      {
        title: '岗位标识',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '岗位名称',
        dataIndex: 'roleName',
        key: 'roleName',
      }, {
        title: '岗位描述',
        dataIndex: 'roleDesc',
        key: 'roleDesc',
      }, {
        title: '编辑',
        key: 'operation',
        width: 150,
        render: (text, record) => (
          <span onClick={(e) => {e.stopPropagation()}}>
            <a onClick={() => {onEditItem(record)}} style={{paddingRight:20}}>编辑</a>
            <a onClick={() => {onDeleteItem(record)}}>删除</a>
          </span>
        ),
      },
    ],
  };

  const roleSearchProps = {
    selectedRowKeys,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/admin/role',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/admin/role',
      }))
    },
    onAdd () {
      dispatch({
        type: 'adminRoles/showAddModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onDeleteItems (ids) {
      dispatch({
        type: 'adminRoles/remove',
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

  const RoleAddModalGen = () =>
    <RoleAddModal {...roleAddModalProps} />
  const RoleEditModalGen = () =>
    <RoleEditModal {...roleEditModalProps} />

  return (
    <div className="content-inner">
      <AdminRoleSearch {...roleSearchProps} />
      <AdminRoleList {...roleListProps} />
      <RoleAddModalGen />
      <RoleEditModalGen />
    </div>
  )
}

AdminRole.propTypes = {
  adminRoles: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
};

export default connect(({ adminRoles, loading }) => ({adminRoles, loading: loading.models.adminRoles}))(AdminRole)
