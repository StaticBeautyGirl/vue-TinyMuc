import Vue from 'vue'
import Router from 'vue-router'
import RichText from '@/components/RichText.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RichText',
      component: RichText
    }
  ]
})
