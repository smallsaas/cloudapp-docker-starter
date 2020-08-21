const setting = require('./test-setting.json');

module.exports = {
  layout: 'TitleContent',
  title: '编辑' + setting.pageName,
  items: [
    {
      component: 'Form',
      config: {
        API: {
          getAPI: setting.getAPI,
          updateAPI: setting.updateAPI,
        },
        fields: setting.formFields,
      },
    },
  ],
};
