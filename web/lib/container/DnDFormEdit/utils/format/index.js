import unusualType from "./unusualType";
export default function formatToConfig(cfg, formName, opt) {
  const {
    items = []
  } = cfg;
  const {
    layoutType
  } = opt;
  const unusualFields = [];
  const fields = [].concat(...items.map(row => row.items));
  const filterFields = fields.filter(field => {
    if (field && unusualType[field.type]) {
      unusualFields.push({
        field,
        func: unusualType[field.type]
      });
      return false;
    }

    return true;
  });
  const config = {
    layout: 'BaseTitle',
    title: formName || '表单',
    items: []
  };
  let count = 0;
  config.items.push({
    layout: 'Content',
    component: 'Form',
    config: {
      layout: 'Grid',
      layoutConfig: {
        layoutType: layoutType,
        // horizontal vertical
        layoutArea: [].concat(...items.map(row => ({
          layout: row.type,
          length: row.value.length,
          value: row.value
        })))
      },
      fields: filterFields.map(field => {
        if (!field) {
          return {
            label: '',
            field: `empty_${count++}`,
            type: 'empty'
          };
        }

        const {
          options = {}
        } = field;
        const {
          base = {}
        } = options;
        const rst = {
          label: base.label && base.label.value || '',
          field: field.options.field.value,
          value: formatToValue(base),
          type: formatToType(field.type),
          props: {
            style: formatToStyle(field.options.style),
            placeholder: formatToPlaceholder(base)
          },
          rules: formatToRules(field.options.rules),
          options: formatToOptions(field.options.config),
          expect: formatToExpect(field.options.expect)
        };

        if (field.options.items) {
          rst.options = field.options.items;
        }

        return rst;
      })
    }
  });
  unusualFields.forEach(cfg => {
    cfg.func(cfg.field, config);
  });
  return [config, pureFields(fields)];
}

function formatToType(type) {
  return type.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase();
}

function formatToStyle(style) {
  if (!style) return undefined;
  const rst = {};
  Object.keys(style).forEach(key => {
    rst[key] = style[key].value;
  });
  return rst;
}

function formatToPlaceholder(base) {
  if (!base.placeholder) return undefined;
  return base.placeholder.value;
}

function formatToValue(base) {
  if (!base.value) return undefined;
  return base.value.value;
}

function formatToRules(rules) {
  if (!rules || !Object.keys(rules).length) return undefined;
  return Object.values(rules).map(item => {
    const {
      value,
      message
    } = item;

    if (value && message) {
      return {
        type: value,
        message
      };
    }

    return item.value;
  }).filter(i => i);
}

function formatToOptions(options) {
  if (!options || !Object.keys(options).length) return undefined;
  const rst = {};
  Object.keys(options).map(key => {
    rst[key] = options[key].value;
  });
  return rst;
}

function formatToExpect(expect) {
  if (expect && expect.field) {
    return {
      field: expect.field.value,
      value: expect.value.value
    };
  }

  return undefined;
}
/**
 * 返回有效的字段列表
 *
 * @param {Array} fields
 * @returns
 */


function pureFields(fields) {
  return fields.filter(i => i).map(item => ({
    label: item.options.base.label && item.options.base.label.value || '',
    field: item.options.field.value
  }));
}