import React from 'react';
import { Spin, Button } from 'antd';
import ZEle from 'zero-element';
import global from 'zero-element/lib/config/global';
import useDetails from './hooks';
import { Render } from 'zero-element/lib/config/formItemType';
import { Render as LayoutRender } from 'zero-element/lib/config/layout';

import styles from './index.less';
import _ from 'lodash';

export default function Details(props) {
  const {
    namespace,
    API,
    col = 2,
    fields = [],
    map = {},
    goBack = true
  } = props;

  const [details, loading] = useDetails(namespace, API);

  return <Spin spinning={loading}>
    {goBack && global.goBack ? (
      <>
        <Button onClick={global.goBack}>返回</Button>
      </>
    ) : null}
    <LayoutRender n="Grid" value={Array(col).fill(~~(24 / col))}>
      {fields.map((option, i) => {
        const { label } = option;

        return <div key={i} span={option.span}>
          {label ? (
            <div className={styles.labelTitle}>
              {label}:
              </div>
          ) : null}
          {renderPlain(details, option, map)}
        </div>
      })}
    </LayoutRender>
  </Spin>
}

function renderPlain(details, option, map) {
  const { field } = option;
  const options = {};

  if (map[field]) {
    options.map = map[field].map;
  }

  return <Render n="plain"
    options={options}
    value={_.get(details, field)}
  />
}

function RenderList({ namespace, columns, data = [] }) {
  return <ZEle
    namespace={namespace}
    config={{
      items: [
        {
          component: 'ReportList',
          config: {
            fields: columns.map(col => {
              return {
                ...col,
                key: col.field,
                dataIndex: col.field,
                title: col.label,
              }
            })
          }
        }
      ]
    }}
    data={data}
  />
}