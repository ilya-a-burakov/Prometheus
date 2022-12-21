<template>
  <div>
  	<div>
      <p class="mn-small t-demi">Select size</p>
    </div>  
    <div class="flex">
      <div 
        v-for="(element, index) in elements"  
        @click="selectSize(element.name)" 
        :class="{'button-active': selected === element.name, 'button-disabled':(element.quantity < 1) }" 
        class="mn-r-small mn-small button-small button size"
      >
        {{element.name}}
        <div class="tooltip-quantity">
          <div class="arrow-up-small mn-center"></div>
          <div class=" p-small t-black block">
            <span v-if="element.quantity > 0" class="t-transp">In stock: {{element.quantity}}</span>
            <span v-else class="t-transp">Out of stock</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup="props">
/////////////////////////////
// COMPONENT DEPENDENCIES
/////////////////////////////
import { computed, defineProps } from 'vue';
// Import libs
import { useStore } from 'vuex'
import { useRoute,useRouter } from 'vue-router'

/////////////////////////////
// HELPERS
/////////////////////////////

/////////////////////////////
// CREATED
/////////////////////////////
// Accessing router and store
const store = useStore()
const route = useRoute()
// Define props
const props = defineProps({
  elements: Array,
  selected: String
});
/////////////////////////////
// MOUNTED
/////////////////////////////

function selectSize (size) {
    store.commit('products/setSelectedSize', size)
    store.commit('products/setSelectedColor', {})
  }
</script>

<style lang="scss">
.tooltip-quantity {
  position: absolute;
  pointer-events: none;

  top: 4rem;
  left: calc(50% - 4rem);
  opacity: 0;
  z-index: 10;

  .arrow-up-small {
    position: relative;
    width: 0; 
    height: 0; 
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    
    border-bottom: 0.5rem solid #F7F7F7;
    z-index: 3;
  }


  .block {
    font-size: 0.75rem;
    background: #F7F7F7;
    width: 8rem;
    text-align: center;
    color: black !important;
    span {  color: black !important;}  
  }
}

.size, .color {
  position: relative;
  z-index: 10;

  &:hover {
    cursor: pointer;

    
    .tooltip-quantity {
      pointer-events: none;
      opacity: 1;
      position: absolute;
      top: 3rem;
    }
  }
}

</style>
