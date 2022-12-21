<template>
	<button :class="{'button-favorites-active':isInFavorites.length > 0}"  @click="addToFavorites(product)" class="button-favorites button">
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.22771 8.04912L9.32688 15.3096C9.69718 15.6884 10.3065 15.6884 10.6768 15.3096L17.776 8.04912C19.5692 6.21518 19.5692 3.28474 17.776 1.45079C15.9249 -0.442378 12.8788 -0.442377 11.0277 1.45079L10.0019 2.49996L8.97601 1.45079C7.12491 -0.442378 4.07881 -0.442378 2.22771 1.45079C0.434515 3.28474 0.434512 6.21517 2.22771 8.04912Z" fill="white"/>
    </svg>
  </button>
</template>

<script setup="props">
/////////////////////////////
// COMPONENT DEPENDENCIES
/////////////////////////////
import { computed, defineProps } from 'vue';
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
  product: Object,
});
// Compoted Vars
const isInFavorites = computed(() => { 
  return store.state.favorites.items.filter(function(item, index) {
    if (item.id === store.state.products.current.id) {
      return true;
    }
  })
})  
// Methods
function addToFavorites(product) {
  store.dispatch('favorites/addProductToFavorites', product);
}
/////////////////////////////
// MOUNTED
/////////////////////////////
</script>

<style lang="scss">

.button-favorites {
  background:  #F7F7F7;
  svg { path { fill: black} }

  &:hover {
    svg { path { fill: #00ff88} }
  }

  &-active {
    background:  #F7F7F7;
    svg { path { fill: #00ff88} }
  }
}

</style>
