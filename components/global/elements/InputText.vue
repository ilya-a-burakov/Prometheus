<template>
	<label class="mn-small input-text-label">
    <span class="t-transp p-small">{{label}}</span>
    <input v-if="!textarea"
      @input="updateInputText(obj, prop, $event)" 
      :value="value" 
      :placeholder="placeholder ? placeholder : 'Please fiil'"
      class="input-text input"
    />
    <textarea v-if="textarea"
      @input="updateInputText(obj, prop, $event)" 
      :value="value" 
      :placeholder="placeholder ? placeholder : 'Please fiil'"
      class="input-textarea input-text input"
    />
  </label>
</template>


<script setup="props">
	import { defineProps,computed } from 'vue'
	import { useStore } from 'vuex'


	const store = useStore()
	const props = defineProps(
	  ['obj','label','prop','value','textarea','placeholder']
	)
</script>

<style lang="scss">
</style>


