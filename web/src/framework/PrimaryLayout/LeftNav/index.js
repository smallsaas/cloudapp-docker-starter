import React from 'react';
import { Menu, Layout } from 'antd';
import useSelectedKeys from '../utils/useSelectedKeys';
import useOpenKeys from '../utils/useOpenKeys';
import renderMenu from '../utils/renderMenu';

const { Sider } = Layout;

export default function LeftNav({ path, menuData }) {
  const selectedKeys = useSelectedKeys(path);
  const [openKeys, setOpendKeys] = useOpenKeys(null);

  return <Sider width={200} style={{
    background: '#fff',
    overflow: 'hidden auto',
  }}>
    <Menu
      mode="inline"
      style={{ height: '100%', borderRight: 0 }}
      selectedKeys={selectedKeys}
      openKeys={openKeys.length ? openKeys : selectedKeys}
      onOpenChange={setOpendKeys}
    >
      {renderMenu({ menuData, divider: true })}
    </Menu>
  </Sider>
}