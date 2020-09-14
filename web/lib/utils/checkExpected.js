/**
 * 检测该行数据的字段的值 是否符合预期
 *
 * @param {*} record
 * @param {*} options
 * @returns
 */
const rulesMap = {
  'IS_NULL': value => {
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return value.length === 0;
      }

      return Object.keys(value || {}).length === 0;
    }

    return value === 0 ? false : !Boolean(value);
  },
  'IS_NOT_NULL': value => {
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return value.length !== 0;
      }

      return Object.keys(value || {}).length !== 0;
    }

    return value === 0 ? true : Boolean(value);
  },
  'IS_OBJECT': value => {
    return typeof value === 'object' && String(value) === '[object Object]';
  },
  'IS_ARRAY': value => {
    return Array.isArray(value);
  },
  'IS_STRING': value => {
    return typeof value === 'string';
  },
  'IS_NUMBER': value => {
    return typeof value === 'number';
  }
};
export default function checkExpected(record = {}, expect = {}) {
  const {
    field,
    value,
    permission
  } = expect; // // 若需要检测权限
  // if (permission) {
  //   if (checkPerm(permission) === false) {
  //     return false;
  //   }
  // }

  if (!field) return true; // 没有预期就是什么都凑合

  const fieldList = field instanceof Array ? field : [field];
  const valueList = value instanceof Array ? value : [value];
  return fieldList.every((fields, i) => {
    const values = valueList[i];

    if (Array.isArray(fields)) {
      return fields.some(field => {
        const recordValue = record[field];
        return extendsExpectedValue(values, recordValue);
      });
    } else {
      const recordValue = record[fields];
      return extendsExpectedValue(values, recordValue);
    }
  });
}
/**
 *
 *
 * @param {*} value 预期的值
 * @param {*} recordValue 列表的数据对应的字段的值
 * @returns Boolean
 */

function judge(value, recordValue) {
  // 若不是简单的相等关系的话
  if (recordValue !== value) {
    // 先看看 value 是不是预设关键字
    if (rulesMap[value]) {
      if (!rulesMap[value](recordValue)) {
        return false;
      }
    } else {
      // 再看看 value 是不是传入了正则表达式
      // ^\/[\S\s]+\/[gimy]*$   预期匹配字符串： '/test ok/g'
      const regexCheck = new RegExp(/^\/[\S\s]+\/[gimy]*$/, 'g');

      if (!regexCheck.test(value)) {
        return false;
      }

      const valueSplit = value.split('/');
      const ExpectedRegex = new RegExp(valueSplit[1], valueSplit[2]);

      if (!ExpectedRegex.test(recordValue)) {
        return false;
      }
    }
  }

  return true;
}
/**
 * 仅仅是用来处理 value 为数组的情况下，减少代码重复而已
 *
 * @param {*} values
 * @param {*} recordValue
 * @returns Boolean
 */


function extendsExpectedValue(values, recordValue) {
  if (Array.isArray(values)) {
    return values.some(value => judge(value, recordValue));
  } else {
    return judge(values, recordValue);
  }
}