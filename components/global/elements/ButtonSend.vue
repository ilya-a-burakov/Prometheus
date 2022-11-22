<template>
	<button @click="Submit" :disabled="validation" ref="button" class="w-100 button">

		<transition mode="out-in" name="scale">
			<div v-if="loading" class="loading">
	      <img class="i-default" src="@/assets/icons/preloader.svg">
	    </div>
	  </transition>
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <transition mode="out-in" name="scale">
	    <div v-if="finished" class="loading">
	      Sended
	    </div>
    </transition>

    <transition mode="out-in" name="scale">
			<slot v-if="!loading && !error && !finished"></slot>
		</transition>
	</button> 
</template>


<script setup="props">
	import { defineProps,ref } from 'vue'
	import { useStore } from 'vuex'


	const store = useStore()

	const props = defineProps({
	  submit: Function,
	  callback: Function,
	  validation: Boolean,
	})

	var button = ref(null)

	var error =   ref(null)
	var loading = ref(null)
	var finished = ref(null)


	function Submit() {
		button.value.style['pointer-events'] = 'none';
		error.value = null
	  loading.value = true
	  // button.value.style['background-color'] = '#223399';

		props.submit().then(
	    finish => {
	    	button.value.style['background-color'] = '#009911';
	      loading.value = false
	      finished.value = true
	      setTimeout(() =>  props.callback(), 750);
	      
	    },
	    err => {
	     	error.value = err.toString()
	    }
	  );
	}
</script>

<style lang="scss">
</style>


