<template>
  <div class="t-center order-finished">

    <p class="mn-medium p-big">Order completed!</p>
    
    <div class="mn-big pd-big order-number">
      <p class="mn-small t-semi small">#485792</p>
      <p class="t-lh-2">Our manager will contact you within 1 hour. If you have any questions - send us an email or call <br><span class="t-semi">+995 585 888 660</span></p>
    </div>

    <div class="order-data pd-big">
      <div class="mn-small t-left flex-nowrap flex">
        <p class="mn-r-small w-33 t-semi">Receiver</p>
        <p class="mn-r-small w-100">{{order.name}} {{order.surname}}, {{order.phone}}, {{order.email}}</p>
      </div>
      <div class="t-left flex-nowrap flex">
        <p class="mn-r-small w-33 t-semi">Address</p>
        <p class="mn-r-small w-100">{{order.city}}, {{order.adress}}</p>
      </div>
    </div>

  </div>
</template>

<script setup="props">
/////////////////////////////
// COMPONENT DEPENDENCIES
/////////////////////////////
  import { defineProps } from 'vue';

/////////////////////////////
// HELPERS
/////////////////////////////

/////////////////////////////
// CREATED
/////////////////////////////
  const props = defineProps({
    order: Object,
  });
/////////////////////////////
// MOUNTED
/////////////////////////////
</script>

<style lang="scss">

</style>
