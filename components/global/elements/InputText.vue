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

  function updateInputText (object, property, event) {
    if (event.target) {
      var element = (event.target.files) ? event.target.files : event.target.value
    } else {
      var element = event
    }
    store.commit('updateInputText', {object, property, element})
  }
</script>

<style lang="scss">
</style>


