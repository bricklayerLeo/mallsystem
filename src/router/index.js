import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login.vue'
import home from '@/components/home.vue'
import users from '@/components/users.vue'
import welcome from '@/components/welcome.vue'
import right from '@/components/rights/right.vue'
import role from '@/components/rights/role.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'login',
      path: '/login',
      component:login
    },
    {
      name:'home',
      path: '/',
      component:home,
      redirect:'/welcome',
      children:[
        {
          name:'welcome',
          path: '/welcome',
          component:welcome,
        },
        {
          name:'users',
          path: '/users',
          component:users,
        },
        {
          name:'right',
          path: '/right',
          component:right,
        },
        {
          name:'role',
          path: '/role',
          component:role,
        }
      ]
    }
  ]
})
