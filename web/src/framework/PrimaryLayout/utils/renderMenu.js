import React from 'react';
import { Menu } from 'antd';
import { Link } from 'umi';

const { SubMenu } = Menu;

/**
 * 渲染导航菜单数据
 *
 * @export
 * @param {Array} menuData
 * @param {boolean} divider 是否要把没有 path 的子项渲染成 分割线
 * @param {string} navType 导航的类型 top or left
 * @returns React.element
 */
export default function renderMenu({ menuData, divider, navType, onClick }) {
  const stack = [menuData];
  const rst = [];
  while (stack.length) {
    const menu = stack.shift();

    if (!menu) {
      break;
    };
    if (menu.invisible) {
      continue;
    }

    if (Array.isArray(menu)) {
      stack.push(...menu);
    } else {
      const { icon, name, path, items } = menu;

      if (Array.isArray(items)) {
        rst.push(<SubMenu key={path} title={
          <>
            {name}
          </>
        }>
          {renderMenu({ menuData: items })}
        </SubMenu>);
      } else {
        if (path) {
          let topNavItem;
          if (typeof onClick === 'function') {
            topNavItem = <Menu.Item key={path} onClick={onClick.bind(null, path)}>
              <div>
                <span>{name}</span>
              </div>
            </Menu.Item>
          } else {
            topNavItem = <Menu.Item key={path}>
              <Link to={path}>
                <div>
                  <span>{name}</span>
                </div >
              </Link >
            </Menu.Item>
          }
          rst.push(topNavItem);
        } else {
          divider && rst.push(<Menu.Divider key={menu.key || name} />);
        }
      }
    }
  }

  return rst;
}