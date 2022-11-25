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

  <div  class="input-select input">
		<!-- Selected option -->
    <li @click="toggleMenu()" class="flex-center flex-nowrap flex selected_option" v-if="selectedOption.name !== ''">
      {{ value }}
      <span class="caret"></span>
    </li>

    <li @click="toggleMenu()" class="flex-center flex-nowrap flex selected_option" v-if="selectedOption.name === ''">
      <!-- <span>{{placeholderText.value}}</span> -->
      <span>Please select value</span>
      <span class="caret"></span>
    </li>

    <ul v-if="showMenu" class="dropdown-menu" >
        <li v-for="option in options">
            <a href="javascript:void(0)" @click="setInputText(obj, prop, option.value)">
                {{ option.value }}
            </a>
        </li>
    </ul>
  </div>
</template>


<script setup="props">
	import { defineProps,computed,ref } from 'vue'
	import { useStore } from 'vuex'


	const store = useStore()
	const props = defineProps({
	  obj: String,
		label: String,
	  prop: String,
	  value: Object,
	})

	const selectedOption = ref({name: ''})
	const showMenu = ref(false)
  const placeholderText = ref('Please select an item')

  const options = [
  	{name: 'Russia', value: 'Russia'},
  	{name: 'Russia', value: 'Russia'},
  	{name: 'Russia', value: 'Russia'},
  ]

	function updateOption(option) {
      selectedOption.value = option;
      showMenu.value = false;
  }

  function toggleMenu() {
   showMenu.value = !showMenu.value;
  }
</script>

<style lang="scss">
</style>


