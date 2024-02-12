import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Error from './pages/404.vue'

const router = createRouter({
//vue routing
	history: createWebHistory(import.meta.env.BASE_URL),
	routes:[
		{
			path: '/',
			name: 'Home',

			// alt way is: component: () => import('./pages/...')
			component: Home,
			alias: ['/index.html', '/index.js', '/index', '/home']
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/:any',
			name: 'Not found',
			component: Error
		}
	]
})
router.beforeEach((to, from, next)=>{
	document.title = to.name;
	next();
})
const app = createApp(App);
app.use(router);
/* alternative way of doing that? 
new Vue({
	router,
	render: h => h(App),
  }).$mount('#app')
 */ 
app.mount('#app');
