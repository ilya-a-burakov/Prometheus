<template>
	<section class="z-index-5 transition-cubic pd-big bg-white shop-cart" :class="{'shop-cart-active':currentState === true}">
    <!-- ---------------------------------------------------------------- -->
    <!-- 01. Popup Header  -->
    <!-- ---------------------------------------------------------------- -->
    <div class="shopcart-header flex-center flex">
      <div class="flex-bottom flex">
        <h4 class="mn-r-thin p-big">Favorites</h4>
        <p class="t-transp p-small">You have {{StoreCartAmount}} items</p>
      </div>
      <button @click="closeFavorites()" class="button-icon-medium"><img src="@/assets/icons/cross.svg"></button>
    </div>
    <!-- ---------------------------------------------------------------- -->
    <!-- 02. Popup Content  -->
    <!-- ---------------------------------------------------------------- -->
    <div class="mn-big shopcart-content">
      <!-- Empty State -->
      <p v-if="!(products.length > 0)" style="padding-top: 1.5rem;"><i>You don't have any items in your favorites yet. Maybe something worth adding?</i></p>
      <!-- Favorites Item -->
      <CardOrderItem v-for="product in products" :key="product.id" :product="product" 
        :remove="product => store.dispatch('favorites/removeProductFromCart', product)"
      />
    </div>
  </section>
  <!-- ---------------------------------------------------------------- -->
  <!-- 04. Color Overlay  -->
  <!-- ---------------------------------------------------------------- -->
  <div 
    @click="closeFavorites()" 
    :class="{'active':currentState === true}" 
    class="color-overlay">
  </div>
  
</template>


<script setup>
	import { computed, defineProps, onMounted } from 'vue'
	import { useStore } from 'vuex'
  import { useRoute,useRouter } from 'vue-router'

  import CardOrderItem from '@/components/client/blocks/CardOrderItem.vue';

  const store = useStore()
  const route = useRoute()
  const router = useRouter()

  onMounted(() => {
    store.commit("favorites/setFavorites");
  });

  const products = computed(() => store.getters['favorites/cartProducts'])
  const currentState = computed(() => store.getters['favorites/getFavoritesState'])
  const cartTotalPrice = computed(() => store.getters['favorites/cartTotalPrice'])
  
  const StoreCartAmount = computed(() => store.getters['favorites/favoritesTotalAmount'])

  function openFavorite(product) {

    store.dispatch("favorites/toggleFavorites");
    router.push({name: 'Product', params: { id: product.id } })
  }
  function closeFavorites() {
    store.dispatch("favorites/toggleFavorites");
  }

</script>

<style lang="scss">
</style>


