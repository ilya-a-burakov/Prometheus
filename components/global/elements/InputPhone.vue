<template>
	<div class="flex-nowrap flex">
		
		<label class="mn-small input-text-label">
	    <input 
	      @input="updateInputTel(obj, prop, $event)" 
	      :value="value" 
	      placeholder="Your mobile phone"
	      class="dropdow mn-small input-text input"
				maxlength="17" 
	    />
	  </label>
	</div>
</template>


<script setup="props">
	import { defineProps,computed,ref,onMounted } from 'vue'
	import { useStore } from 'vuex'

	const selectedOption = ref({name: ''})
	const showMenu = ref(false)
  const placeholderText = ref('Please select an item')

  const options = [
  	{name: 'Russia'},
  	{name: 'USA'},
  	{name: 'Ukraine'},
  	{name: 'America'},
  	{name: 'Israel'},
  	{name: 'Germany'},
  ]

	const store = useStore()
	const props = defineProps({
	  obj: String,
	  prop: String,
	  value: Object
	})

	function updateOption(option) {
      selectedOption.value = option;
      showMenu.value = false;
  }

  function toggleMenu() {
   showMenu.value = !showMenu.value;
   console.log(showMenu)
  }

	onMounted(() => {
		// selectedOption = selected;
    
    // if (placeholder) {
    //   laceholderText = placeholder;
    // }
	})


</script>

<style lang="scss">
.caret {
  display: relative;
  width: 0;
  position: relative;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 4px dashed;
  border-top: 4px solid \9;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  float: right;
}
</style>


