import { useModel } from 'zero-element/lib/Model';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';

/**
 * 获取详情数据, 需要配合手写的 model
 *
 * @export
 * @param {string} namespace
 * @param {object} props
 * @returns [detailsData, loading]
 */
export default function useDetails(namespace, props) {
  const { location } = props;
  const [state, dispatch] = useModel({
    namespace,
  });
  const { details = {}, load } = state;

  useDidMount(getData);
  useWillUnmount(clearData);

  function getData() {
    dispatch({
      type: 'getDetailsData',
      payload: {
        id: location.query.id,
        pathname: location.pathname,
      }
    });
  }
  function clearData() {
    dispatch({
      type: 'save',
      payload: {
        details: {},
      }
    });
  }

  return [
    details,
    load.effects.getDetailsData,
  ]
}