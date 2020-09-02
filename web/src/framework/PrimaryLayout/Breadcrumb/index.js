import React, { useMemo } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'umi';
import router from '@/config/router.config';

export default ({ path, breadcrumb }) => {
  const pathAry = useMemo(() => {
    const arr = path.split("\/");
    const rst = [];
    arr.shift();
    arr.push('');
    arr.forEach((key, i) => {
      rst.push(`/${arr.slice(0, i).join('/')}`);
    });
    if (rst[1] === '/') {
      rst.splice(1, 1);
    }
    rst[rst.length - 1] = rst[rst.length - 1].replace(/[_-](add|edit|view)$/g, '');

    return rst;

  }, [path]);

  if (breadcrumb.length) {
    return <Breadcrumb className="ZEleA-Breadcrumb-margin">
      {breadcrumb.map((item, i) => {
        return <Breadcrumb.Item key={i}>
          {item.path ? (
            <Link to={item.path}>
              {item.title}
            </Link>
          ) : (
              item.title
            )}
        </Breadcrumb.Item>;
      })}
    </Breadcrumb>
  }

  return <Breadcrumb className="ZEleA-Breadcrumb-margin">
    {pathAry.map((item, i) => {
      if (item === '/') {
        return <Breadcrumb.Item key={item}>
          <Link to="/">首页</Link>
        </Breadcrumb.Item>;
      }
      return <Breadcrumb.Item key={item}>
        <Link to={item}>
          {findPath(item, router).name}
        </Link>
      </Breadcrumb.Item>;
    })}
  </Breadcrumb>
}

function findPath(path, router) {
  const queue = [...router];
  let rst = {};
  while (queue.length) {
    const route = queue.shift();
    if (route.path === path) {
      rst = route;
      break;
    }
    if (route.items) {
      queue.push(...route.items);
    }
  }
  return rst;
}