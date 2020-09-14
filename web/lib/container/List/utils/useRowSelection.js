import { useState } from "react";
export default function useRowSelection(namespace, rowSelectionProsp = {}) {
  const {
    selections,
    ...rest
  } = rowSelectionProsp;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  function handleSelectChange(selectedRowKeys, selectedRows) {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
  }

  const rowSelection = {
    selectedRowKeys,
    selectedRows,
    hideDefaultSelections: true,
    ...rest,
    selections: Array.isArray(selections) ? selections.map(sele => ({ ...sele,
      onSelect: sele.onSelect.bind(null, setSelectedRowKeys)
    })) : selections,
    onChange: handleSelectChange
  };
  return rowSelection;
}