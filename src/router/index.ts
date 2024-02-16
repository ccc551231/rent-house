import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home' // 重定向到首页
    },
    {
      path:'/home',
      name: 'home',
      component:()=>import('@/views/front/homeView.vue'),
      meta:{
        isFront:true,
        showHeader:true,
        showFooter:true
      }
    },
    {
      //詳細商品頁
      path:'/product-list/product/:id',
      component:()=>import('@/views/front/productView.vue'),
      meta:{
        title: '個人頁',
        isFront:true,
        showHeader:true,
        showFooter:true
      }
    },
    {
      path: '/search',
      component: ()=>import('@/views/front/searchProduct.vue'),
      meta: { 
      title: '商品頁',
      isFront:true,
      showHeader:true,
      showFooter:true
    }
    },
    {
        path: '/category/:id?',
        component: ()=>import('@/views/front/categoryView.vue'),
        meta: { 
          title: '分類頁',
          isFront:true,
          showHeader:true,
          showFooter:true
        },
    },
    {
      path:'/bookmark',
          component: ()=>import('@/views/front/bookMarkView.vue'),
          meta:{
            title:'我的收藏',
            isFront:true,
            showHeader:true,
            showFooter:true
          }
    },
    {
      path:'/content',
          component: ()=>import('@/views/front/contentView.vue'),
          meta:{
            title:'聯絡業主',
            isFront:true,
            showHeader:true,
            showFooter:true
          }
    },
    {
      path: '/back',
      redirect: '/login',
      name: 'admin',
      meta:{
        title: '登入',
        showBackHeader:true,
        showFooter:true
      },
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/Back/LoginView.vue'),
          meta: { 
            title: '登入',
            //會無限循環所以不能寫
            // isBack:true,
            showBackHeader:false,
            showFooter:false
           },
        },
        {
          path: 'product',
          name: 'product',
          component: () => import('@/views/Back/BackProduct.vue'),
          meta: { 
            title: '商品管理',
            isLogin: true,
            isBack:true,
           },
        },
        {
          path:'order',
          name:'order',
          component:()=>import('@/views/Back/BackOrder.vue'),
          meta:{
            title:'訂單管理',
            isLogin: true,
            isBack:true
          }
        }
      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  const token = sessionStorage.getItem('token');
  //如果沒有token的情況
  if( to.meta.isBack && !token){
    // 如果用户未登录，则重定向到登录页面，并且把当前页面路径作为参数传递给登录页面，以便登录后可以跳转回来
    next('/login?redirect=' + to.fullPath);

  }else{
    next()
  }
})

export default router
