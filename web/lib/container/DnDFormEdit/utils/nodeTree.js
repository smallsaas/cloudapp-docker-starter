/**
 * 从树中找到 id 所在的节点
 *  
 * @param {number} id
 * @param {object} nodeTree
 * @returns
 */
export function findNode(id, node) {
  let queue = [node];

  while (queue.length) {
    let curNode = queue.shift();

    if (curNode) {
      if (curNode.id === id) {
        return curNode;
      }

      if (curNode.items && curNode.items.length) {
        queue = queue.concat(curNode.items);
      }
    }
  }
}
/**
 * 找到第一个含有空 items 的节点
 *
 * @param {object} nodeTree
 * @returns node or empty object
 */

export function findEmptyNode(node) {
  let queue = [node];

  while (queue.length) {
    let curNode = queue.shift();

    if (curNode) {
      if (curNode.items) {
        if (curNode.items.length === 0 || curNode.items.includes() || curNode.items.includes(null)) {
          return curNode;
        } else {
          queue = queue.concat(curNode.items);
        }
      }
    }
  }

  return {};
}