import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入路由相关的组件
import Login from '@/views/Login/Login.vue'
import Reg from '@/views/Reg/Reg.vue'
import Parent from '@/views/Text/Parent'
import Home from '@/views/Home/Home.vue'
import store from '../store/index'
// import Publish from '../views/arts/art-publish'

Vue.use(VueRouter)

// 注意：如果创建的组件，需要通过路由进行展示，则要放到 views 目录下
//       否则，放到 components 目录下
// 路由规则的数组
const routes = [
  // 登录组件的路由规则
  // 路由规则的 path 路径，推荐都使用小写的字母
  { path: '/login', component: Login },
  // 注册组件的路由规则
  { path: '/reg', component: Reg },
  { path: '/parent', component: Parent },
  {
    path: '/',
    component: Home,
    redirect: '/login',
    children: [{
      path: 'home',
      component: () => import('@/views/Index/Index.vue')
    }, {
      path: 'art-cate',
      component: () => import('@/views/arts/art-cate.vue')
    },
    {
      path: 'art-list',
      component: () => import('@/views/arts/art-list.vue')
    },
    {
      path: 'art-publish',
      component: () => import('@/views/arts/art-publish.vue')
    }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  console.log(token)
  if (!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})
export default router
