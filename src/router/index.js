import Vue from 'vue'
import Router from 'vue-router'
import Flow from '@/components/Flow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Flow',
      component: Flow
    }
  ]
})
