<template>
  <section class="section">
    <h1>{{product.name}}</h1>
    <p>{{product.description}}</p>
    <p>{{product.price}} рублей</p>
    <button @click="test()">test</button> 
    <button @click="test()" class="button">Редактировать</button> 
  </section>  
</template>

<script setup>
  // Import libs
  import { computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  // Import components
  // Accessing router and store
  const store = useStore()
  const route = useRoute()
  // Data prefetching
  await store.dispatch('fetchProduct', route.params.id)
  // Accessing state
  const product = computed(() => store.state.product)
</script>

<style lang="scss">

</style>
