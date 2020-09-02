import React from 'react';
import { history } from 'umi';
import { Button } from 'antd';

function handleClick(path, data) {
  history.push({
    pathname: path,
    query: data,
  });
}
export default (props) => {
  const { data: { text = '', record }, options = {} } = props;
  const { path, query = { id: 'id' } } = options;
  const data = {};

  Object.keys(query).forEach(toKey => {
    const formKey = query[toKey];
    data[toKey] = record[formKey] || formKey;
  });

  if (text) {
    return <Button type="link" onClick={handleClick.bind(null, path, data)}>
      {text}
    </Button>;
  }
  return null;
}