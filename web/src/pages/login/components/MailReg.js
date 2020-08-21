import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined, ClockCircleOutlined } from '@ant-design/icons';

import styles from '../index.less';
import Captcha from './Captcha';

export default class MailRegForm extends Component {
  render() {
    const { onReg, loading } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    return (
      <Form onSubmit={onReg} className={styles.Form}>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '请输入邮箱' }],
          })(
            <Input
              prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="邮箱"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input
              prefix={<ClockCircleOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('validateCode', {
            rules: [{ required: true, message: '请输入验证码' }],
          })(
            <Captcha
              type="email"
              receiver={getFieldValue('email')}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.Button}
            loading={loading}
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    );
  }
}