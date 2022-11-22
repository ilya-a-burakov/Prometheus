<template>
	<div class="flex-stretch flex-nojustify flex-nowrap flex br-bot-light shop-cart-item">
    <!-- Item Image -->
    <img v-if="product.images.links" :src="require( `@/assets/images/products/${product.images.links[0]}`)">
    <img v-if="product.images[0]" :src="require( `@/assets/images/products/${product.images[0].links[0]}`)">
    <img v-if="!product.images" :src="require( `@/assets/icons/photo.svg`)">
    <!-- Item Description -->
    <div class="text-left">
      <!-- Name -->
      <p class="name">

        <span>{{ product.name }}</span>
      <!-- Modifications -->
        <span v-if="product.size" class="t-transp">, {{ product.size}}</span>
        <span v-if="typeof product.color === 'string' && product.size" class="t-transp">, </span>
        <span v-if="typeof product.color === 'string' " class="t-transp">{{product.color}}</span>
      </p>
      <!-- Price -->
      <p class="t-main t-demi price mn-small"><span>$ {{product.price }} x {{ product.quantity }}</span></p> 
      <!-- Quantity -->
      <div class="flex-center flex actions">
        <div v-if="editable">
          <button @click="decrease(product)" class="decrease">-</button>
          <button @click="increase(product)" class="increase">+</button>
        </div>
        <button @click="remove(product)" class="button-icon-medium"><img src="@/assets/icons/trash.svg"></button>
      </div>
    </div>
  </div>

</template>


<script setup="props">
	import { computed } from 'vue'
	import { useStore } from 'vuex'
	import { useRouter } from 'vue-router'

	const store = useStore()
	const router = useRouter()

	const props = defineProps({
		product: Object,
		editable: String,
		increase: Function,
		decrease: Function,
		remove: Function

	})

</script>

<style lang="scss">
.shop-cart-item  {
  width: 100%;

  padding-top: 1.5rem;
  padding-bottom: 1.5rem;

  > img {
    width: 6rem;
    height: 6rem;

    margin-right: 1.25rem;

    object-fit: cover;

    background: #f4f7ff;
    border-radius: 1rem;
  }

  .text-left {
    width: 100%;

    .actions {

      .decrease, .increase {
        width: 2rem;
        height: 2rem;

        background: #F7F7F7;
      }
    }
  }
}
</style>


