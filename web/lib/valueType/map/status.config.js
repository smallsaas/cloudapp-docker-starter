let statusMap = {
  NORMAL: '正常',
  FORBIDDEN: '禁用'
};

function set(newMap) {
  statusMap = { ...statusMap,
    ...newMap
  };
}

export default statusMap;
export { set };