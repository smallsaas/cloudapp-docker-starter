import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { Layout, Button, message } from 'antd';
import { saveToken } from 'zero-element/lib/utils/request/token';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
import JParticles from 'jparticles';
import AccountForm from './components/Account';
import PhoneForm from './components/Phone';
import MailReg from './components/MailReg';
import RFE from './components/RetrieveFromEmail';
import styles from './index.less';
import { query, post } from 'zero-element-antd/lib/utils/request';
import getUserInfo from './utils/getUserInfo';

const { Content } = Layout;
const cType = {
  'account': AccountForm,
  'phone': PhoneForm,
  'github': AccountForm,
  'mailReg': MailReg,
  'RFE': RFE,
};

function LoginForm(props) {
  const [formType, setFormType] = useState('account');
  const [loading, setLoading] = useState(false);

  useEffect(_ => {
    new JParticles.particle('#loginBG', {
      color: '#25bfff',
      lineShape: 'cube',
      range: 2000,
      proximity: 100,
      // 开启视差效果
      // parallax: true,
    });
  }, []);

  function handleSubmit(values) {
    setLoading(true);
    post('/api/oauth/login', values, {
      message: null,
    }).then((data) => {
      saveToken({
        token: data.accessToken,
        permissions: formatPerms(data.perms),
        remember: values.remember,
      });
    })
      // .then(getUserInfo)
      .then(_ => {
        history.push('/');
      })
      .finally(_ => {
        setLoading(false);
      });
  }

  function handleReg(values) {
    setLoading(true);
    post('/api/sys/oauth/accounts/register', values, {
      message: null,
    }).then(_ => {
      message.success('注册成功');
      if (values.email) {
        this.handleChangeFormType('account');
      }
    })
      .finally(_ => {
        setLoading(false);
      });
  }

  function handleChangeFormType(type) {
    setFormType(type);
    // this.props.form.resetFields();
  }
  function switchRePasswordForm() {
    handleChangeFormType('RFE')
  }

  function handleReFEmail(values) {
    setLoading(true);

    query('/api/pub/password/normal/sendResetEmail', values)
      .then(() => {
        message.success('重置邮件发送成功');
        if (values.email) {
          this.handleChangeFormType('account');
        }
      })
      .finally(_ => {
        setLoading(false);
      });
  }

  const MatchC = cType[formType];

  return <>
    <div
      id="loginBG"
      className={styles.loginBG}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
    </div>
    <div className={styles.formContainer}>
      <div className={styles.logo}>Zero Code</div>

      <MatchC
        {...props}
        className={styles.Form}
        onSubmit={handleSubmit}
        onReg={handleReg}
        onRePW={switchRePasswordForm}
        onReFEmial={handleReFEmail}
        loading={loading}
      />


      <div className={styles.options}>
        <Button type="link" size="small"
          disabled={formType === 'account'}
          onClick={handleChangeFormType.bind(null, 'account')}
        >
          账号登录
      </Button>
        <Button type="link"
          title="使用 Github 登录"
          icon="github"
          size="large"
          href={`${getEndpoint()}/api/pub/github/normal/login`}
        >
        </Button>
        {/* <Button type="link" size="small"
        disabled={formType === 'phone'}
        onClick={handleChangeFormType.bind(null, 'phone')}
      >
        手机登录
      </Button> */}
        {/* <Button type="link" size="small"
        disabled={formType === 'github'}
        onClick={handleChangeFormType.bind(null, 'github')}
      >
        Github 登录
      </Button> */}
      </div>


      <div className={styles.regGuided}>
        <Button type="link" size="small"
          disabled={formType === 'mailReg'}
          onClick={handleChangeFormType.bind(null, 'mailReg')}
        >
          立即注册
      </Button>
      </div>
    </div>
  </>
}

export default (props) => {
  return <Layout>
    <Content>
      <LoginForm />
    </Content>
  </Layout>
}

function formatPerms(perms) {
  const permsObj = {};

  if (!Array.isArray(perms)) {
    console.warn('非预期的权限数据格式: ', perms);
  } else {
    const permsFlat = arrayFlat(perms);
    permsFlat.forEach(perm => {
      permsObj[perm.identifier] = true;
    });
  }
  return permsObj;
}

function arrayFlat(arr) {
  const stack = [...arr];
  const rst = [];

  while (stack.length) {
    const item = stack.shift();
    if (Array.isArray(item.perms)) {
      stack.push(...item.perms);
    }
    rst.push(item);
  }

  return rst;
}