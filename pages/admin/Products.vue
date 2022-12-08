<template>
   <!-- Toolbar -->
  <section class="pageheader section">
    
    <div class="mn-big title">
      <h1>Товары</h1>
      <router-link :to="'/admin/products/add'"  class="i-regular pd-thin button-delete button"><img src="@/assets/icons/plus-white.svg"></router-link>
      <!-- <button class="button" @click="store.dispatch('products/fetchProducts')">Обновить товары</button>   -->
    </div>
  </section>

   <div class="flex-nowrap flex product-tab-header">
    <button @click="changeTab('all')" :class="{'product-tab-active':data.currentTab === 'all'}" 
    class="br-right-dark product-tab section-panel section">
      Все
    </button>

    <button @click="changeTab('published')" :class="{'product-tab-active':data.currentTab === 'published'}" 
    class="br-right-dark product-tab section-panel section">
      Опубликованные
    </button>

    <button @click="changeTab('unpublished')" :class="{'product-tab-active':data.currentTab === 'unpublished'}" 
    class="product-tab section-panel section">
      Неопубликованные
    </button>
    <button @click="changeTab('archivied')" :class="{'product-tab-active':data.currentTab === 'archivied'}" 
    class="product-tab section-panel section">
      Архив
    </button>
  </div>
  <section class=" bg-grey  section-subsection section">
    <ProductsSection :products="products" />
  </section>
</template>


<script setup>


  import { reactive, computed, onMounted, toRefs } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
 
  import HeaderAdmin from '@/components/partials/HeaderAdmin.vue'

  import ProductsSection from '@/components/admin/sections/ProductsSection.vue'

  const store = useStore()
  const route = useRoute()


  let data = reactive({currentTab: 'all'})
  let reactiveData = toRefs(data)
    

  function changeTab (tab) {data.currentTab = tab; console.log(data.currentTab) }

  await store.dispatch('products/fetchProducts')
  

  const products = computed(() => { 
    if (data.currentTab === 'all') {
      return store.state.products.all.filter(function(product, index) {
        if (product.status !== 'archivied') return true; 
      })
    } else {

      const filtered = store.state.products.all.filter(function(product, index) {
        if (product.status === data.currentTab) return true; 
      })
      
      return filtered
    } 
   
  })

  </script>

<style lang="scss">
  
</style>
