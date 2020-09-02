/* eslint-disable no-unused-vars */

import { query, post, update, remove } from 'zero-element/lib/utils/request';

import { createModel } from 'zero-element/lib/Model';
import { get } from 'zero-element/lib/config/APIConfig';
import { formatAPI } from 'zero-element/lib/utils/format';

const sleep = ms => new Promise(res => setTimeout(_ => res(), ms));


function quertList() {
  return sleep(1000)
    .then(_ => ({
      data: {
        code: 200,
        'data': [{
          'id': 1,
          'name': '张三',
          'sex': 1,
          'status': 'NORMAL',
        }]
      }
    }))
}

createModel({
  namespace: 'demo',
  state: {
    listData: {
      records: [
        { id: 1, name: 'Test' },
      ],
    },
  },
  effects: {
    fetchList: async function fetchList({ API, payload }) {
      const fAPI = formatAPI(API, {
        namespace: this.namespace,
      });

      console.log(`fetchList ${fAPI}`, payload);

      const { data: result } = await quertList(fAPI, payload);
      console.log('Mock:', result);

      if (result && result.code === 200) {
        if (Array.isArray(result.data)) {
          const records = result.data;
          this.listData.records = records;

        } else {
          const data = result.data;
          this.listData = {
            ...data,
            current: data[get('RESPONSE_FIELD_current')],
            pageSize: data[get('RESPONSE_FIELD_pageSize')],
            total: data[get('RESPONSE_FIELD_total')],
            records: data[get('RESPONSE_FIELD_records')],
          };
        }

      } else {
        this.listData = { records: [] };
      }

      return result;
    },

  },
});