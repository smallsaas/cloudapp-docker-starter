import React from 'react';
import { DragSource } from 'react-dnd';
const itemSource = {
  beginDrag(props, monitor, component) {
    // 发送给 LayoutContainer 的数据
    const {
      children,
      ...restProps
    } = props;
    return restProps;
  },

  isDragging(props, monitor) {
    return monitor.getItem().id === props.id;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    const {
      parentId,
      insertId,
      item,
      onAddItem
    } = monitor.getDropResult();

    if (onAddItem) {}
  }

};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function handleClick(props) {
  const {
    children,
    connectDragSource,
    dispatch,
    isDragging,
    ...rest
  } = props;
  dispatch({
    type: 'insertElement',
    payload: rest
  });
}

export default DragSource('element', itemSource, collect)(props => {
  const {
    isDragging,
    connectDragSource,
    children,
    ...restProps
  } = props;
  return connectDragSource( /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-DnDFormEdit-ComponentItem",
    onClick: handleClick.bind(null, props)
  }, children));
});