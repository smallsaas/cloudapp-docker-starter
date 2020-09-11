// import React from 'react';
import TopNav from '../nav/TopNav';
import LeftNav from '../nav/LeftNav';
import LeftNavCollaps from '../nav/LeftNavCollaps';

const navMap = {
  'top': (menuData) => ([
    TopNav, menuData,
    () => null, []
  ]),
  'left': (menuData) => ([
    () => null, [],
    LeftNav, menuData,
  ]),
  'LeftNavCollaps': (menuData) => ([
    () => null, [],
    LeftNavCollaps, menuData,
  ]),
};

function selectNavStyle(type, menuData, path, switchLeftNav) {
  if (navMap[type]) {
    return navMap[type](menuData);
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