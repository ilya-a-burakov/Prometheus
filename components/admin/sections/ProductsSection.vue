<template>
		<div class="products">
			<ProductCard v-for="product in products" :product="product" :key="product"></ProductCard>
		</div>
</template>


<script setup>
	import { computed, defineProps,onMounted, watch, toRefs } from 'vue'
	import { useStore } from 'vuex'

	import ProductCard from '@/components/admin/blocks/ProductCard.vue';

	const props = defineProps(['products']);

</script>

<style lang="scss">
	.products {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(340px, 2fr));
		grid-gap: 20px; 
    	grid-auto-rows: auto;

	}
</style>
