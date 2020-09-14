export default {
  OneMany: function (field, config) {
    const {
      options
    } = field;
    const {
      base,
      advanced,
      table
    } = options; // const { path } = base;

    const oneManyObj = {
      layout: 'Content',
      component: 'BaseList',
      config: {
        // itemsField: options.field.value,
        API: {
          listAPI: options.config.API.value,
          deleteAPI: `${options.config.API.value}/(id)`
        },
        oneMany: {
          tableName: advanced.tableName.value,
          field: advanced.field.value
        },
        actions: [],
        fields: table.map(f => ({
          label: f.label,
          field: f.value
        })),
        operation: []
      }
    }; // CRUD 型 一对多

    const addModalFields = [];
    const editModalFields = [];
    table.forEach(f => {
      const {
        options = {}
      } = f;
      const {
        type,
        echoAdd,
        echoEdit,
        options: opt
      } = options;

      if (type) {
        if (echoAdd) {
          addModalFields.push({
            label: f.label,
            field: f.value,
            type: type,
            options: opt
          });
        }

        if (echoEdit) {
          editModalFields.push({
            label: f.label,
            field: f.value,
            type: type,
            options: opt
          });
        }
      }
    });
    oneManyObj.config.actions.push({
      title: '添加数据',
      type: 'modal',
      options: {
        modalTitle: '添加数据',
        modalWidth: 880,
        items: [{
          layout: 'Empty',
          component: 'Form',
          config: {
            API: {
              createAPI: options.config.API.value
            },
            layout: 'Grid',
            layoutConfig: {
              value: [12, 12]
            },
            fields: addModalFields
          }
        }]
      }
    });
    oneManyObj.config.operation.push({
      title: '编辑',
      type: 'modal',
      options: {
        outside: true,
        modalTitle: '编辑数据',
        modalWidth: 880,
        layout: 'Content',
        items: [{
          layout: 'Empty',
          component: 'Form',
          config: {
            API: {
              getAPI: `${options.config.API.value}/(id)`,
              updateAPI: `${options.config.API.value}/(id)`
            },
            layout: 'Grid',
            layoutConfig: {
              value: [12, 12]
            },
            fields: editModalFields
          }
        }]
      }
    }, {
      title: '删除',
      type: 'delete',
      options: {
        icon: 'delete',
        color: '#f5222d'
      }
    });
    config.items.push(oneManyObj);
  }
};