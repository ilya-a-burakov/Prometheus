<template>
<div>
  <!-- Toolbar -->
  <section class="pageheader section">
    <div class="mn-big title">
      <h1>Категории товаров</h1>
      <router-link :to="'/admin/categories/add'"  class="i-regular pd-thin button-delete button"><img src="@/assets/icons/plus-white.svg"></router-link>
    </div>
  </section>

  <section class="bg-grey  section-subsection section">
    <VueDraggableNext class="dragArea list-group w-full" :list="categories.all"  :sort="true" @change="log">
        <div  v-for="(category,index) in categories.all"  >
          {{test(category,index)}}
           <CategoryCard   :category="category" :key="index" class="list-group-item mn-medium"></CategoryCard>
        </div>
    </VueDraggableNext>
    <button @click="store.dispatch('categories/updateCategories', categories)" class="button">Обновить порядок</button>
  </section>
</div>
</template>


<script setup>

  import { computed,ref} from 'vue'
  import { useStore } from 'vuex'

  import { VueDraggableNext } from 'vue-draggable-next'

  import CategoryCard from '@/components/admin/blocks/CategoryCard.vue';


  const store = useStore()

  await store.dispatch('categories/fetchCategories')
  
  const categories = ref(store.state.categories);

  function log(event) {
    // store.commit('categories/updateCategories', ) 
  }
  function test(category,index) {
    category.order = index;
    // store.commit('categories/updateCategories', ) 
  }

 
</script>

<style lang="scss">
  
</style>
