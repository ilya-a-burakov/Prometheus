<template>
	<div class="mn-small">
    <p :class="{'t-main': product.sale}" class="h4">$ {{product.price }}</p>
    <p v-if="product.sale"  class="t-transp t-main p-medium line-through price">$ {{(product.price / 100) * (100 + product.sale) }} ₽</p>
  </div>
</template>

<script setup="props">
/////////////////////////////
// COMPONENT DEPENDENCIES
/////////////////////////////
import { ref, defineProps } from 'vue';

/////////////////////////////
// HELPERS
/////////////////////////////

/////////////////////////////
// CREATED
/////////////////////////////

const props = defineProps({
  product: Object,
});

/////////////////////////////
// MOUNTED
/////////////////////////////
</script>

<style lang="scss">
.product-images-wrapper {

  .product-previews-wrapper {

    border-radius: 2rem;
    overflow: hidden;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      aspect-ratio: 1/1;
    }
  }

  
}

</style>
