export default [{
  title: '一对多关系',
  type: 'OneMany',
  options: {
    field: {},
    base: {
      label: {
        label: '字段名'
      } // path: {
      //   label: '跳转的页面',
      //   type: 'input',
      //   value: '',
      // }

    },
    config: {
      API: {
        label: '一对多的 CRUD API',
        type: 'input',
        value: '/api/crud/demo'
      }
    },
    advanced: {
      sql: {
        label: '关联的 SQL 文件',
        type: 'selectSQL',
        value: ''
      },
      tableName: {
        label: '关联的表',
        type: 'selectTable',
        value: ''
      },
      field: {
        label: '绑定的字段(用于 xml 文件)',
        type: 'selectTableField',
        value: ''
      }
    },
    table: [{
      label: '名称',
      value: 'name',
      options: {
        type: 'plain',
        // plain input number date ...
        echoAdd: true,
        echoEdit: true,
        echoType: true
      }
    } // { label: '性别', value: 'sex' },
    ]
  }
}, {
  title: '下拉框-数字字典',
  type: 'SelectField',
  options: {
    field: {},
    base: {
      label: {
        label: '字段名'
      }
    },
    config: {
      field: {
        label: '数字字典字段'
      }
    },
    rules: {
      required: {
        label: '必填',
        value: undefined
      }
    },
    expect: {}
  }
}, {
  title: '模态框-列表单选',
  type: 'ModalRadio',
  options: {
    field: {},
    base: {
      label: {
        label: '字段名'
      }
    },
    config: {
      title: {
        label: '引导文本',
        value: '选择数据'
      },
      label: {
        label: '展示文本'
      },
      editLabel: {
        label: '编辑时展示文本'
      },
      value: {
        label: '提交的字段'
      },
      API: {
        label: 'API'
      },
      fields: {
        label: '弹出模态框中列表字段',
        type: 'tableField',
        value: [{
          label: '名称',
          field: 'name'
        }, {
          label: '性别',
          field: 'sex'
        }]
      },
      saveData: {
        label: '额外保存选中的数据',
        type: 'saveData',
        tLabel: '把选择的数据的字段',
        tValue: '保存为以下字段'
      }
    },
    rules: {
      required: {
        label: '必填',
        value: undefined
      }
    },
    expect: {}
  }
}, {
  title: '输入框-数据校验',
  type: 'Input',
  options: {
    field: {},
    base: {
      label: {
        label: '字段名'
      }
    },
    rules: {
      required: {
        label: '必填',
        value: undefined
      },
      mail: {
        label: '邮箱',
        value: undefined,
        message: '请输入正确的邮箱格式'
      },
      phone: {
        label: '手机号码',
        value: undefined,
        message: '请输入正确的手机号码格式'
      }
    },
    expect: {}
  }
}, {
  title: '上传文件',
  type: 'UploadFile',
  options: {
    field: {},
    base: {
      label: {
        label: '字段名'
      }
    },
    config: {
      title: {
        label: '引导文本',
        value: '点击上传'
      },
      API: {
        label: '上传 API',
        value: '/api/upload/files'
      },
      max: {
        label: '最大上传数量',
        value: 9
      },
      fileNameField: {
        label: '上传后返回的文件名字段(用于上传单文件时)',
        value: 'fileName'
      }
    },
    rules: {
      required: {
        label: '必填',
        value: undefined
      }
    },
    expect: {}
  }
}];