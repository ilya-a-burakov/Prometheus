<template>
	<div v-if="isOpen === true" class="bg-grey radius-medium pd-big flex-nowrap flex">
    <button @click="isOpen = false" class="i-thin button-close-popup button"><img src="@/assets/icons/cross.svg"></button>
    <p>
      <span class="t-semi">Already registered?</span><br>
      <span>Log in to your account to checkout faster.</span>
    </p>
    <button @click="toggleSignInPopup()" class="button">Log In</button>
  </div>
</template>


<script setup>
	import { ref } from 'vue'

	let isOpen = ref(true);
</script>

<style lang="scss">
</style>


