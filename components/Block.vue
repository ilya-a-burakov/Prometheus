<template>
	<div class="pd-medium br-grey radius-small">
    <h3 v-if="title" class="mn-medium">{{title}}</h3>
    <p  v-if="title">{{description}}</p>
    <slot></slot> 
  </div>
</template>

<script setup="props">
/////////////////////////////
// COMPONENT DEPENDENCIES
/////////////////////////////
import { toRefs } from 'vue';
/////////////////////////////
// HELPERS
/////////////////////////////

/////////////////////////////
// CREATED
/////////////////////////////
const props = defineProps({
  image: String,
  title: String,
  description: String,
});

/////////////////////////////
// MOUNTED
/////////////////////////////
</script>

<style lang="scss">

</style>
