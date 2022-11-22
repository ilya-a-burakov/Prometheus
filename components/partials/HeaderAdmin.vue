<template>
	<header>
			<a href="#" class="logo-link flex-nojustify flex-nowrap flex-center flex">
				<img class=" mn-r-small i-regular" src="@/assets/logo.svg">
				<p class="flex "><span class="h4">Admin</span></p>
			</a>

			<ul class="navigation">

			<li :class="{'active':route.path.includes('categories')}"  class="text-middle text text-500 ">
				<router-link to="/admin/categories">
					Категории
				</router-link>
			</li>
			<li :class="{'active':route.path.includes('products')}"   class="text-middle text text-500 ">
				<router-link to="/admin/products">
					Товары
				</router-link>
			</li>
			<li :class="{'active':route.path.includes('backcalls')}"   class="text-middle text text-500 ">
				<router-link to="/admin/backcalls">
					Обратный звонок
					</router-link>
			</li>
			<li :class="{'active':route.path.includes('orders')}"   class="text-middle text text-500 ">
				<router-link to="/admin/orders">
					Заказы
					</router-link>
			</li>
			<li :class="{'active':route.path.includes('loss')}"   class="text-middle text text-500 ">
				<router-link to="/admin/leftovers">
					Остатки
				</router-link>
			</li>
			<li :class="{'active':route.path.includes('pages')}"   class="text-middle text text-500 ">
				<router-link to="/admin/pages">
					Страницы
				</router-link>
			</li>
			<li :class="{'active':route.path.includes('users')}"   class="text-middle text text-500 ">
				<router-link to="/admin/users">
					Пользователи
				</router-link>
			</li>
			<li   class="text-middle text text-500 ">
				<TestButton></TestButton>
			</li>
			
		</ul>
	</header>
	
</template>

<script setup>

	import { computed, toRef, onMounted, watch } from 'vue'

	import { useRoute } from 'vue-router'

	const route = useRoute()
</script>

<style lang="scss" scoped>
header {
	
	width: 33vh;
	// color: white;
	background: #e3dfdc;

	.logo-link {
		padding: 1rem;
		// border-bottom: 1px solid rgba(0,0,0,0.1);
		background: rgba(0,0,0,0.1);
	}

	.navigation {
		padding: 1rem;
		width: 100%;
		display: flex;
		flex-direction: column;

		li {
			padding: 1rem;
			background: transparent;

			border-radius: 0.5rem;

			// margin-bottom: 1rem;
			width: 100%;

			font-size: 1.25rem;


			


			&.active {
				background: white;
				font-weight: 600;
			}
		}
	}
}	
</style>