import React, { PropTypes } from 'react'
import Websocket from 'react-websocket';
import { Menu, Icon, Popover, Badge, Modal, Button,notification  } from 'antd'
import styles from './main.less'
import Menus from './menu'

const SubMenu = Menu.SubMenu;
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 90,
      visible:false,
    };
  }

  handleData(data) {
    notification.open({
      description: data,
    });
  }

  render() {
    const {user,modalVisible, logout,showModalItem, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys, jumpTo } = this.props;
    const handleClickMenu = e => {
      switch (e.key) {
        case 'logout':logout();break;
        case 'userCenter':showModalItem();break;
      }
    };

    const menusProps = {
      siderFold: false,
      darkTheme: false,
      isNavbar,
      handleClickNavMenu: switchMenuPopover,
      location,
      navOpenKeys,
      changeOpenKeys,
    };

    const url = 'ws://116.211.106.183:58080/ovAlarmService/websocket/' + user.name
    return (
      <div className={styles.header}>
        {isNavbar
          ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible}
                     overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
          <div className={styles.siderbutton}>
            <Icon type="bars"/>
          </div>
        </Popover>
          : <div className={styles.siderbutton} onClick={switchSider}>
          <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'}/>
        </div>}
        <div className={styles.rightWrapper} id="message">
          <div className={styles.sidermenu}>
            <Badge>
              <span><Icon type="bell"/>通知</span>
            </Badge>
          </div>
          <Websocket url= {url} onMessage={this.handleData.bind(this)}/>
        </div>
        <div className="header-menu">
          <Menu mode="horizontal" onClick={handleClickMenu}>
            <SubMenu style={{ float: 'right'}} title={<span> <Icon type="user" />
          {user.name} </span>}>
              <Menu.Item key="userCenter">
                <a>个人中心</a>
              </Menu.Item>
              <Menu.Item key="logout">
                <a>注销</a>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>

      </div>
    )

  }
}

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
};
export default Header
