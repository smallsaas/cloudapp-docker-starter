import { upload } from 'zero-element/lib/utils/request';
export default function (api, param) {
  upload(api, {
    file: param.file
  }).then(response => {
    const {
      data
    } = response.data;

    if (data) {
      param.success({
        url: data.url
      });
    }
  }).catch(error => {
    console.warn(error);
    param.error({
      msg: error
    });
  });
}