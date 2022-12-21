<template>
	<div>
		<div class="breadcrumbs section">
			<router-link to="/">
				<svg class="home" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill="black" d="M0.494141 4.26391C0.494141 4.48862 0.659906 4.66912 0.928813 4.66912C1.05037 4.66912 1.16825 4.6065 1.27139 4.52177L1.64344 4.20866V7.56448C1.64344 8.13545 1.98971 8.47803 2.5791 8.47803H7.56678C8.15616 8.47803 8.50243 8.13545 8.50243 7.56448V4.19392L8.8929 4.52177C8.99604 4.6065 9.11392 4.66912 9.23916 4.66912C9.48597 4.66912 9.67015 4.5144 9.67015 4.27128C9.67015 4.1313 9.61121 4.01343 9.5007 3.92133L8.50243 3.08146V1.47538C8.50243 1.30961 8.3956 1.1991 8.22984 1.1991H7.63308C7.46732 1.1991 7.35313 1.30961 7.35313 1.47538V2.11634L5.66969 0.70181C5.31606 0.403433 4.85928 0.403433 4.50197 0.70181L0.663589 3.92133C0.553079 4.01711 0.494141 4.14235 0.494141 4.26391ZM6.13752 5.26219C6.13752 5.08906 6.02701 4.97855 5.85387 4.97855H4.31779C4.14097 4.97855 4.02678 5.08906 4.02678 5.26219V7.63447H2.83327C2.60856 7.63447 2.48332 7.50922 2.48332 7.28084V3.5014L4.90349 1.47538C5.01768 1.37592 5.15029 1.37592 5.26817 1.47538L7.66255 3.48298V7.28084C7.66255 7.50922 7.53731 7.63447 7.3126 7.63447H6.13752V5.26219Z"/>
				</svg>
					<span>Home</span>
			</router-link>

		 	<svg class="chevron" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M4 3.99992C4 3.83673 3.94307 3.70391 3.81025 3.57867L0.899431 0.732369C0.800759 0.629902 0.679317 0.580566 0.531309 0.580566C0.239089 0.580566 0 0.815861 0 1.10808C0 1.25229 0.0607211 1.38512 0.166983 1.49138L2.74763 3.99613L0.166983 6.50846C0.0607211 6.61093 0 6.74375 0 6.89176C0 7.18398 0.239089 7.41928 0.531309 7.41928C0.675522 7.41928 0.800759 7.36994 0.899431 7.26747L3.81025 4.42117C3.94307 4.29594 4 4.15931 4 3.99992Z" fill="black"/>
			</svg>
			
			<router-link to="/catalog"><span>Marketplace</span></router-link>
			
			<svg  class="chevron" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M4 3.99992C4 3.83673 3.94307 3.70391 3.81025 3.57867L0.899431 0.732369C0.800759 0.629902 0.679317 0.580566 0.531309 0.580566C0.239089 0.580566 0 0.815861 0 1.10808C0 1.25229 0.0607211 1.38512 0.166983 1.49138L2.74763 3.99613L0.166983 6.50846C0.0607211 6.61093 0 6.74375 0 6.89176C0 7.18398 0.239089 7.41928 0.531309 7.41928C0.675522 7.41928 0.800759 7.36994 0.899431 7.26747L3.81025 4.42117C3.94307 4.29594 4 4.15931 4 3.99992Z" fill="black"/>
			</svg>
			
			<router-link :to="'/catalog/products/' + product.id"><span>{{product.name}}</span></router-link >
		</div>

		<div class="produc-data section">
			<!-- <span>Размеры<br>{{sizes2}}<br></span> -->
			<!-- <span>Выбранный размер<br>{{product.selectedSize}}<br></span> -->
			<!-- <span>Цвета<br>{{colors2}}<br></span> -->
			<!-- <span>Выбранный цвет<br>{{product.selectedColor}}<br></span> -->

			<div class="cols-2 product-data-wrapper">

				<ImagesSlider class="images-col" :images="images"/>

				<div class="product-description-wrapper col">
					<!-- Name -->
					<h1 class="h1-product mn-thin">{{product.name}}</h1>
					 	
					<!-- Price -->
					<Price :product="product" />
					<!-- Modifications -->
					<div v-if="product.modifications.length > 0" class="flex-nojustify  flex">
						<!-- Sizes -->
						<!-- <p v-if="product.modifications.length > 0 && sizes2.length < 1 && !colors2.length" class="mn-r-small button-one-size button-size button">Закончилось</p> -->
						
					 	<SelectElement v-if="sizes2.length > 0 " :elements="sizes2" :selected="product.selectedSize" class="mn-r-medium" />
						<!-- Colors -->
				  	<div v-if="(colors2.length > 0 && sizes2.length < 1) || (colors2.length > 0 && sizes2.length > 1 && product.selectedSize)">

				  		<div>
				  			<p class="mn-small t-demi" v-if="colors2.length > 0 && colors2[0].characteristics">Select color</p>
							</div>
				  		
				  		<div class="flex-nojustify flex" >
								<div 
								  	v-for="color in colors2" 
								  	@click="selectColor(color)" 
								  	:class="{'button-active':product.selectedColor === color.characteristics.value, 'button-disabled':(color.quantity < 1)}" 
								  	class="mn-r-small mn-small color button-small button"
								  	
							  	>
							  		{{color.characteristics.value}}

										<div class="tooltip-quantity">
											<div class="arrow-up-small mn-center"></div>
											<div class="block">
												<span v-if="color.quantity > 0" class="t-transp">In stock: {{color.quantity}}</span>
												<span v-else class="t-transp">Out of stock</span>
											</div>
										</div>
								</div>
							</div>

						</div>


					</div>
					<!-- Description -->
					<p class="mn-medium">{{product.description}}</p>
					<!-- {{product.quantity}} -->

					<div v-if="product.infromation.length > 0" v-for="infromation in product.infromation" class="mn-medium product-information">
						<p class="t-demi">{{infromation.name}}</p>
						<p>{{infromation.value}}</p>
					</div>
					<!-- Actions -->
					 <div class="flex-nowrap flex-nojustify flex">
						<button  :disabled="validateToCard(product)" @click="addToCart(product)" class="mn-r-small button">Add to cart</button>
						<button  @click="store.commit('toggleBackCall')"  class="mn-r-small button-grey button">Fast Order</button>
						<AddToFavorites :product="product" />
					</div>

				</div>
			</div>

		</div> 

		<PopularSection />
	</div>
