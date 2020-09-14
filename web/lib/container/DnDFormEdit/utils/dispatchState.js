import Item from "./Item";
import { findNode, findEmptyNode } from "./nodeTree";
import { setInitId } from "./Item";
import { message } from 'antd';
export default function handleState(state, {
  type,
  payload = {}
}) {
  const config = { ...state.config
  };
  const copyList = [...state.copyList];
  const typeMap = {
    save() {
      return { ...state,
        ...payload
      };
    },

    initConfig() {
      return { ...state,
        config: payload.originConfig,
        name: payload.title,
        fields: payload.fields.map(f => f.field || f)
      };
    },

    addLayout() {
      const index = config.items.length + 1;
      const {
        id = index,
        ...rest
      } = payload;
      config.items.splice(id - 1, 0, new Item(JSON.parse(JSON.stringify(rest))));
      return { ...state,
        config: config
      };
    },

    insertLayout() {
      config.items.push(new Item(JSON.parse(JSON.stringify(payload))));
      return { ...state,
        config: config
      };
    },

    rowMoveUp() {
      if (config.items.length < 2) return state;
      const index = config.items.findIndex(row => {
        return row === payload;
      });
      const arr = config.items;

      if (index > 0) {
        [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
        return { ...state,
          config: config
        };
      } else {
        return state;
      }
    },

    rowMoveDown() {
      if (config.items.length < 2) return state;
      const index = config.items.findIndex(row => {
        return row === payload;
      });
      const arr = config.items;

      if (index < config.items.length) {
        [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
        return { ...state,
          config: config
        };
      } else {
        return state;
      }
    },

    editRowValue() {
      const {
        id,
        value
      } = payload;
      const node = findNode(id, config);
      node.value = value;

      if (node.value.length > node.items.length) {
        node.items.splice(node.items.length, 0, ...Array(node.value.length - node.items.length));
      } else if (node.value.length !== node.items.length) {
        node.items.splice(node.value.length);
      }

      return { ...state,
        config: config
      };
    },

    delRow() {
      const {
        id
      } = payload;
      config.items = config.items.filter(cfg => cfg.id !== id);

      if (config.items.length === 0) {
        setInitId(1, 1);
      }

      return { ...state,
        config: config
      };
    },

    addElement() {
      const {
        layoutId,
        ...rest
      } = payload;
      const node = findNode(layoutId, config);
      node.items[payload.index] = new Item({ ...rest,
        parentId: node.id
      });
      return { ...state,
        config: config
      };
    },

    insertElement() {
      const node = findEmptyNode(config);

      if (!node.id) {
        // id === 0 or undefined
        return state;
      }

      const index = node.items.findIndex(e => !e);
      node.items[index] = new Item({ ...payload,
        parentId: node.id,
        index
      });
      return { ...state,
        config: config
      };
    },

    editElement() {
      const node = findNode(payload.parentId, config);
      node.items[payload.index] = payload;
      return { ...state,
        config: config
      };
    },

    delElement() {
      const node = findNode(payload.id, config);
      const rst = {};

      if (node.items[payload.index].id === state.current.id) {
        rst.current = {};
      }

      node.items[payload.index] = undefined;
      return { ...state,
        ...rst,
        config: config
      };
    },

    copyElement() {
      const {
        id,
        index,
        parentId,
        ...rest
      } = payload;
      return { ...state,
        copyList: [...copyList, JSON.parse(JSON.stringify(new Item(rest)))]
      };
    },

    pasteElement() {
      const {
        layoutId,
        index
      } = payload;

      if (copyList.length > 0) {
        const node = findNode(layoutId, config);
        node.items[index] = new Item({ ...copyList[copyList.length - 1],
          index,
          parentId: node.id
        });
        return { ...state,
          config: config
        };
      } else {
        message.info('暂无可粘贴的内容');
        return state;
      }
    },

    delCopyElement() {
      const {
        id
      } = payload;
      return { ...state,
        copyList: [...copyList.filter(cfg => cfg.id !== id)]
      };
    },

    currentEdit() {
      return { ...state,
        current: payload
      };
    },

    // 字段
    appendField() {
      const {
        fields
      } = state;
      fields.push(`field_${fields.length + 1}`);
      return { ...state,
        fields: [...fields]
      };
    },

    saveFields() {
      return { ...state,
        fields: [...payload]
      };
    },

    removeFieldIndex() {
      const {
        fields
      } = state;
      const {
        index
      } = payload;
      fields.splice(index, 1);
      return { ...state,
        fields: [...fields]
      };
    },

    defaults() {
      console.log('未定义的方法: ', type);
      return state;
    }

  };
  return (typeMap[type] || typeMap['defaults'])();
}