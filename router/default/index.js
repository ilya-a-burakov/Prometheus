const {
	createRouter,
	createMemoryHistory,
	createWebHistory,
} = require('vue-router');

const isServer = typeof window === 'undefined';

let history = isServer ? createMemoryHistory() : createWebHistory();


import layoutClient from '/src/layout/client.vue'
import layoutAdmin from '/src/layout/admin.vue'


const routes = 
	[{
	 	path: '/',
		component: layoutClient,
		meta: {},
		children: [{
			path: '/',
			name: 'Home',
			component: () => import(/* webpackChunkName: 'Home' */ '../pages/Home.vue')
		},
		{
			path: '/catalog',
			name: 'Catalog',
			component: () => import(/* webpackChunkName: 'Catalog' */ '../pages/Catalog.vue')
		},
		{
			path: '/catalog/:url',
			name: 'CatalogCategory',
			component: () => import(/* webpackChunkName: 'CatalogCategory' */ '../pages/Catalog.vue')
		},
		{
			path: '/catalog/:url/:id',
			name: 'CatalogSubCategory',
			component: () => import(/* webpackChunkName: 'CatalogCategory' */ '../pages/Catalog.vue')
		},
		{
			path: '/catalog/products/:id',
			name: 'Product',
			component: () => import(/* webpackChunkName: 'Product' */ '../pages/Product.vue')
		},
		{
			path: '/order',
			name: 'Order',
			component: () => import(/* webpackChunkName: 'Order' */ '../pages/Order.vue')
		},
		{
			path: '/account',
			name: 'Account',
			component: () => import(/* webpackChunkName: 'Account' */ '../pages/Account.vue'),
			meta: { authorize: [] }, 
		},{
			path: '/pages/:url',
			name: 'Page',
			component: () => import(/* webpackChunkName: 'Page' */ '../pages/Page.vue')
		}]
	},
	{
	 	path: '/admin/',
		component: layoutAdmin,
		meta: {},
		children: [{
			path: 'categories',
			name: 'Categories',
			component: () => import(/* webpackChunkName: 'Categories' */ '../pages/admin/Categories.vue')
		},
		{
			path: 'categories/add',
			name: 'AddCategory',
			component: () => import(/* webpackChunkName: 'AddCategory' */ '../pages/admin/AddCategory.vue')
		},
		{
			path: 'categories/:url/edit',
			name: 'EditCategory',
			component: () => import(/* webpackChunkName: 'EditCategory' */ '../pages/admin/AddCategory.vue')
		},{
			path: 'products',
			name: 'Products',
			component: () => import(/* webpackChunkName: 'Products' */ '../pages/admin/Products.vue')
		},
		{
			path: 'products/add',
			name: 'AddProduct',
			component: () => import(/* webpackChunkName: 'ProductPageAdd' */ '../pages/admin/ProductEdit.vue')
		},
		{
			path: 'products/:id/edit',
			name: 'ProductEdit',
			component: () => import(/* webpackChunkName: 'ProductPageEdit' */ '../pages/admin/ProductEdit.vue')
		},{
			path: 'backcalls',
			name: 'Backcalls',
			// meta: { authorize: ["ROLE_MODERATOR"] }, 
			component: () => import(/* webpackChunkName: 'Backcalls' */ '../pages/admin/Backcalls.vue')
		},{
			path: 'orders',
			name: 'Orders',
			// meta: { authorize: ["ROLE_MODERATOR"] }, 
			component: () => import(/* webpackChunkName: 'Orders' */ '../pages/admin/Orders.vue')
		},{
			path: 'orders/:id',
			name: 'AdminOrder',
			component: () => import(/* webpackChunkName: 'AdminOrders' */ '../pages/admin/Order.vue')
		},{
			path: 'leftovers',
			name: 'Leftovers',
			// meta: { authorize: ["ROLE_MODERATOR"] }, 
			component: () => import(/* webpackChunkName: 'Leftovers' */ '../pages/admin/Leftovers.vue')
		},{
			path: 'leftovers/add',
			name: 'LeftoverAdd',
			// meta: { authorize: ["ROLE_MODERATOR"] }, 
			component: () => import(/* webpackChunkName: 'LeftoverEdit' */ '../pages/admin/LeftoverAdd.vue')
		},{
			path: 'leftovers/:id',
			name: 'LeftoverEdit',
			// meta: { authorize: ["ROLE_MODERATOR"] }, 
			component: () => import(/* webpackChunkName: 'LeftoverEdit' */ '../pages/admin/LeftoverAdd.vue')
		},{
			path: 'pages',
			name: 'Pages',
			// meta: { authorize: ["ROLE_MODERATOR"] }, 
			component: () => import(/* webpackChunkName: 'Pages' */ '../pages/admin/Pages.vue')
		},{
			path: 'pages/add',
			name: 'PageAdd',
			// meta: { authorize: ["ROLE_MODERATOR"] }, 
			component: () => import(/* webpackChunkName: 'PageAdd' */ '../pages/admin/PageEdit.vue')
		},{
			path: 'pages/:url',
			name: 'PageEdit',
			// meta: { authorize: ["ROLE_MODERATOR"] }, 
			component: () => import(/* webpackChunkName: 'PAgeEdit' */ '../pages/admin/PageEdit.vue')
		},{
			path: 'users',
			name: 'Users',
			component: () => import(/* webpackChunkName: 'Users' */ '../pages/admin/Users.vue')
		},{
			path: 'users/:phone',
			name: 'User',
			component: () => import(/* webpackChunkName: 'User' */ '../pages/admin/User.vue')
		}]
	}
];



export function _createRouter() {
	return createRouter({ routes, history });
}
