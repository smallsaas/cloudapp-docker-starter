const path = require('path');
const fs = require('fs');
const { generateTheme } = require('antd-theme-generator');

const outputFilePath = path.join(__dirname, './public/color.less');

// fs.unlinkSync(outputFilePath);

const options = {
  antDir: path.join(__dirname, './node_modules/antd'),
  stylesDir: path.join(__dirname, './src/config/styles'),
  varFile: path.join(__dirname, './src/config/styles/vars.less'),
  mainLessFile: path.join(__dirname, './src/config/styles/main.less'),
  themeVariables: [
    '@primary-color',
    '@secondary-color',
    '@text-color',
    '@text-color-secondary',
    '@heading-color',
    '@layout-body-background',
    '@btn-primary-bg',
    '@layout-header-background'
  ],
  indexFileName: 'index.html',
  // 输出 less 文件, 浏览器实际引用这个文件来实现样式覆盖
  outputFilePath: outputFilePath,
}

generateTheme(options).then(less => {
})
  .catch(error => {
    console.log('Error', error);
  });