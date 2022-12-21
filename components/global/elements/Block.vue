<template>
	<div class="bg-white pd-big radius-medium">
		<div class="w-100 flex-nojustify flex-center flex-nowrap flex"> 
			<h3 class="mn-r-small">{{title}}</h3>
			<button v-if="action" @click="action.method" class="button-square button">{{action.text}}</button>
		</div>

		<slot></slot>

		<button  v-if="subaction" @click="subaction.method" class="w-100 button">{{subaction.text}}</button>
	</div>
</template>


<script setup="props">
	import { ref } from 'vue'

	const props = defineProps({
	  title: String,
	  action: Object,
	  subaction: Object,
	})
</script>

<style lang="scss">
</style>


