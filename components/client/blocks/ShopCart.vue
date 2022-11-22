<template>
	<section class="z-index-5 transition-cubic pd-big bg-white shop-cart" :class="{'shop-cart-active':currentState === true}">
    <!-- ---------------------------------------------------------------- -->
    <!-- 01. Popup Header  -->
    <!-- ---------------------------------------------------------------- -->
    <div class="br-bot-light flex-center flex">
      <div class="mn-medium flex-bottom flex">
        <h4 class="mn-r-thin p-big">Shopping Cart</h4>
        <p class="t-transp p-small">You have {{StoreCartAmount}} items</p>
      </div>
      <button @click="closeShopCart()" class="button-icon-medium"><img src="@/assets/icons/cross.svg"></button>
    </div>
    <!-- ---------------------------------------------------------------- -->
    <!-- 02. Popup Content  -->
    <!-- ---------------------------------------------------------------- -->
    <div class="mn-big shopcart-content">
      <!-- Empty State -->
      <p v-if="!(products.length > 0)" class="mn-t-medium"><i>You don't have any items in your shop cart yet. Maybe something needs to be added?</i></p>
      <!-- Shopcart Items -->
      <CardOrderItem v-for="product in products" :key="product.id" editable="true" :product="product" 
        :increase="product => store.commit('shopcart/incrementItemQuantity', product)"
        :decrease="product => store.dispatch('shopcart/decreaseQuantity', product)"
        :remove="product => store.dispatch('shopcart/removeProductFromCart', product)"
      />
    </div>
    <!-- ---------------------------------------------------------------- -->
    <!-- 03. Footer  -->
    <!-- ---------------------------------------------------------------- -->
    <div  v-if="products.length > 0" class="shopcart-footer pd-b-medium pd-t-medium pd-big transition-cubic bg-main t-white flex-center flex">
      <div class="total-price">
        <p class="t-transp mn-extra-thin">In total</p>
        <p class="t-demi p-big">$ {{cartTotalPrice}}</p>
      </div>
      <button  @click="openOrder()" class="br-t-white button">Go to checkout</button>
    </div>  
  </section>
  <!-- ---------------------------------------------------------------- -->
  <!-- 04. Color Overlay  -->
  <!-- ---------------------------------------------------------------- -->
  <div 
    @click="closeShopCart()" 
    :class="{'active':currentState === true}" 
    class="color-overlay">
  </div>
</template>


<script setup>
	import { computed,defineProps,onMounted } from 'vue'
	import { useStore } from 'vuex'
  import { useRoute,useRouter } from 'vue-router'

  import CardOrderItem from '@/components/client/blocks/CardOrderItem.vue';

  const store = useStore()
  const route = useRoute()
  const router = useRouter()

  onMounted(() => {
    store.commit("shopcart/setShopCart")
  });

  const products = computed(() => store.getters['shopcart/cartProducts'])
  const currentState = computed(() => store.getters['shopcart/getStoreCartState'])
  const cartTotalPrice = computed(() => store.getters['shopcart/cartTotalPrice'])
  const StoreCartAmount = computed(() => store.getters['shopcart/cartTotalAmount'])


  function closeShopCart() {
    store.dispatch("shopcart/toggleShopCart");
  }

  function openOrder() {
    store.dispatch("shopcart/toggleShopCart");
    store.dispatch("shopcart/setSearch");
    router.push({name: 'Order'})
  }

</script>

<style lang="scss">
.shop-cart {
  display: block;
  position: fixed;

  right: -33%;
  top: 0;

  height: 100%;
  width: 33%;

  overflow-y: scroll; 
  .shopcart-footer {
    position: fixed;
    bottom: 0;
    
    width: 33%;
    right: -33%;
  }
}

.shop-cart-active {
  right: 0;

  .shopcart-footer {
    right: 0;
  }
}
</style>


