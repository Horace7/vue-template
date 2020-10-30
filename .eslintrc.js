module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 解决Expected an assignment
    'no-unused-expressions': 0,
    'new-cap': 'off', // 关闭eslint关于构造对象首字母大小写的问题
    "no-unused-vars": ['warn', {
      // 允许声明未使用变量
      "vars": "local",
      // 参数不检查
      "args": "none"
    }],
     // 空行最多不能超过100行
    "no-multiple-empty-lines": ['warn', {"max": 100}],
    // 关闭禁止混用tab和空格
    "no-mixed-spaces-and-tabs": ['warn']
  }
}
