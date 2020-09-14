import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { formatAPI } from 'zero-element/lib/utils/format';
export default function valueTypeEllipsis(props) {
  const {
    field,
    namespace,
    options = {},
    data: {
      index,
      text = '',
      record
    }
  } = props;
  const {
    max = 16,
    format,
    placeholder = ''
  } = options;
  const [t, setT] = useState(text);
  useEffect(_ => {
    if (format) {
      let rst = formatAPI(format, {
        namespace,
        placeholder,
        data: record
      });
      setT(rst);
    } else {
      setT(String(text));
    }
  }, [text, format]);
  if (!t || t === 'null') return null;
  return t.length < max ? t : /*#__PURE__*/React.createElement(Tooltip, {
    title: t
  }, t.slice(0, max), "...");
}