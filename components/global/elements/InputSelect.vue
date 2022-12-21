<template>
  <div @click.stop class="input-select input">
		<span class="t-transp p-small">{{label}}</span>
    <li @click.stop="toggleMenu()" class="flex-center flex-nowrap flex selected_option input" v-if="selectedOption">
       <span class="w-100">{{ selectedOption.name }}</span>
      <span class="caret"></span>
    </li>

    <li @click.stop="toggleMenu()" class="flex-center flex-nowrap flex selected_option input" v-if="!selectedOption">
      <span class="w-100">{{placeholder ? placeholder : 'Please select'}}</span>
      <span class="caret"></span>
    </li>

    <ul v-if="showMenu" class="dropdown-menu" >
        <li v-for="option in options">
            <span href="javascript:void(0)" @click="updateInputText(prop, content, option)">
                {{ option.name }}
            </span>
        </li>
    </ul>
  </div>
</template>


<script setup="props">
	import { computed,ref } from 'vue'
  import * as Store from '@/store';

  const props = defineProps(
    ['obj','label','prop','value','options','content','textarea','placeholder']
  )

	const selectedOption = ref(null)
	const showMenu = ref(false)
  const placeholderText = ref('Please select an item')

  if (props.prop[props.content]) {
    selectedOption.value = props.prop[props.content]
  }

	function updateOption(option) {
      selectedOption.value = option;
      showMenu.value = false;
  }

  function toggleMenu() {
   showMenu.value = !showMenu.value;
  }

  function updateInputText (prop, content, event) {
    var element = event

    selectedOption.value = element
    showMenu.value = !showMenu.value;

    prop[content] = element

    // Store.globals.setNestedObject(Store[object], property, element)
  }
</script>

<style lang="scss">
</style>


