import React from 'react';
export default function valueTypeIndex(props) {
  const {
    model,
    data: {
      index
    }
  } = props;
  const {
    listData
  } = model;
  const {
    current = 1,
    pageSize = 10
  } = listData;
  return /*#__PURE__*/React.createElement("span", null, (current - 1) * pageSize + index + 1);
}