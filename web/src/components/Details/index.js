import React from 'react';
import { Flex } from 'layout-flex';
import { Spin, Divider, Row, Col, Button } from 'antd';
import ReportList from 'zero-element-antd/lib/container/List/ReportList';
import global from 'zero-element/lib/config/global';
import useDetails from './hooks'

import Group from './type/Group';
import Title from './type/Title';

import styles from './index.less';

const { goBack } = global;
const { FlexItem } = Flex;

export default function Details(props) {
  const {
    loading = false, className = '',
    col = 2, fields = [], data = {},
    goBack: gb = false
  } = props;

  return <Spin spinning={loading}>
    {gb && goBack ? (
      <>
        <Button onClick={goBack}>返回</Button>
      </>
    ) : null}
    <Flex className={`${styles.container} ${className}`}>
      {fields.map((option, i) => {

        const {
          justify = 'start', align = 'top',
          title, group, divider,
          empty,
          label,
          field,
          map,  // 映射关系
          value, // 显示为固定值, 一般用于 React Element
          append = [], // 追加显示
          alone,
          columns,  // 显示为列表 
        } = option;

        if (title) {
          return <Title key={i} title={title} />;
        }
        if (group) {
          return <Group key={i} group={group} />;
        }
        if (divider) {
          return <Divider key={i}>{divider.label || ''}</Divider>
        }
        if (value && alone) {
          return <div key={i} className={styles.alone}>
            {value}
          </div>
        }
        if (columns) {
          return <FlexItem flex={`0 0 100%`} key={i}>
            {label ? (
              <div className={styles.labelTitle}>
                {label}:
              </div>
            ) : null}
            <RenderList columns={columns} data={data[field]} />
          </FlexItem>
        }

        return <FlexItem
          key={i}
          flex={`0 0 ${100 / col}%`}
          className={styles.valueContainer}
        >
          {empty ? null : (
            <Row type="flex" justify={justify} align={align}>
              <Col sm={6} className={styles.label}>
                {label}:
              </Col>
              <Col sm={18} className={styles.value}>
                {readValue(data, field, value, map) || '-'}
                {readAppendValue(data, append)}
              </Col>
            </Row>
          )}
        </FlexItem>
      })}
    </Flex>
  </Spin>
}

export {
  useDetails,
}

function readValue(data, field, defaultValue, map) {

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  const value = data[field];

  if (value !== undefined) {
    if (map) {
      return map[value];
    }
    return value;
  }
  return undefined;
}

function readAppendValue(data, append) {
  return append.map(opt => {
    return <div key={opt.field} style={{ color: '#666' }}>
      {data[opt.field]}
    </div>
  });
}

function RenderList({ columns, data = [] }) {
  return <ReportList
    config={{
      fields: columns.map(col => {
        return {
          ...col,
          key: col.field,
          dataIndex: col.field,
          title: col.label,
        }
      })
    }}
    data={data}
  />
}