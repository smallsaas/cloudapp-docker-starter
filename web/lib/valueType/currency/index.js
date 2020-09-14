import React from 'react';
import { toNumber, returnFloat } from "../../utils/tool";
export default function valueTypeCurrency(props) {
  const {
    options = {},
    data: {
      text = ''
    }
  } = props;
  const {
    symbol = '￥',
    color,
    nullPlaceholder
  } = options;
  let v;
  let s = symbol;

  if (text === null) {
    v = nullPlaceholder;
    s = '';
  }

  if (v === undefined) {
    v = returnFloat(toNumber(text));
  }

  return /*#__PURE__*/React.createElement("span", {
    style: {
      color
    }
  }, `${s} ${v}`);
}