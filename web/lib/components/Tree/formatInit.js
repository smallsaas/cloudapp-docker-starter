function checkData(rspData, childrenField) {
  if (!rspData) return [];

  if (rspData.id) {
    return rspData;
  } else if (rspData[childrenField]) {
    return rspData[childrenField];
  }

  if (Array.isArray(rspData)) {
    return rspData;
  }

  return [];
}

function formatToTreeData(data, options, pId) {
  const {
    id: idField,
    children: childrenField
  } = options;
  const rst = [];

  if (Array.isArray(data)) {
    data.forEach(i => {
      const item = { ...i,
        key: i[idField] ? i[idField] : `${pId}_${i.id}`,
        title: i.title || i.name || i[idField] || i.id
      };

      if (Array.isArray(item[childrenField])) {
        const children = item[childrenField];
        delete item[childrenField];
        item.children = formatToTreeData(children, {
          id: idField,
          children: childrenField
        }, item.key);
      }

      rst.push(item);
    });
  } else {
    rst.push(data);
  }

  return rst;
}

function mergeData(rspData, childrenField, idField) {
  const data = checkData(rspData, childrenField);
  let rst = [];

  if (Array.isArray(data) && data.length === 1) {
    rst = formatToTreeData(data[0][childrenField], {
      id: idField,
      children: childrenField
    });
  } else {
    rst = formatToTreeData(data, {
      id: idField,
      children: childrenField
    });
  }

  return rst;
}

;
export default mergeData;