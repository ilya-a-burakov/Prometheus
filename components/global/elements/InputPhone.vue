<template>
	<label class="mn-small input-text-label">
    <span class="t-transp p-small">Phone*</span>
    <input 
      @input="updateInputTel(obj, prop, $event)" 
      :value="value" 
      placeholder="Your mobile phone"
      class="mn-small input-text input"
			maxlength="17" 
    />
  </label>
</template>


<script setup="props">
	import { defineProps,computed } from 'vue'
	import { useStore } from 'vuex'


	const store = useStore()
	const props = defineProps({
	  obj: String,
	  prop: String,
	  value: Object
	})
</script>

<style lang="scss">
</style>


