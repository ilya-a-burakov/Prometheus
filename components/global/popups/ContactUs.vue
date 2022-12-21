<template>
	<transition name="scale">
		<div v-if="form.status"  class="popup-wrapper">
			
			<section class="backcall t-center popup">
				<!-- Close Popup -->
				<button @click="Store.applications.toggleForm()" class="button-close-popup button"><img src="@/assets/icons/cross.svg"></button>
				<!-- Popup Header -->
				<h2 class="mn-semi">Book a workshop</h2>
				<!-- Popup Form -->
				<div class="mn-semi">
					<p class="mn-big t-transp p-big">Enter the phone number and our manager will contact you within 5 minutes to confirm the date and time.</p> 

					<div class="mn-small input-tel input">
						<input type="tel" class="mn-center input-text input"  :placeholder="'Enter your phone number'" :value="form.data.phone">
					</div>
				</div>
				<!-- Popup Send -->
				<ButtonSend :submit="onSubmit" :callback="afterSubmit">Call Me</ButtonSend>
			</section>  

			<div 
				@click="Store.applications.toggleForm()" 
				:class="{'active':form.status === true}" 
				class="color-overlay">
			</div>
		</div>
	</transition>
</template>

<script setup>
// Import components
import InputPhone  from 'prometheus/components/global/elements/InputPhone.vue'
import ButtonSend  from 'prometheus/components/global/elements/ButtonSend.vue'
// Import libs
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Import store
import * as Store from '@/store';
// Accessing router and store
const route = useRoute()
const router = useRouter()
// Accessing state
const form = computed(() => Store.applications.state.form)
// Methods
async function onSubmit() {
	const formFilled = { phone: Store.state.form.data.phone }
  
  Store.applications.create(formFilled)
} 

async function afterSubmit() {
	Store.applications.toggleForm()
} 
</script>

<style lang="scss">
	.backcall {
		max-width: 32rem;
	}
</style>
