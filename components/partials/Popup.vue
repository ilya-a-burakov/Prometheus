<template>
	<transition name="scale">
		<div v-if="backcall.status"  class="popup-wrapper">
			<section class="backcall t-center popup">
				<!-- Close Popup -->
				<button @click="store.commit('toggleBackCall')" class="button-close-popup button"><img src="@/assets/icons/cross.svg"></button>
				<!-- Popup Header -->
				<slot></slot>
			</section>  

			<div 
		    @click="store.commit('toggleBackCall')" 
		    :class="{'active':backcall.status === true}" 
		    class="color-overlay">
			</div>
		</div>
	</transition>
</template>

<script setup>
// Import libs
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Accessing router and store
const route = useRoute()
const router = useRouter()
// Accessing state}
const backcall = computed(() => store.state.backcall)
// Input Validation
const errorPhone = computed(() => {
	return store.state.backcall.phone.length < 6 ? "Заполните поле телефона" : ''
})
// Methods
async function onSubmit() {
	const backcall = { phone: store.state.backcall.phone }

	if (route.name === 'Product') backcall.product = route.params.id
  
  await store.dispatch('backcalls/create', backcall)
} 

async function afterSubmit() {
	store.commit('toggleBackCall')
} 
</script>

<style lang="scss">
	.backcall {
		max-width: 32rem;
	}
</style>
