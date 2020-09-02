// import React from 'react';
import TopNav from '../TopNav';
import LeftNav from '../LeftNav';

function selectNavStyle(type, menuData, path, switchLeftNav) {
  if (type === 'top') {
    return [
      TopNav, menuData,
      () => null, []
    ];
  }
  if (type === 'left') {
    return [
      () => null, [],
      LeftNav, menuData
    ];
  }

  let fPath;
  if (switchLeftNav) {
    fPath = switchLeftNav;
  } else {
    // 提取 父 path
    fPath = path.replace(/(\/\w+)[\/\w-]*/, '$1');
  }
  // 定位到 父path 的数据
  const leftNavData =
    menuData.find(menu => menu.path === fPath)
    || { items: [] };

  return [
    TopNav, menuData.map(menu => {
      const { items, ...rest } = menu;
      return rest;
    }),
    LeftNav, leftNavData.items
  ];
}

export default selectNavStyle;