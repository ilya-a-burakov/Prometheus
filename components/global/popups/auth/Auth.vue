<template>
	<transition name="scale">
		<div v-if="signin.isOpen" class="popup-wrapper">
			<transition name="scale"> 
				<SignIn v-if="!signin.signup && signin.isOpen" />
			</transition>

			<transition name="scale">
				<SignUp v-if="signin.signup" />
			</transition>

			<transition name="scale">
				<SignUpCode v-show="signup.code.isSended && !signup.code.isValid" />
			</transition>

			<transition name="scale">
				<SignUpPass v-show="signup.code.isValid"/>
			</transition>

			<div 
		    @click="toggleSignInPopup()" 
		    :class="{'active':signin.isOpen === true}" 
		    class="color-overlay">
			</div>
		</div>

	</transition>

</template>

<script setup>
	// Import components
import { default as SignIn } from '@/components/global/popups/auth/SignIn.vue'
import { default as SignUp } from '@/components/global/popups/auth/SignUp.vue'
import { default as SignUpCode } from '@/components/global/popups/auth/SignUpCode.vue'
import { default as SignUpPass } from '@/components/global/popups/auth/SignUpPass.vue'
// Import libs
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
// Accessing router and store
const store = useStore()
const route = useRoute()
const router = useRouter()
// Accessing state
const user = computed(() => store.state.user)
const signin = computed(() => store.state.signin)
const signup = computed(() => store.state.signup)
// Input Validation
const errorPhone = computed(() => {
	return store.state.user.phone.length < 17 ? "Заполните поле телефона" : ''
})
const errorPassword = computed(() => {
	return store.state.user.password.length > 4 ? "Заполните поле пароля" : ''
})
// Methods
function onSubmit() {
  store.dispatch('users/login', store.state.user).then(() => {
		// router.push({ name: 'Account'}).then(() => {
				store.dispatch("openSignInPopup");
				store.dispatch('resetSignIn')
			// })
	})
} 
</script>

<style lang="scss">
</style>
