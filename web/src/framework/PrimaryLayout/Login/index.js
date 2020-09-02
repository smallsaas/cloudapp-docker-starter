import React from 'react';
import { history } from 'umi';
import { removeToken } from 'zero-element/lib/utils/request/token';
import { Avatar, Menu, Dropdown } from 'antd';
import {
  UserOutlined,
  // AppstoreOutlined,
  LogoutOutlined
} from '@ant-design/icons';

function handleLogOut() {
  history.push('/login');
  removeToken();
}
// function handleRouteToProfile() {
//   history.push('/profile/baseInfo');
// }

const menu = (
  <Menu>
    {/* <Menu.Item onClick={handleRouteToProfile}>
      <AppstoreOutlined />
      <span className="ZEleA-margin-left">个人中心</span>
    </Menu.Item>
    <Menu.Divider /> */}
    <Menu.Item onClick={handleLogOut}>
      <LogoutOutlined />
      <span className="ZEleA-margin-left">退出账号</span>
    </Menu.Item>
  </Menu>
);

export default (props) => {
  return <Dropdown overlay={menu} placement="bottomRight">
    <Avatar icon={<UserOutlined />} size={40} />
  </Dropdown>
}