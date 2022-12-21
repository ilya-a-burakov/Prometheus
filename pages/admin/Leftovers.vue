<template>
   <!-- Toolbar -->
  <section class="br-bot-dark bg-white pd-big">
    <header class="flex-nojustify flex-bottom flex-nowrap flex">
      <h1 class="mn-r-small">Остатки</h1>
      <router-link :to="'/admin/leftovers/add'"  class="i-regular pd-thin button-delete button"><img src="@/assets/icons/plus-white.svg"></router-link>
     </header>
  </section>

   <div class="flex-nowrap flex product-tab-header">
    <button @click="changeTab('all')" :class="{'product-tab-active':data.currentTab === 'all'}" 
    class="br-right-dark w-100  bg-white flex-center pd-semi-big flex">
      Все
    </button>
    <button @click="changeTab('loss')" :class="{'product-tab-active':data.currentTab === 'loss'}" 
    class="br-right-dark w-100 bg-white flex-center pd-semi-big flex">
      Списания
    </button>

    <button @click="changeTab('inventory')" :class="{'product-tab-active':data.currentTab === 'inventory'}" 
   class="br-right-dark  w-100 bg-white  flex-center pd-semi-big flex">
      Инвертаризация
    </button>

  </div>


  <section class="cols-1 bg-grey pd-big">
    <!-- Empty State -->
    <p v-if="leftovers.length === 0">У вас еще нет списаний</p>
    <!-- Objects -->
    <Leftover v-for="leftover in leftovers" :leftover="leftover"/>
  </section>
</template>


<script setup>
  import Leftover from '@/components/admin/blocks/Leftover.vue'
  
  import { computed, onMounted, reactive, toRefs,ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute,useRouter } from 'vue-router'
 
  
  const store = useStore()
  const route = useRoute()
   const router = useRouter()

  await store.dispatch('leftovers/fetchAll').then(
    succes => { console.log('sycces') },
    error => {  
      console.log('eror') 
    }
  )

  let data = reactive({currentTab: 'all'})

  const leftovers = computed(() => { 
    if (data.currentTab === 'all') {
      return store.state.leftovers.all
    } else {

      const filtered = store.state.leftovers.all.filter(function(leftover, index) {
        if (leftover.type === data.currentTab) return true; 
      })
      
      return filtered
    } 
   
  }) 

  function changeTab (tab) {data.currentTab = tab; console.log(data.currentTab) }
  </script>

<style lang="scss">

.round-stat {
  padding: 1rem;
  border-radius: 5rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0,0,0,0.1);

  &-tab {
    width: 2rem;
    height: 2rem;
  }
}



.order-card {
  border-radius: 0.25rem;
  overflow: hidden;
  box-shadow: 0 8px 8px -8px rgb(36 36 36 / 10%);
  .order-status {
    color: black;
    background: #EEF2F6; 
    width: 100%;
    padding: 0.75rem 1.5rem;
    margin: 0;
  }

  .new {
    color: white;
    background: #00ff88;
  }

  .block {
    border-radius: 0;
    border: 0;
  }
}

  
</style>
