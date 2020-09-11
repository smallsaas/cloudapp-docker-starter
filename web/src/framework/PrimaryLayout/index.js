import React, { useContext, useMemo, useState } from 'react';
import { Layout } from 'antd';
import Breadcrumb from './Breadcrumb';
import Login from './Login';
import './index.less';

import GlobalContext from '@/framework/GlobalContext';

import selectNavStyle from './utils/selectNavStyle';

const { Header, Content } = Layout;

export default function PrimaryLayout({
  location, children,
  menuData, breadcrumb,
}) {
  const { style } = useContext(GlobalContext);
  const { nav } = style;
  const [switchLeftNav, setSwitchLeftNav] = useState();

  const [
    TopNav, TopNavData,
    LeftNav, LeftNavData
  ] = useMemo(_ => {
    return selectNavStyle(nav, menuData, location.pathname, switchLeftNav);
  }, [nav, menuData, location.pathname, switchLeftNav]);

  // 当导航类型既不是 top 也不是 left 时, 应该在 top 渲染第一级菜单, left 渲染第二级
  // 此时, 点击 top 的导航时需要替换 left, 但不应该被路由
  function handleSwitchLeftNav(path) {
    setSwitchLeftNav(path);
  }

  const aloneView = location.pathname === '/login';

  return <Layout>
    {aloneView ? null : (
      <Header className="header topNav">
        <div className="logo">
          <a href="/">
            Zero Code
        </a>
        </div>
        <TopNav
          path={location.pathname}
          menuData={TopNavData}
          navType={nav}
          onClick={nav === 'both' ? handleSwitchLeftNav : undefined}
        />
        <div className="login">
          <Login />
        </div>
      </Header>
    )}
    <Layout className="pageContainer">
      {aloneView && LeftNav ? null : (
        <LeftNav navType={nav} path={location.pathname} menuData={LeftNavData} />
      )}
      <Layout id="contentContainer" className="contentContainer" style={
        aloneView ? undefined : { padding: '0 24px 24px' }
      }>
        {aloneView ? null : (
          <Breadcrumb path={location.pathname} breadcrumb={breadcrumb} />
        )}
        <Content>
          {children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
}