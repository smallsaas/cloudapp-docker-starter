import React, { useRef } from 'react';

function tableFooter(dataSource, columns) {
  const footer = useRef(null);

  if (footer.current === null) {
    footer.current = columns.some(i => i.footerSum);
  }

  if (footer.current === true) {
    return () => /*#__PURE__*/React.createElement(TableFooter, {
      dataSource: dataSource,
      columns: columns
    });
  }

  return undefined;
}

function TableFooter(props) {
  const {
    dataSource,
    columns
  } = props;
  return /*#__PURE__*/React.createElement("table", {
    className: "ant-table"
  }, /*#__PURE__*/React.createElement("colgroup", null, columns.map((colModel, index) => {
    return /*#__PURE__*/React.createElement("col", {
      style: {
        width: colModel.width,
        minWidth: colModel.width
      },
      key: index
    });
  })), /*#__PURE__*/React.createElement("tfoot", null, /*#__PURE__*/React.createElement("tr", null, columns.map((colum, idxCol) => {
    return /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "0px 8px"
      },
      className: colum.className,
      key: idxCol
    }, /*#__PURE__*/React.createElement("strong", null, dataSource && colum.footerSum ? `总${colum.title} ${dataSource.reduce((sum, record) => sum + parseFloat(record[colum.dataIndex]), 0)}` : ""));
  }))));
}

export default tableFooter;