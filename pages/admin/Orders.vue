<template>
   <!-- Toolbar -->
  <section class="br-bot-dark bg-white pd-big">
    <header class="flex-nojustify flex-bottom flex-nowrap flex">
      <h1 class="mn-r-small">Заказы</h1>
     
     </header>
  </section>

  <div class="flex-nowrap flex product-tab-header">
    <button @click="changeTab('Создан')" :class="{'product-tab-active':data.currentTab === 'Создан'}" 
    class="br-right-dark w-100 bg-white flex-center pd-semi-big flex">
      Новые
      <div class="round-stat-tab round-stat">{{tabLenght('Создан')}}</div>
    </button>

    <button @click="changeTab('Подтвержден')" :class="{'product-tab-active':data.currentTab === 'Подтвержден'}" 
   class="br-right-dark  w-100 bg-white  flex-center pd-semi-big flex">
      Подтвержденные
    </button>
    <button @click="changeTab('Ожидает отправки')" :class="{'product-tab-active':data.currentTab === 'Ожидает отправки'}" 
   class="br-right-dark  w-100 bg-white  flex-center pd-semi-big flex ">
      Ожидают отправки
    </button>
    <button @click="changeTab('Отправлен')" :class="{'product-tab-active':data.currentTab === 'Отправлен'}" 
   class="br-right-dark  w-100 bg-white  flex-center pd-semi-big flex">
      Отправлены
    </button>
     <button @click="changeTab('all')" :class="{'product-tab-active':data.currentTab === 'all'}" 
    class="br-right-dark w-100  bg-white flex-center pd-semi-big flex">
      Все
    </button>
  </div>



  <section class="cols-3 bg-grey pd-big">
    <div v-for="order in orders" class="order-card col"> 
    

      <div class="flex block">
        <p class="w-100 mn-thin p-big">
          Заказ #{{order._id.slice(0,8)}} 
        </p>
         
         <p class="mn-small t-transp w-100">
          Номер клиента: +7{{order.phone}}<br>
        </p>
        
      </div>

        <p :class="{'new':order.status === 'Создан'}" class=" mn-small order-status w-100 flex-center flex">
          {{order.status}} {{DateToFormattedString(order.createdAt)}}

          <router-link :to="{ name: 'AdminOrder', params: { id: order._id }}" class="i-small"><img class="i-small" src="@/assets/icons/edit.svg"> </router-link>
        </p>
    </div>
  </section>
</template>


<script setup>


  import { computed, onMounted, reactive, toRefs } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute,useRouter } from 'vue-router'
 
  import HeaderAdmin from '@/components/partials/HeaderAdmin.vue'

  import ProductsSection from '@/components/admin/sections/ProductsSection.vue'

  const store = useStore()
  const route = useRoute()
   const router = useRouter()

  await store.dispatch('orders/fetchOrders').then(
    succes => { console.log('sycces') },
    error => {  
      console.log('eror') 
    }
  )

  let data = reactive({currentTab: 'Создан'})
  let reactiveData = toRefs(data)
    
  function tabLenght(tab) {
    if (tab === 'all') {
      return store.state.orders.all.length
    } else {
      const filtered = store.state.orders.all.reverse().filter(function(order, index) {
        if (order.status === tab) return true; 
      })

      console.log(filtered.length)
      
      return filtered.length
    }

  }
  function changeTab (tab) {data.currentTab = tab; console.log(data.currentTab) }
  
  const orders = computed(() => { 
    if (data.currentTab === 'all') {
      return store.state.orders.all.reverse()
    } else {

      const filtered = store.state.orders.all.reverse().filter(function(order, index) {
        if (order.status === data.currentTab) return true; 
      })
      
      return filtered
    } 
   
  })

  function DateToFormattedString(d) {         
    var fixedDate = new Date(d);   
    var yyyy = fixedDate.getFullYear().toString();                                                  
    var mm = (fixedDate.getMonth()+1).toString(); // getMonth() is zero-based         
    var dd  = fixedDate.getDate().toString();    
    var hh  = fixedDate.getHours().toString();    
    var minmin  = fixedDate.getMinutes().toString();             
                         
    return yyyy + '.' + (mm[1]?mm:"0"+mm[0]) + '.' + (dd[1]?dd:"0"+dd[0]) + " в " + (hh[1]?hh:"0"+hh[0]) + ':' + (minmin[1]?minmin:"0"+minmin[0]);
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
    background: #2266FF;
  }

  .block {
    border-radius: 0;
    border: 0;
  }
}

  
</style>
