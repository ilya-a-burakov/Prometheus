<template>
   <!-- Toolbar -->
  <section class="br-bot-dark bg-white pd-big">
    <header class="flex-nojustify flex-bottom flex-nowrap flex">
      <h1 class="mn-r-small">Запросы обратного звонка</h1>
    </header>
  </section>

 

  <section class="cols-1 bg-grey pd-big">
    <!-- Empty State -->
    <p v-if="backcalls.length === 0">У вас еще нет запросов обратного звонка</p>
    <!-- Objects -->
    <div v-for="backcall in backcalls" class="order-card col"> 
    

      <div class="flex block">
        <div>
          <p> Запрос от {{backcall.phone}} </p> 
          <p  class="t-transp">Добавлен в {{DateToFormattedString(backcall.createdAt)}}</p>
          
        </div>

        <div>
          <p>Интересуемый товар</p>
          <p class="t-transp">
            <router-link v-if="backcall.product" :to="{ name: 'Product', params: { id: backcall.product}}">
              Товар #{{backcall.product.slice(0,8)}}
            </router-link>
            <span v-else>Товар не указан</span>
          </p>
       </div>

        <div class="t-right">
          <p>{{backcall.status}}</p>
          <p>
            <a v-if="backcall.status !== 'Обработан'" @click="store.dispatch('backcalls/update', {id: backcall._id, status: 'Обработан'})" class="t-main">Подтвердить</a>
            <a v-if="backcall.status === 'Обработан'" @click="store.dispatch('backcalls/delete', backcall._id)" class="t-main">Удалить</a>
          </p>
        </div>
      </div>

     
        
    </div>
  </section>
</template>


<script setup>


  import { computed, onMounted, reactive, toRefs } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute,useRouter } from 'vue-router'
 
  const store = useStore()
  const route = useRoute()
  const router = useRouter()

  await store.dispatch('backcalls/fetchAll').then(
    succes => { console.log('sycces') },
    error => {  
      console.log('eror') 
    }
  )
  const backcalls = computed(() => store.state.backcalls.all)

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
