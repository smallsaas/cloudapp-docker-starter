import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import styles from '../index.less';

export default function AccountForm(props) {
  const { className, onRePW, onSubmit, loading } = props;

  return <Form className={className} onFinish={onSubmit}>
    <Form.Item name="account" rules={[{ required: true, message: '请输入用户名' }]}>
      <Input
        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="用户名/邮箱"
      />
    </Form.Item>
    <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
      <Input
        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="password"
        placeholder="密码"
      />
    </Form.Item>
    <Form.Item name="remember" valuePropName="checked" initialValue={true}>
      <Checkbox>自动登录</Checkbox>
      <Button type="link" className={styles.forgot}
        onClick={onRePW}
      >
        忘记密码
          </Button>
      <Button type="primary" htmlType="submit" className={styles.Button}
        loading={loading}
      >
        登陆
          </Button>
    </Form.Item>
  </Form>
}