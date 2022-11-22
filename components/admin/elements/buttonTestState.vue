<template>
  <button @click="test()">test</button> 
</template>


<script setup>
	 // Import libs
  import { useStore } from 'vuex'

  const store = useStore()

  function test() {
	  console.log(store.state)
	}
</script>

<style lang="scss">
</style>


