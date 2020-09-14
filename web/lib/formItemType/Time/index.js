import React from 'react';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import global from 'zero-element/lib/config/global';
import { TimePicker } from 'antd';
import moment from 'moment';
const {
  RangePicker
} = TimePicker;
const componentMap = {
  'time-range': RangePicker
};
const formatMap = {
  'time-range': 'HH:mm:ss'
};

function date(componentName) {
  const Match = componentMap[componentName];
  return function DateConstructor(props) {
    const {
      dateFormat = {}
    } = global;
    const {
      value,
      options = {},
      onChange,
      props: propsOpt,
      formdata,
      handle // ...restProps

    } = props;
    const {
      nowTime = false,
      format = dateFormat[componentName] || formatMap[componentName],
      startDate,
      endDate
    } = options;
    const {
      onExpect,
      onSaveOtherValue
    } = handle;
    let val = value;

    if (componentName === 'time-range' && startDate && endDate) {
      val = [formdata[startDate], formdata[endDate]];
    }

    const dateProps = {
      showToday: true,
      allowClear: false,
      ...propsOpt,
      // ...restProps,
      value: formatDate(val, format),
      format,
      onChange: handleChange
    };

    function handleChange(moment, dateString) {
      if (componentName === 'time-range' && startDate && endDate && onSaveOtherValue) {
        onSaveOtherValue(startDate, dateString[0]);
        onSaveOtherValue(endDate, dateString[1]);
      } else {
        onChange(dateString);
      }
    }

    useDidMount(_ => {
      if (!value && nowTime) {
        if (componentName === 'time-range') {
          onChange([moment().subtract(7, 'days').format(format), moment().format(format)]);
        } else {
          onChange(moment().format(format));
        }
      }

      if (componentName === 'time-range' && startDate && endDate) {
        onExpect([startDate, endDate]);
      }
    });
    return /*#__PURE__*/React.createElement(Match, dateProps);
  };
}

function formatDate(value, format) {
  if (Array.isArray(value)) {
    return [formatDate(value[0], format), formatDate(value[1], format)];
  }

  return value ? moment(value || new Date(), format) : undefined;
}

export default date;