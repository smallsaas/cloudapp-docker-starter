import React from 'react';
import { useWillMount } from 'zero-element/lib/utils/hooks/lifeCycle';
export default function (props) {
  const {
    name,
    options = {},
    handle = {}
  } = props;
  const {
    map
  } = options;
  const {
    onFormatValue
  } = handle;
  useWillMount(_ => {
    if (map && onFormatValue) {
      onFormatValue(name, 'map', map);
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 21
    }
  });
}