const {
	createRouter,
	createMemoryHistory,
	createWebHistory,
} = require('vue-router');

const isServer = typeof window === 'undefined';

let history = isServer ? createMemoryHistory() : createWebHistory();


import layoutClient from '/src/layout/client.vue'


const routes = 
	[{
	 	path: '/',
		component: layoutClient,
		meta: {},
		children: [{
			path: '/',
			name: 'Home',
			component: () => import(/* webpackChunkName: 'Home' */ '../pages/Home.vue')
		}
	}
];



export function _createRouter() {
	return createRouter({ routes, history });
}
