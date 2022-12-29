<template>
  <div class="input-wrapper">
		<span class="t-transp p-small">{{label}}</span>
   
    <li @click.stop="toggleMenu()" :class="{'input-small' : size === 'small'}" class="flex-center flex-nowrap flex bg-grey input-select input">
      <span v-if="selectedOption" class="flex-nojustify flex-v-center flex-nowrap flex w-100">
        <span class="mn-r-thin">{{selectedOption ===  "en" ? '🇺🇸' : '🇷🇺'}}</span>
        <span>{{ selectedOption.name ? selectedOption.name : selectedOption }}</span>
      </span>
      
      <span v-else class="w-100">
        {{placeholder ? placeholder : 'Please select'}}
      </span>

      <span v-if="content !== 'locale'" class="caret"></span>
    </li>

    <ul v-if="showMenu" class="bg-grey dropdown-menu" >
      <li :class="{'input-small' : size === 'small'}" class="bg-grey input-select input" v-for="option in optionsListed">
          <span v-if="option" @click="updateInputText(prop, content, option)" class="flex-nojustify flex-v-center flex-nowrap flex w-100">
            <span class="mn-r-thin">{{option ===  "en" ? '🇺🇸' : '🇷🇺'}}</span>
            <span>{{ option.name ? option.name : option }}</span>
          </span>
      </li>
    </ul>
  </div>
</template>


<script setup="props">
	import { computed,ref,reactive } from 'vue'

  const props = defineProps(
    ['obj','label','prop','value','options','content','textarea','placeholder','size']
  )


	const selectedOption = ref(null)
	const showMenu = ref(false)
  const placeholderText = ref('Please select an item')

  let optionsListed = computed(() => {
     if (props.prop[props.content]) {
      var idx = props.options.indexOf(props.prop[props.content]);
      var newArray = props.options.map((element) => {return element})
      if (idx != -1) newArray.splice(idx, 1);
      
      return newArray
    } else {
      return props.options
    }
  })

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
  }
</script>

<style lang="scss" scoped>
  .dropdown-menu {
    z-index: 20;
    width: 100%;
    position: absolute;
    top: 2.5rem;
    border-radius: 0.5rem;
    overflow: hidden;

  }
  .caret {
    display:relative;
    width:0;
    position:relative;
    height:0;
    margin-left:2px;
    vertical-align:middle;
    border-top:4px dashed;
    border-top:4px solid\9;
    border-right:4px solid transparent;
    border-left:4px solid transparent;
    float:right
  }
</style>


