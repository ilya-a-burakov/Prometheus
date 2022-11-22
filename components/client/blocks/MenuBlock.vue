<template>
	<li @click="(url ? router.push('/catalog/' + url ) : '')" class="pd-big">
		<span class="mn-small h3">{{name}}</span>
		<span v-if="description" class="p-medium">{{description}}</span>
		<img src="@/assets/images/menu/arrow.svg">
	</li>
</template>


<script setup>
	import { useRouter } from 'vue-router'
	
	
	const router = useRouter()

	const props = defineProps({
		name: String,
		description: String,
		url: String
	})


</script>

<style lang="scss">
</style>


