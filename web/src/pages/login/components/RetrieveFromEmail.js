import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';

import styles from '../index.less';

export default class RetrieveFromEmail extends Component {
  render() {
    const { loading, onReFEmial } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={onReFEmial} className={styles.Form}>
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
          <Button type="primary" htmlType="submit" className={styles.Button}
            loading={loading}
          >
            找回密码
          </Button>
        </Form.Item>
      </Form>
    );
  }
}