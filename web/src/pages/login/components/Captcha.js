import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { LS } from 'zero-element/lib/utils/storage';
import { post } from 'zero-element-antd/lib/utils/request';
import { KeyOutlined } from '@ant-design/icons';

const InputGroup = Input.Group;

export default class Captcha extends Component {
  state = {
    text: '获取',
    cd: false,
    count: 60,
  }
  type = {
    'email': 'EmailValidate',
    'phone': 'PhoneValidate',
  };
  componentDidMount() {
    const time = LS.get('captcha');
    if (time) {
      const endTiem = (Number(time));
      if ((endTiem) > (+new Date())) {
        this.setState({
          cd: true,
          count: ~~((endTiem - new Date()) / 1000),
        });
        this.setTimerStart();
      }
    }
  }
  getCaptcha = () => {
    this.setState({
      cd: true,
    });
    LS.set('captcha', +new Date() + 60000);
    this.setTimerStart();
    this.sendCaptcha();
  }
  setTimerStart = () => {
    const timer = setInterval(() => {
      this.setState(({ count }) => {
        return {
          count: count - 1,
        }
      }, () => {
        const { count } = this.state;

        if (count <= 0) {
          clearInterval(timer);
          this.setState({
            count: 60,
            cd: false,
          })
        }
      });
    }, 1000);
  }
  sendCaptcha = () => {
    post('/api/pub/validateCodes/send', {
      type: this.type[this.props.type],
      receiver: this.props.receiver,
    })
  }


  render() {
    const { receiver, onChange } = this.props;
    const { text, cd, count } = this.state;

    return <InputGroup compact>
      <Input
        style={{ width: '70%' }}
        prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="验证码"
        onChange={onChange}
      />
      <Button
        style={{ width: '30%' }}
        disabled={!receiver || cd}
        onClick={this.getCaptcha}
      >
        {cd ? count : text}
      </Button>
    </InputGroup>
  }
}