<template>
	<transition name="scale">
		<div v-if="backcall.status"  class="popup-wrapper">
			<section class="backcall t-center popup">
				<!-- Close Popup -->
				<button @click="store.commit('toggleBackCall')" class="button-close-popup button"><img src="@/assets/icons/cross.svg"></button>
				<!-- Popup Header -->
				<h2 class="mn-semi">Book a workshop</h2>
				<!-- Popup Form -->
				<div class="mn-semi">
					<p class="mn-big t-transp p-big">Enter the phone number and our manager will contact you within 5 minutes to confirm the date and time.</p> 

					<div class="mn-small input-tel input">
						<input type="tel" class="b-center input-text input"  :placeholder="'Enter your phone number'" @input="updateInputText( 'backcall', 'phone', $event)" :value="backcall.phone">
					</div>
				</div>
				<!-- Popup Send -->
				<ButtonSend :submit="onSubmit" :callback="afterSubmit" :validation="!!errorPhone">Call Me</ButtonSend>
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
	// Import components
import InputPhone  from '@/components/global/elements/InputPhone.vue'
import ButtonSend  from '@/components/global/elements/ButtonSend.vue'
// Import libs
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
// Accessing router and store
const store = useStore()
const route = useRoute()
const router = useRouter()
// Accessing state
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
