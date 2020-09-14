/**
 * 基本元素列表去重
 *
 * @export
 * @param {Array} argus 基本元素组成的列表
 */
export function unique(argus) {
  return [...new Set(argus.reduce((acc, val) => acc.concat(val), []))];
}
/**
 * 对象列表去重, 需要含有 key id
 *
 * @export
 * @param {array} list
 * @param {array} newList
 */

export function uniqueObjList(list, newList) {
  const idSet = new Set(newList.map(i => i.id));
  return [...list.filter(i => !idSet.has(i.id)), ...newList];
}
/**
 * 对象列表排序, 需要含有 key id
 *
 * @export
 * @param {array} list
 * @param {boolean} type 是否升序, 默认 true
 * @returns
 */

export function sortObjList(list, type = true) {
  return list.sort((a, b) => {
    if (type) {
      return a.id - b.id;
    }

    return b.id - a.id;
  });
}
/**
 * 根据 key id 来合并对象
 *
 * @export
 * @param {array} list 把另一个数组的 同id对象 合并到这里
 * @param {array} newList
 * @param {array} exclude 不需要合并的 key
 * @return {array} rstList 返回合并并去重后的数组
 */

export function mapObjList(list, newList, exclude = []) {
  let rst = [];
  list.forEach(i => {
    const find = newList.find(p => p.id === i.id);

    if (find) {
      const obj = { ...find
      };
      exclude.forEach(key => {
        delete obj[key];
      });
      rst.push(Object.assign(i, obj));
    } else {
      rst.push(i);
    }
  });
  return uniqueObjList(newList, rst);
}
/**
 * 尝试把数据转换为 Number 类型，若失败则返回原数据
 *
 * @export
 * @param {string} value
 * @returns
 */

export function toNumber(value) {
  let v = value;

  if (value) {
    v = Number(value);

    if (isNaN(v)) {
      v = value;
    }
  }

  return v;
}
/**
 * 保留两位小数, 不足补零
 * @param {number} value 
 */

export function returnFloat(value) {
  var value = Math.round(parseFloat(value) * 100) / 100;
  var s = value.toString().split(".");

  if (s.length == 1) {
    value = value.toString() + ".00";
    return value;
  }

  if (s.length > 1) {
    if (s[1].length < 2) {
      value = value.toString() + "0";
    }

    return value;
  }
}
/**
 * 保留一位小数, 不足补零
 * @param {number} value 
 */

export function returnFloatOne(value) {
  var value = Math.round(parseFloat(value) * 10) / 10;
  var s = value.toString().split(".");

  if (s.length == 1) {
    value = value.toString() + ".0";
    return value;
  }

  return value;
}
/**
 * 上移或下移数组内的某一项，直接改变原数组
 *
 * @export
 * @param {array} arr
 * @param {string} type up | down
 * @param {number} index
 */

export function arrayItemMove(arr, type, index) {
  if (!Array.isArray(arr) || arr.length < 2) return false;

  if (type === 'up' && index > 0) {
    arr.splice(index - 1, 1, ...arr.splice(index, 1, arr[index - 1]));
  } else if (type === 'down' && index < arr.length - 1) {
    arr.splice(index + 1, 1, ...arr.splice(index, 1, arr[index + 1]));
  }
}