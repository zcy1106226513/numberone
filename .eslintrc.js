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
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 注意：只要修改了 src 源代码目录之外的配置文件，为了让最新的配置能够生效，
    //       必须重启打包的服务器（把项目停掉，重新 yarn serve 或 npm run serve 运行一下）
    // 禁用掉这个规则，防止 ESLint 和格式化代码插件之间的冲突
    'space-before-function-paren': 0
  }
}
