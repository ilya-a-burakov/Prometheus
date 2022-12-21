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
  import * as Store from '@/store';
	const props = defineProps({
	  error: Object
	})

	function closeError () {
		Store.global.state.error.show = false;
		// store.commit('closeErrorNotification')
	} 
</script>

<style lang="scss">
</style>


