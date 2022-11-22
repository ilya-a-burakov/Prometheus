<template>
	<li class="product-card">
		{{product.images[0]}}
		<img :src="require( `@/assets/images/products/${product.images[0]}`)">
	</li>
</template>


<script setup="props">
	import { defineProps,computed } from 'vue'
	import { useStore } from 'vuex'

	const store = useStore()
	const props = defineProps(['product'])
</script>

<style lang="scss">
</style>


