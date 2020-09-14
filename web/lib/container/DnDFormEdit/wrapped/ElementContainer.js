import React from 'react';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';
const containerSquareTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    return true;
  },

  hover(props, monitor, component) {
    const clientOffset = monitor.getClientOffset();
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return;
    }

    const {
      config = {}
    } = props;
    const {
      parentId = 0,
      id
    } = config;
    const item = monitor.getItem();
    const {
      dispatch,
      ...rest
    } = item;
    dispatch({
      type: 'addElement',
      payload: { ...rest,
        parentId,
        id,
        index: props.index,
        layoutId: props.layoutId
      }
    });
  }

};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({
      shallow: true
    }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

export default DropTarget('element', containerSquareTarget, collect)(props => {
  const {
    isOver,
    canDrop,
    connectDropTarget,
    isOverCurrent,
    children
  } = props;
  const className = classNames({
    'ZEleA-DnDFormEdit-Container': true,
    'ZEleA-DnDFormEdit-Container-Current': isOverCurrent && canDrop,
    'ZEleA-DnDFormEdit-Container-Available': !isOverCurrent && canDrop,
    'ZEleA-DnDFormEdit-Container-Disable': isOverCurrent && !canDrop // 'ZEleA-DnDFormEdit-Container-active': itemData.parentId === parentId,

  });
  return connectDropTarget( /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: className
  }, children)));
});