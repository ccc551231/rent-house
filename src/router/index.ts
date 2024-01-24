import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ()=> import('../views/front/frontView.vue'),
      children: [
        {
          //首頁
          path: 'home',
          component: ()=>import('../views/front/homeView.vue')
        },
        {
          //詳細商品頁
          path: 'product-list/product/:id',
          component: () => import('../views/front/productView.vue')
        },

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { title: '登入' },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/BackNav.vue'),
      children: [
        {
          path: 'product',
          name: 'product',
          component: () => import('../views/Back/BackProduct.vue'),
          meta: { title: '商品管理' },
        }
      ]
    }
  ]
})

export default router
