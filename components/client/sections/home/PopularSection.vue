<template>
	<div id="popularProducts" class="section">
		<div class="t-center title">
			<p>Straight from the oven</p>
			<h2 class="mn-big">🔥 Hot New Products</h2>
		</div>
		<carousel ref="myCarousel" :items-to-show="3" :transition="330" :wrapAround="true" :autoplay="3000" :pauseAutoplayOnHover="true" :breakpoints="breakpoints">
	    <slide v-for="(value, key, index) in products" :key="key">
	      	<ProductCard @click="slideTo(key)" style="box-sizing: content-box; padding-right: 1.875rem" class="carousel__item w-100" :product="value"/>
	    </slide>
		</carousel>
	</div>
</template>


<script setup scoped>
	import { ref, computed, onMounted } from 'vue'
	import { useStore } from "vuex";
	import { useRouter } from 'vue-router'

	import 'vue3-carousel/dist/carousel.css'
	import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
	
	import ProductCard from '@/components/client/blocks/ProductCard.vue'

	const store = useStore()
	const router = useRouter()

	await store.dispatch('products/fetchProductsPopular')

	console.log(products)

	const products = computed(() => store.state.products.popular)

	const myCarousel = ref(null)

	const breakpoints = {
      320: {
        itemsToShow: 1.5,
      },
      640: {
        itemsToShow: 3,
      },
      1024: {
        itemsToShow: 3,
      },
    }

	function slideTo(val) {
    myCarousel.value.slideTo(val)
  }


	onMounted(() => {

		setTimeout(() => {
		  myCarousel.value.restartCarousel()
		}, "500")

})

	

</script>

<style lang="scss">

#popularProducts {
	// padding-right: calc(6rem - 1.875rem);
	.carousel__viewport {
		overflow: visible;
	}
	.carousel__slide > .carousel__item {
	  opacity: 0.25;
	  transition: 0.33s;
	}
	.carousel__slide--visible > .carousel__item {
	  opacity: 1;
	  transform: rotateY(0);
	}

}


</style>


