import React from 'react';
import { useWillMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { saveToken } from 'zero-element/lib/utils/request/token';
import { history } from 'umi';
import { Layout, Result } from 'antd';
import getUserInfo from './utils/getUserInfo';

const { Content } = Layout;

export default function Oauth(props) {
  const { location } = props;
  const { query } = location;

  useWillMount(_ => {
    const { accessToken } = query;
    if (accessToken) {
      saveToken({
        token: accessToken,
        remember: true,
      });
      getUserInfo()
        .then(_ => {
          history.push('/');
        })
    } else {
      history.push('/login/oauthErr');
    }
  });

  return <Content style={{ background: '#fff' }}>
    <Result
      title="获取授权中"
    >
    </Result>
  </Content>
}