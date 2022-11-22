<template>
	<div class="error-wrapper">
		<div class="error-card">
			<p>Ошибка {{error.status}} </p>
			<!-- <p>{{error.data.message}}</p> -->
			<button @click="closeError()" class="button-cross button-icon-medium button"><img src="@/assets/icons/cross.svg"></button>
		</div>
	</div>
</template>


<script setup="props">
	import { defineProps,computed } from 'vue'
	import { useStore } from 'vuex'

	const store = useStore()
	
	const props = defineProps({
	  error: Object
	})

	function closeError () {
		store.state.error.show = false;
		// store.commit('closeErrorNotification')
	} 
</script>

<style lang="scss">
</style>


