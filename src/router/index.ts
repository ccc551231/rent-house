import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: ()=> import('../views/front/frontView.vue'),
      meta:{title: '首頁'},
      children: [
        {
          //首頁
          path: 'home',
          component: ()=>import('../views/front/homeView.vue'),
          name: 'home'
        },
        {
          //詳細商品頁
          path: 'product-list/product/:id',
          component: () => import('../views/front/productView.vue'),
          meta:{title: '個人頁'}
        },
        {
          path: 'search/',
          component: ()=>import('../views/front/searchProduct.vue'),
          meta: { title: '商品頁' },
        },
        {
          path: 'category/:id?',
          component: ()=>import('../views/front/categoryView.vue'),
          meta: { title: '分類頁' },
        },
        {
          path:'bookmark',
          component: ()=>import('../views/front/bookMarkView.vue'),
          meta:{title:'我的收藏'}
        },
        {
          path:'content',
          component: ()=>import('../views/front/contentView.vue'),
          meta:{title:'聯絡業主'}
        }

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
      redirect: '/login',
      name: 'admin',
      component: () => import('../views/BackNav.vue'),
      meta:{title: '登入'},
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
