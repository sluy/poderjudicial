
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue'), name: 'login' },
      { path: '/signup', component: () => import('pages/Signup.vue'), name: 'signup' },
      { path: '/signout', component: () => import('pages/Signout.vue'), name: 'signout' },
      { path: '/user', component: () => import('pages/User.vue'), name: 'user' },
      { path: '/admin', component: () => import('pages/Admin.vue'), name: 'admin'}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
