<template>
	<!-- ---------------------------------------------------------------- -->
	<!-- 01. Page Title  -->
	<!-- ---------------------------------------------------------------- -->
	<section class="pageheader section">
		<div class="mn-big title">
			<h1 v-if="route.params.url">Редактировать категорию</h1>
			<h1 v-else>Добавить категорию</h1>
		</div>
	</section>
	
	<!-- ---------------------------------------------------------------- -->
	<!-- 03. Page Content  -->
	<!-- ---------------------------------------------------------------- -->
	<section class=" bg-grey br-bot-dark section-subsection section">

		<form>
			<!-- ---------------------------------------------------------------- -->
			<!-- Category Info -->
			<!-- ---------------------------------------------------------------- -->
			<div class="mn-big flex-column flex block">
				<div class="w-100 flex-nowrap flex">
					<InputText :obj="'categories'" :prop="'current.url'" :value="category.url" label="URL категории"/>
					<InputText :obj="'categories'" :prop="'current.name'" :value="category.name" label="Название"/>
				</div>
			</div>
			<!-- Subcategories -->
			<EditCategories :category="category" />
			<!-- Filters -->
			<EditFilters :category="category" />
			<!-- Sumbmit  -->
			<a @click="onSubmit()" class="button">Сохранить</a> 
		</form>
		<!-- End of page form -->
	</section>  
	<!-- End of page content -->
</template>

<script setup>
	// Import components
	import InputText  from '@/components/global/elements/InputText.vue'
	import EditCategories  from '@/components/global/blocks/EditCategories.vue'
	import EditFilters  from '@/components/global/blocks/EditFilters.vue'
	// Import libs
	import { computed, onMounted } from 'vue'
	import { useStore } from 'vuex'
	import { useRoute } from 'vue-router'
	// Accessing router and store
	const store = useStore()
	const route = useRoute()
	// Data prefetching
	if (route.params.url) {
  	store.dispatch('categories/fetchCategory', route.params.url)
  } else {
  	await store.commit('categories/cleanCategoryState')
  }
	// Accessing state
	const category = computed(() => store.state.categories.current)
	const routePath = computed(() => route.name)
	// Filters and subcategory
	function onSubmit() {
    if (route.params.url) {
    	store.dispatch('categories/updateCategory', route.params.url)
  	} else {
  		store.dispatch('categories/addCategory')
  	}
	}
</script>

<style lang="scss">

</style>
