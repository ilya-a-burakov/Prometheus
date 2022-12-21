<template>
	<label class="input-text-label">
    <span class="t-transp p-small">{{label}}</span>
    <input v-if="!textarea"
      @click.stop
      @input="updateInputText(prop, content, $event)" 
      :value="prop[content]" 
      :placeholder="placeholder ? placeholder : 'Please fill'"
      class="input-text input"
    />
    <textarea v-if="textarea"
      @click.stop
      @input="updateInputText(prop, content, $event)" 
      :value="prop[content]" 
      :placeholder="placeholder ? placeholder : 'Please fill'"
      class="input-textarea input-text input"
    />
  </label>
</template>


<script setup="props">
	import { computed, ref } from 'vue'
  import * as Store from '@/store';

	const props = defineProps(
	  ['obj','label','prop','value','content','textarea','placeholder']
	)

  const data = ref(props)

  function updateInputText (prop, content, event) {

    if (event.target) {
      var element = (event.target.files) ? event.target.files : event.target.value
    } else {
      var element = event
    }

    prop[content] = element

    console.log(content)
    // console.log(element)
    // console.log(prop)
  }
</script>

<style lang="scss">
</style>


