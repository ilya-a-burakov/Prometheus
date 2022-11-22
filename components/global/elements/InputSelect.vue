<template>
	<label class="mn-small input-text-label">
    <span class="t-transp p-small">{{label}}</span>
    <select 
      @input="updateInputText(obj, prop, $event)" 
      :value="value" 
      class="mn-small input-text input" 
    >	
    	<slot>
    		
    	</slot>
	  </select>
  </label>
</template>


<script setup="props">
	import { defineProps,computed } from 'vue'
	import { useStore } from 'vuex'


	const store = useStore()
	const props = defineProps({
	  obj: String,
		label: String,
	  prop: String,
	  value: Object,
	})
</script>

<style lang="scss">
</style>


