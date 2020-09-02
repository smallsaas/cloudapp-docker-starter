import React from 'react';
import { history } from 'umi';
import { Layout, Result, Button } from 'antd';

const { Content } = Layout;

export default function Oauth(props) {

  function routeLogin() {
    history.push('/login');
  }

  return <Content style={{ background: '#fff' }}>
    <Result
      status="error"
      title="获取授权失败"
      subTitle="请稍后再次尝试，或使用其它登录方式"
      extra={[
        <Button key="buy" onClick={routeLogin}>返回登录</Button>,
      ]}
    >
    </Result>
  </Content>
}