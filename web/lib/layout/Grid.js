function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Render } from 'zero-element/lib/config/layout';
import { Row, Col } from 'antd';
export default function Grid(props) {
  const {
    layoutArea,
    value,
    children
  } = props;

  if (layoutArea && Array.isArray(layoutArea)) {
    const fields = React.Children.toArray(children);
    const rst = [];
    layoutArea.forEach((rowLayout, i) => {
      rst.push({
        key: i,
        layout: rowLayout.layout,
        value: rowLayout.value,
        items: fields.splice(0, rowLayout.length)
      });
    });

    if (fields.length) {
      rst.push({
        key: 'overage',
        layout: 'Grid',
        value: value || [12, 12],
        items: fields
      });
    }

    return rst.map(row => {
      const {
        layout,
        items,
        ...rest
      } = row;
      return /*#__PURE__*/React.createElement(Render, _extends({
        n: layout
      }, rest), items);
    });
  }

  if (value && Array.isArray(value)) {
    const rst = []; // 使用 toArray 会自动 filter null

    React.Children.toArray(children).forEach(child => {
      const preRow = rst[rst.length - 1];

      if (preRow && preRow.items && preRow.items.length !== 0) {
        const count = preRow.items.reduce((pre, v, i) => pre + (v.props.span || value[i]), 0);

        if (count >= 24 || isNaN(count)) {
          rst.push({
            items: []
          });
        }
      } else {
        rst.push({
          items: []
        });
      }

      rst[rst.length - 1].items.push(child);
    });
    return rst.map((row, i) => {
      return /*#__PURE__*/React.createElement(Row, {
        key: i,
        gutter: {
          xs: 1,
          sm: 2,
          md: 4
        }
      }, row.items.map((child, i) => {
        if (child) {
          const {
            props = {}
          } = child;
          const {
            span
          } = props;
          return /*#__PURE__*/React.createElement(Col, {
            key: i,
            sm: span || value[i]
          }, child);
        }

        return null;
      }));
    });
  }

  return /*#__PURE__*/React.createElement(Row, {
    gutter: {
      xs: 1,
      sm: 2,
      md: 4
    }
  }, React.Children.map(children, child => {
    if (child) {
      const {
        props = {}
      } = child;
      const {
        span = 24,
        md = span,
        sm = md * 2 > 24 ? 24 : md * 2
      } = props;
      return /*#__PURE__*/React.createElement(Col, {
        sm: sm,
        md: md
      }, child);
    }

    return null;
  }));
}