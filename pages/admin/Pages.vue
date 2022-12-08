<template>
   <!-- Toolbar -->
  <section class="br-bot-dark bg-white pd-big">
    <header class="flex-nojustify flex-bottom flex-nowrap flex">
      <h1 class="mn-r-small">Страницы</h1>
      <router-link :to="'/admin/pages/add'"  class="i-regular pd-thin button-delete button"><img src="@/assets/icons/plus-white.svg"></router-link>
     </header>
  </section>

 

  <section class="cols-1 bg-grey pd-big">
    <!-- Empty State -->
    <p v-if="pages.length === 0">У вас еще нет страниц</p>
    <!-- Objects -->
    <div v-for="page in pages" class="order-card col"> 
    

      <div class="flex block">
        <div>
        <p class="mn-thin p-big">
          {{page.name}}
        </p>

        <router-link :to="{ name: 'PageEdit', params: { url: page.url}}" class="t-transp">
          pages/{{page.url}}
        </router-link>
        </div>

        <div>
          <router-link :to="{ name: 'PageEdit', params: { url: page.url}}" class="mn-r-small">  <span class="t-main">Редактировать</span></router-link>
          <!-- <a @click="store.dispatch('pages/delete', page.url)" class="t-main">Удалить</a> -->
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

  await store.dispatch('pages/fetchAll').then(
    succes => { console.log('sycces') },
    error => {  
      console.log('eror') 
    }
  )
  const pages = computed(() => store.state.pages.all)

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
