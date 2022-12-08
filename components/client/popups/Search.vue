<template>
	<div id="search"  v-if="search.current.length !== 0 " class="search-wrapper">
		<h2 class="mn-big" >Search</h2>
		<div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <p class="mn-big" v-if="products" >Found {{searchResult.length}} positions</p>
		<div v-if="products"  class="mn-big grid-layout">
			<ProductCard v-for="product in searchResult" :product="product" :key="product"></ProductCard>
		</div>
	</div>
</template>

<script setup="props">
import ProductCard from '@/components/client/blocks/ProductCard.vue'	
/////////////////////////////
// COMPONENT DEPENDENCIES
/////////////////////////////
import { defineProps, toRefs, ref, computed,onMounted } from 'vue';
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
	// Module Created
	const route = useRoute()
	const router = useRouter()
/////////////////////////////
// HELPERS
/////////////////////////////
function declOfNum(number, words) {  
	return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
}
var error =   ref(null)
var loading = ref(null)
var products = ref(null)

function fetchData () {
  error.value = products.value = null
  loading.value = true

  if (store.state.products.all.length > 1)  
  	{
  		loading.value = false 
  		products.value = store.state.products.all
		}

	store.dispatch('products/fetchProductsPublished').then(
    finish => {
      loading.value = false
     	products.value = finish
     	console.log(products.value)
    },
    err => {
     	error.value = err.toString()
    }
  );
}
router.afterEach((to, from, next) => {
  if (store.state.products.search.current.length !== 0) {
   store.dispatch('products/resetSearch');   
   next() 
 } else {
  	next()
  }

})
   
/////////////////////////////
// CREATED
/////////////////////////////
const store = useStore()

onMounted(() => {
	// alert('hello')
	fetchData()
});


const search = computed(() => store.state.products.search)

const searchResult = computed(() => {
	const searcher = store.state.products.all.filter(function(product) {
	  if (product.name.toUpperCase().includes(store.state.products.search.current.toUpperCase())) {
	  	return true
	  }
	})
	return searcher
})

/////////////////////////////
// MOUNTED
/////////////////////////////
</script>

<style lang="scss">
.search-wrapper {
	padding: 8rem;
	min-height: 100vh;
	padding-top: 6rem;
	background: white;
	position: relative;
	z-index: 1;
}

</style>
