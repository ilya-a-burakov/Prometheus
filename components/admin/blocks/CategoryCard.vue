<template>
	<div class="card">
    <div class="flex-center flex">
          <h4>{{category.name}}</h4>
          <div class="actions">
	          <router-link :to="'/admin/categories/' + category.url + '/edit'" class="mn-r-medium nav-link">Редактировать</router-link>
	          <a class="nav-link" @click="deleteCategory(category)">Удалить</a>
	      </div>
     </div>
	</div>
</template>


<script>
	import { toRef,onMounted } from 'vue'
	
	export default {
		props: ['category'], 
		name: 'CategoryCard',
		setup(props) {
			onMounted(() => {
			})

			return {
			}
		},
    methods: {
    	deleteCategory(category) {
		    this.$store.commit('categories/deleteCategory', category);
		    this.$store.dispatch('categories/deleteCategory', category.url)
		}
    }
	}
</script>

<style lang="scss">
.categories-card {

}
</style>


