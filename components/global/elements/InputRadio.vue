<template>
  <label class="flex input-radio-label"> 
    <div class="flex round-wrapper">
      <input 
        @click="updateInputText(obj, prop, $event )" 
        class="round radiobutton" 
        type="radio" 
        :name="name" 
        :value="label"
      > 
      <div class="round-checkmark round"></div>

     <p class="">{{label}}</p>
    </div>

     <p v-if="extra" class="t-main">{{extra}}</p>
  </label>
</template>


<script setup="props">
	import { defineProps,computed } from 'vue'
	import { useStore } from 'vuex'


	const store = useStore()
	const props = defineProps({
	  obj: String,
		label: String,
		extra: String,
	  prop: String,
	  name: String,
	  value: Object,
	})
</script>

<style lang="scss">
</style>


