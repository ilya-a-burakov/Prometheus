<template>
   <!-- Toolbar -->
  <section class="br-bot-dark bg-white pd-big">
    <header class="flex-nojustify flex-bottom flex-nowrap flex">
      <h1 v-if="route.params.url" class="mn-r-small">Редактировать страницу</h1>
      <h1 v-else class="mn-r-small">Добавить страницу</h1>
     
     </header>
  </section>


  <section class="bg-white pd-b-zero pd-big ">
    <!-- Empty State -->
    <InputText :obj="'pages'" :prop="'current.name'" :value="page.name" label="Название страницы"/>
    <InputText :obj="'pages'" :prop="'current.url'" :value="page.url" label="URL"/>
    <InputText :obj="'pages'" :prop="'current.groups'" :value="page.groups" label="Отобразить в"/>
  </section>

  <div  class="bg-white pd-t-zero pd-big page-content-edit"> 
    <p class="mn-small t-semi p-big">Контент страницы</p>
    <textarea
      @input="updateInputText('pages', 'current.content', $event)" 
      :value="page.content" 
      placeholder="Не указано"
      class="mn-small input-textarea"
    />
  </div>
  <section class="pd-big flex">
    <a @click="onSubmit()" class="button">Сохранить</a> 
    <a v-if="route.params.url" @click="onDelete()" class="t-main bg-white button">Удалить</a>
  </section>
</template>


<script setup>
  import InputText  from '@/components/global/elements/InputText.vue'

  import { computed, onMounted, reactive, toRefs } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute,useRouter } from 'vue-router'
 
  const store = useStore()
  const route = useRoute()
  const router = useRouter()

  if (route.params.url) {
    await store.dispatch('pages/fetch', route.params.url).then(
      succes => { console.log('succes') },
      error => {  
        console.log('error') 
      }
    )
  } else {
    store.commit('pages/init');
  }
  const page = computed(() => store.state.pages.current)

  function onSubmit() {
    if (route.params.url) {
      store.dispatch('pages/update', store.state.pages.current)
    } else {
      store.dispatch('pages/create', store.state.pages.current).then(
        succes => { 
          router.push({name: 'Pages'})
        },
        error => {  
          console.log('error') 
        }
      )
    }
  }

  function onDelete() {
    store.dispatch('pages/delete', store.state.pages.current.url).then(
        succes => { 
          router.push({name: 'Pages'})
        },
        error => {  
          console.log('error') 
        }
      )
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

.page-content-edit {
  textarea {
    min-height: 16rem;
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
