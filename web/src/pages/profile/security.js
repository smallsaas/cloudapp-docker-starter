import React from 'react';
import useBreadcrumb from '@/framework/useBreadcrumb';
import ZEle from 'zero-element';

const config = {
  layout: 'Empty',
  items: [
    {
      layout: 'Content',
      component: 'BaseForm',
      config: {
        goBack: false,
        API: {
          createAPI: '/api/u/crud/accounts/reset_password',
        },
        fields: [
          { field: 'group', label: '', type: 'group', value: '修改密码' },
          {
            field: 'oldPassword', label: '原密码', type: 'password',
            rules: ['required'],
          },
          {
            field: 'newPassword', label: '新密码', type: 'password',
            rules: ['required'],
          },
          {
            field: 'repeatpPassword', label: '重复新密码', type: 'password',
            rules: ['required'],
          },
        ]
      }
    },
    {
      layout: 'Content',
      component: 'BaseForm',
      config: {
        goBack: false,
        API: {
          createAPI: '/api/u/crud/accounts/resetEmail',
        },
        layout: 'Grid',
        fields: [
          { field: 'group', label: '', type: 'group', value: '修改邮箱' },
          {
            field: 'email', label: '新邮箱', type: 'input',
            rules: ['required', 'mail']
          },
          {
            field: 'validateCode', label: '验证码', type: 'captcha', span: 8,
            options: {
              field: 'email',
            },
            props: {
              style: {
                width: 240,
              }
            },
            rules: ['required'],
          },
        ]
      }
    },

  ]
};

export default function (props) {
  useBreadcrumb(props, [
    { title: '首页', path: '/' },
    { title: '个人中心' },
    { title: '账号安全' },
  ]);

  return <ZEle namespace='security_password' config={config} />

}