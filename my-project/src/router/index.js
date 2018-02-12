import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login'
import admin from '@/components/admin'
import contactus from '@/components/contactus'
import updatePwd from '@/components/updatePwd'
import recruitment from '@/components/recruitment'
import newsDetail from '@/components/newsDetail'
import newsList from '@/components/newsList'
import recruitmentDetail from '@/components/recruitmentDetail'
Vue.use(Router)
export default new Router({
   mode: 'history',
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      children:[
      {
        path: '/newsList',
        name: 'newsList',
        component: newsList,
      },
       {
        path: '/newsDetail:num',
        name: 'newsDetail',
        component: newsDetail,
      },
      {
        path: '/contactus',
        name: 'contactus',
        component: contactus,
      },
      {
        path: '/updatePwd',
        name: 'updatePwd',
        component: updatePwd,
      },
      {
        path: '/recruitment',
        name: 'recruitment',
        component: recruitment,
      },
      {
        path: '/recruitmentDetail:id',
        name: 'recruitmentDetail',
        component: recruitmentDetail,
      }
      ]
    },
    {
      path: '/',
      name: 'login',
      component: login
    }
  ]
})
