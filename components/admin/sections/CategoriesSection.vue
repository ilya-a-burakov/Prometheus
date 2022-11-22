<template>
	<section class="categories section">
		<CategoryCard  v-for="category in categories" :category="category" :key="category" class="mn-medium"></CategoryCard>
	</section>
</template>

<script setup>
  // Import libs
  import { computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  // Import components
  import CategoryCard from '@/components/admin/blocks/CategoryCard.vue';
  // Accessing router and store
  const store = useStore()
  const route = useRoute()
  // Data prefetching
  store.dispatch('categories/fetchCategories')
  // Accessing state
  const categories = computed(() => store.state.categories.all)
  
</script>

<style lang="scss">
.categories {
  border-top: 1px solid rgba(0,0,0,0.1);
}
</style>
