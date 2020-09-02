import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { MobileOutlined } from '@ant-design/icons';

import styles from '../index.less';
import Captcha from './Captcha';

export default class PhoneForm extends Component {
  render() {
    const { onSubmit } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    return (
      <Form onSubmit={onSubmit} className={styles.Form}>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机号' }],
          })(
            <Input
              prefix={<MobileOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="手机号"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('captcha', {
            rules: [{ required: true, message: '请输入验证码' }],
          })(
            <Captcha
              type="phone"
              receiver={getFieldValue('phone')}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>自动登录</Checkbox>)}
          <Button type="link" className={styles.forgot}>
            忘记密码
          </Button>
          <Button type="primary" htmlType="submit" className={styles.Button}>
            登陆
          </Button>
        </Form.Item>
      </Form>
    );
  }
}