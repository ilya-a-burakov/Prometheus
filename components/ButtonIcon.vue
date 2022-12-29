<template>
	<button class="button-icon" @click="action" > 
		<img :src="require( `prometheus/assets/images/icons/${icon}`)">
		<p v-if="counter && counter >= 1">{{counter}}</p> 
	</button>
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
  icon: String,
  action: Function,
  counter: Number,
});

/////////////////////////////
// MOUNTED
/////////////////////////////
</script>

<style lang="scss">
.button-icon {
	position: relative;

	p {
		position: absolute;
		right: -8px;
    bottom: -8px;
    background: yellow;
    height: 16px;
    border-radius: 16px;
    width: 16px;
    font-weight: 500;
    text-align: center;
    line-height: 16px;
    font-size: 10px;
	}
}

</style>
