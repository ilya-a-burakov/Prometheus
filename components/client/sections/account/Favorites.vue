<template>
	<div class="">
		<p class="mn-small t-semi p-big">Избранное</p>
		<hr class="mn-semi">
		<div class="grid-layout">
			 <p v-if="(favorites.length == 0)" style="padding-top: 1.5rem;"><i>У вас еще нет товаров в избранном. Может стоит что-нибудь добавить?</i></p>
			<ProductCard v-if="favorites" v-for="product in favorites" :product="product" :key="product"></ProductCard>
		</div>
	</div>
</template>

<script setup="props">
/////////////////////////////
// COMPONENT DEPENDENCIES
/////////////////////////////
import { defineProps, toRefs } from 'vue';
import ProductCard from '@/components/client/blocks/ProductCard.vue';


/////////////////////////////
// HELPERS
/////////////////////////////

/////////////////////////////
// CREATED
/////////////////////////////
const props = defineProps({
  favorites: Array,
});

const { favorites } = toRefs(props);

/////////////////////////////
// MOUNTED
/////////////////////////////
</script>

<style lang="scss">
	.grid-layout {
		display: grid;
		padding: 0px;
		width: 100%; 
		grid-template-columns: 1fr 1fr 1fr; 
		 gap: 2rem; 
    // grid-auto-rows: auto;

	}

	.grid-item {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border-radius: 0;

		font-size: 14px;

		transition: all 0.5s ease;

		box-shadow: 32px 16px 100px 0px rgb(0 0 0 / 15%);

		background: white;

		.image {
			width: 100%;
			height: 100%; 
			background-repeat: no-repeat; 
			background-position: center center; 
			background-size: cover;
		}

		.text {
			padding: 24px;
			color: black;
			background: white;
			
			h5 {margin-bottom: 8px; }
			span {opacity: 0.5; } 
		}
	}
</style>