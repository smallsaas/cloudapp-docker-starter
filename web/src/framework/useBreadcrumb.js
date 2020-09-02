import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';

/**
 * 自定义 面包屑导航
 *
 * @export
 * @param {object} props
 * @param {Array} breadcrumb 自定义的面包屑列表
 */
export default function useBreadcrumb(props, breadcrumb) {
  const { OnBreadcrumb, OnBreadcrumbClear } = props;

  useDidMount(_ => {
    OnBreadcrumb(breadcrumb);
  });
  useWillUnmount(_ => {
    OnBreadcrumbClear();
  })
}