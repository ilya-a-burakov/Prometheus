<template>
   <!-- Toolbar -->
  <section class="br-bot-dark bg-white pd-big">
    <header class="flex-nojustify flex-bottom flex-nowrap flex">
      <h1 v-if="!route.params.id" class="mn-r-small">
        Изменить остатки
      </h1>

      <h1 v-if="route.params.id" class="mn-r-small">
        Изменить
        <!-- {{leftover.type}} -->
        <span v-if="leftover.type === 'loss'">списание</span>
         <span v-if="leftover.type === 'inventory'">инвентаризацию</span>
      </h1>
    </header>
  </section>


  <section class="br-bot-dark bg-grey pd-big">

    <div v-if="!route.params.id" class="mn-small flex-wrap block">
      <InputSelect :obj="'leftovers'" :prop="'current.type'" :value="leftover.type" label="Выберите тип">
        <option value="loss">Списание</option>
        <option value="inventory">Остаток</option>
      </InputSelect>
    </div>

    <LeftoverPositions :order="leftover" :products="Products" />
      
  </section>

  <section class="pd-big flex-nojustify flex">
    <a @click="onSubmit()" class="mn-r-small button">Сохранить</a> 
    <a v-if="route.params.id" @click="onDelete()" class="t-main br-l-dark bg-white button">Удалить</a>
  </section>
</template>


<script setup>
  import InputText    from 'prometheus/components/global/elements/InputText.vue'
  import InputSelect  from 'prometheus/components/global/elements/InputSelect.vue'

  import LeftoverPositions    from '@/components/admin/blocks/LeftoverPositions.vue'

  import { computed, onMounted, reactive, toRefs,ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute,useRouter } from 'vue-router'
 
  
  const store = useStore()
  const route = useRoute()
  const router = useRouter()
  console.log( route.params.id)
  
  if (route.params.id) await store.dispatch('leftovers/fetch', route.params.id).then(

    succes => { console.log(succes) },
    error => {  
      console.log('eror') 
    }
  ) 

  if (!route.params.id) store.commit('leftovers/reset')

  await store.dispatch('products/fetchProducts')

  const leftover = computed(() => store.state.leftovers.current)
  const Products = computed(() => store.state.products.all)

  function onSubmit() {
    if (route.params.id) {
      store.dispatch('leftovers/update', store.state.leftovers.current)
    } else {
      store.dispatch('leftovers/create', store.state.leftovers.current).then(
        succes => { 
          router.push({name: 'Leftovers'})
        },
        error => {  
          console.log('error') 
        }
      )
    }
  }

  function onDelete() {
    store.dispatch('leftovers/delete', route.params.id).then(
        succes => { 
          router.push({name: 'Leftovers'})
        },
        error => {  
          console.log('error') 
        }
      )
  }

  function productSizes2 (id) { 

      const productData2 = store.state.products.all.find(product => product.id === id);
      

      // console.log(productData2)
      const computedProduct = computed(() => store.getters['leftovers/getProductSizes'](productData2))
      return computedProduct.value
  }
  function productColors ({id,size}) { 
    const productData = store.state.products.all.find(product => product.id === id);
    var computedProduct = computed(() => store.getters['leftovers/getProductColors']({productData,size}))
    return computedProduct.value
  }

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
