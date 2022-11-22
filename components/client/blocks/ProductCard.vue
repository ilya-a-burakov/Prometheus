<template>
	<div  class="product-card">
		
		<!-- Product Image Sqaure -->
		<div class="square">
			<!-- Image Wrappers  -->
			<div v-if="product.images[0]"  class="img-crop" :style="'background-image: url(' + require( `@/assets/images/products/${product.images[0].links[0]}`) + ')'"> </div>
			<div  v-if="!(product.images[0])"   class="img-crop" :style="'background-image: url(' + require( `@/assets/icons/photo.svg`) + ')'"> </div> 
			<!-- Favorites Button -->
			<div class="favorites-button">
				<button :class="{'button-favorites-active':isInFavorites.length > 0}"  @click="addToFavorites(product)" class="button">
			  		<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M2.22771 8.04912L9.32688 15.3096C9.69718 15.6884 10.3065 15.6884 10.6768 15.3096L17.776 8.04912C19.5692 6.21518 19.5692 3.28474 17.776 1.45079C15.9249 -0.442378 12.8788 -0.442377 11.0277 1.45079L10.0019 2.49996L8.97601 1.45079C7.12491 -0.442378 4.07881 -0.442378 2.22771 1.45079C0.434515 3.28474 0.434512 6.21517 2.22771 8.04912Z" fill="white"/>
					</svg>
				</button>
			</div>
			<!-- Addiotional text (UNSUED) -->
			<!-- <p v-if="product.quantity < 1 && product.modifications.length < 1" class=" p-small sizes">Нет в наличии</p> -->
		</div>

		<!-- Product Info Start -->
		<div @click="router.push({name: 'Product', params: { id: product.id } })" class="t-left product-card-content">
			<!-- Name -->
			<p class="h5">{{product.name}}</p>
			<!-- Price -->
			<div class="flex-bottom flex">
				<p :class="{'t-main': product.sale > 0}" class="p-medium price">$ {{product.price}} </p>
				<p v-if="product.sale > 0"  class="t-transp t-main p-medium sale-price price">$ {{(product.price / 100) * (100 + product.sale) }}</p>
			</div>
		</div>
		<!-- Product Info End -->
		<div>
	</div>
	<!-- Arrow on hover -->
	<svg @click="router.push({name: 'Product', params: { id: product.id } })" class="arrow-next" width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle class="circle_bg" r="26" transform="matrix(-1 0 0 1 26 26)" fill="#F4F7FF"/>
		<path class="arrow_in_circle" fill="#2266FF" fill-rule="evenodd" clip-rule="evenodd" d="M30.6548 26.8334H18.5V25.1667H30.6548L25.4107 19.9227L26.5893 18.7441L33.8452 26.0001L26.5893 33.256L25.4107 32.0775L30.6548 26.8334Z" />
	</svg>

	</div>

</template>


<script setup="props">
	import { defineProps,computed } from 'vue'
	import { useStore } from 'vuex'
	import { useRouter } from 'vue-router'

	const store = useStore()
	const props = defineProps(['product'])
	const router = useRouter()


	function addToFavorites(product) {
		store.dispatch('favorites/addProductToFavorites', product);

		console.log('hello');
	}


	const isInFavorites = computed(() => { 
		return store.state.favorites.items.filter(function(item, index) {
			if (item.id === props.product.id) {
				return true;
			}
		})
	})


</script>

<style lang="scss">
.product-card {
	display: flex;
	flex-direction: column;
	overflow: hidden;
	background: white;
	transform: scale(1);

	transition: all 0.33s ease;

	.arrow-next { 
		position: absolute;
		width: 3rem;
		height: 3rem;
		bottom: -4rem;
		right: 1.25rem;

		transition: all 0.33s ease;

		.arrow_in_circle, .circle_bg  {
			transition: all 0.33s ease;
		}

		
	}

	&:hover {
		cursor: pointer;

		.h5, .price { color: #2266FF; }

		.arrow-next { 
			bottom: 0rem;
			right: 1.25rem;

			&:hover {
			.arrow_in_circle {
				fill: #F4F7FF
			}

			.circle_bg {
				fill: #2266FF
			}
		}
		
		}
	}

	.square {
	  width: 100%;
	  background: #F4F7FF;
	  border-radius: 2rem;
	  position: relative;
	  overflow: hidden;


		.favorites-button {
			position: absolute;
			right: 1rem;
			.button {
				background: transparent;
				padding: 0;	
				height: auto;
			}
			top: 1rem;
			z-index: 1;
		}


	  .sizes {
			position: absolute;
			bottom: 1rem;
			right: 1rem;
			background: white;
			// border: 1px solid rgba(0,0,0,0.1);
			padding: 0.25rem 0.5rem;
			width: fit-content;
			// margin-bottom: 0.5rem;
			border-radius: 5rem;
			z-index: 15;
		}

		img {
			position: absolute;
			width: 100%;
			height: 100%;
	    object-fit: cover;
			transition: all 0.33s ease;
		}

	}

	.square .img-crop {
	  // content: "";
	  display: block;
	  background-position: center center;
	  background-size: cover;
	  padding-bottom: 100%;
	  border-radius: 2rem;
	  overflow: hidden;
	}

	

	.product-card-content {
		margin-top: 1rem;
		flex-wrap: nowrap;


		.h5 {     
			display: block; 
			white-space: normal;
			text-transform: revert;
			line-height: 1;
			font-weight: 500;
			letter-spacing: 0;
		}


		.p-medium { display: block; font-weight: 600; font-size: 1.25rem; 	}

		.price { white-space: nowrap; color: #2266FF; &:first-of-type{ margin-top: 0.5rem; }}

		.sale-price { text-decoration: line-through; margin-left: 0.5rem; font-size: 1rem; line-height: 1.25;  }

		.flex { flex-wrap: nowrap; justify-content: flex-start;  }
		

		

	} 
}


@media screen and (max-width: 480px) {
 .product-card-content {
	h5 {font-size: 1.75rem;}
	.p-medium {font-size: 1.175rem !important;}

}
}
</style>


