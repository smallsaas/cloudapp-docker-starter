import { query } from 'zero-element-antd/lib/utils/request';
import { saveToken } from 'zero-element/lib/utils/request/token';

export default function getUserInfo() {
  return query('/api/u/crud/accounts/userInfo')
    .then(data => {
      saveToken({
        userName: data.name,
        avatar: data.avatar,
        remember: true,
      });
    })
}