</template>

<script setup="props">
	/////////////////////////////
	// COMPONENT DEPENDENCIES
	/////////////////////////////
	// Import components
	import PopularSection 	from '@/components/client/sections/home/PopularSection.vue'
	import ImagesSlider 	from '@/components/client/blocks/ImagesSlider.vue'
	import Price 	from '@/components/client/elements/Price.vue'
	import AddToFavorites 	from '@/components/client/elements/AddToFavorites.vue'
	import SelectElement 	from '@/components/client/elements/SelectElement.vue'
	// Import libs
	import { computed, toRefs, ref, watchEffect, reactive, onServerPrefetch, defineProps, onMounted, onUpdated, onBeforeUpdate } from 'vue'
	import { useStore } from 'vuex'
	import { useRoute,useRouter } from 'vue-router'
	// Accessing router and store
	const store = useStore()
	const route = useRoute()
	const router = useRouter()

	onMounted(() => {
		
	});

	// Data prefetching
	await store.dispatch('products/fetchProduct', route.params.id).then(() => {
		// store.dispatch('products/setInitSize', store.getters.getProductSizes[0])

	})	
	router.beforeEach(async (to, from, next) => {
		if (to.params.id) { 
			store.dispatch('products/fetchProduct', to.params.id).then(() => {
				// store.dispatch('products/setInitSize', store.getters.getProductSizes[0])
			})	
			next()
		} else {
			next()
		}
		
	})
		

	const images = computed(() => { 
		// If no selected color return images from all arrays
 		if (!store.state.products.current.selectedColor) {

      const filtered = store.state.products.current.images.map(function(imageCategory, index) {
        return imageCategory.links
      })

      return {links: filtered.flat().flat()}
    
    // If color selected check is images array contains images for selected colors
    } else {
      const filtered = store.state.products.current.images.filter(function(imageCategory, index) {
        if (imageCategory.name === store.state.products.current.selectedColor) return true; 
      })

      // If not show images from first array
      if (filtered < 1) {
      	return store.state.products.current.images[0]
      }

      // If exist show this images array
      return filtered[0]
    } 
   
	})

	
	// Accessing state
	const products   = computed(() => store.state.products)

	const product = computed(() => store.state.products.current)
	const productInformation = computed(() => store.state.products.current.infromation)
	
	const sizes2 = computed(() => store.getters.getProductSizes2)
	const colors2 = computed(() => { return store.getters.getProductColor2 })


	const errorColor = computed(() => {
		if (store.getters.getProductColor.length > 0) {
	  	return !product.selectedColor ? true : false
	  } else {
	  	return false 
	  }
	})

	function validateToCard(product) {

		if (store.state.products.current.modifications.length < 1 && store.state.products.current.quantity > 0) {
			return false
		} 
		if (store.state.products.current.selectedSize && (typeof store.state.products.current.selectedColor === 'string'))	{
			return false 
		} 
		if (store.state.products.current.selectedSize && store.getters.getProductColor2.length < 1) {
			console.log('hamen')
			return false
		} 
		if (store.getters.getProductSizes2.length < 1 && store.getters.getProductColor2.length > 1 && (typeof store.state.products.current.selectedColor === 'string')) {
			return false
		} 
		return true 
	}

	function selectSize (size) {
    store.commit('products/setSelectedSize', size)
    store.commit('products/setSelectedColor', {})
  }
	
	function selectColor (color) {
		store.commit('products/setSelectedColor', color.characteristics.value) 

	}

	function addToCart(product) {
		store.dispatch('shopcart/addProductToCart', store.state.products.current);
		console.log('hello');
	}
 
	var a = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};

	function transliterate(word){
	  return word.split('').map(function (char) { 
	    return a[char] || char; 
	  }).join("");
	}
</script>

<style lang="scss">

.produc-data { 
	padding-top: 2rem;
	padding-bottom: 0;
	.cols-2 {
		grid-template-columns: 1fr 2fr; gap: 2rem;
	}
}
</style>
