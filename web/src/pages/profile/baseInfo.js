import React from 'react';
import useBreadcrumb from '@/framework/useBreadcrumb';
import ZEle from 'zero-element';

const config = {
  layout: 'Content',
  title: '个人信息',
  items: [
    {
      layout: 'Empty',
      component: 'BaseForm',
      config: {
        goBack: false,
        API: {
          getAPI: '/api/u/crud/accounts/userInfo',
          updateAPI: '/api/u/crud/accounts/edit',
        },
        layout: 'Grid',
        layoutConfig: {
          value: [12, 12],
        },
        fields: [
          {
            field: 'avatar', label: '头像', type: 'upload-image',
            options: {
              API: '/api/u/uploadfile',
              max: 1,
            },
            span: 24,
          },
          { field: 'account', label: '账号', type: 'plain' },
          { field: 'email', label: '邮箱', type: 'plain' },
          { field: 'name', label: '昵称', type: 'input' },
          {
            field: 'sex', label: '性别', type: 'radio',
            options: [
              { label: '男', value: 0 },
              { label: '女', value: 1 },
            ]
          },
          { field: 'birthday', label: '生日', type: 'date' },
        ]
      }
    }
  ]
};

export default function (props) {
  useBreadcrumb(props, [
    { title: '首页', path: '/' },
    { title: '个人中心' },
    { title: '修改个人信息' },
  ]);

  return <ZEle namespace='security_baseInfo' config={config} />

}