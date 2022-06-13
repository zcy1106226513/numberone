import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入 ElementUI 和配套样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局的样式表（自己的样式表要放在 element 样式表的后面）
import './assets/global.less'
import './assets/fonts/iconfont.css'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor /* { default global options } */)
// 把 ElementUI 安装为 Vue 的插件
// 安装完成之后，每个 .vue 组件中，就可以直接使用 ElementUI 提供的组件啦
Vue.use(ElementUI)

// ESLint 只能检查出代码风格上的问题
// ESLint 不负责检查代码逻辑上的错误
Vue.config.productionTip = false

// 在实际开发中，优先考虑定义常量
// 当需要重新赋值的时候，再考虑把 const 替换为 let
let arr = [1, 2, 3]
arr = ['a', 'b', 'c']
console.log(arr)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
