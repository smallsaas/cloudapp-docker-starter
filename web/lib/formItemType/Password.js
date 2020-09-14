function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef } from 'react';
import { Input } from 'antd';
import { useWillMount } from 'zero-element/lib/utils/hooks/lifeCycle';
const {
  Password
} = Input;
export default (({
  name,
  props,
  value,
  options,
  onChange,
  handle,
  ...rest
}) => {
  const initValue = useRef();
  const {
    notUpdateSubmitNull
  } = options;
  const {
    onFormatValue
  } = handle;
  useWillMount(_ => {
    initValue.current = value;

    if (notUpdateSubmitNull) {
      onFormatValue(name, 'toValue');
      onChange({
        _toValue: undefined
      });
    }
  });

  function handleChange(e) {
    const v = e.target.value;

    if (notUpdateSubmitNull) {
      onChange({
        _toValue: v
      });
    } else {
      onChange(v);
    }
  }

  return /*#__PURE__*/React.createElement(Password, _extends({}, props, {
    defaultValue: initValue.current,
    onChange: handleChange
  }));
});