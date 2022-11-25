<template>
   <!-- Toolbar -->
  <section class="pageheader section">
    
    <div class="title">
      <h1>Пользователи</h1>
    </div>
  </section>

  <div class="flex-nowrap flex product-tab-header">
    <button @click="changeTab('all')" :class="{'product-tab-active':data.currentTab === 'all'}" 
    class="br-right-dark product-tab section-panel section">
      Все
    </button>

    <button @click="changeTab('user')" :class="{'product-tab-active':data.currentTab === 'user'}" 
    class="br-right-dark product-tab section-panel section">
      Клиенты
    </button>

    <button @click="changeTab('moderator')" :class="{'product-tab-active':data.currentTab === 'moderator'}" 
    class="product-tab section-panel section">
      Персонал
    </button>

    <button @click="changeTab('admin')" :class="{'product-tab-active':data.currentTab === 'admin'}" 
    class="product-tab section-panel section">
      Администраторы
    </button>
  </div>



  <section class="cols-3 bg-grey br-bot-dark section-subsection section">
    <TestButton></TestButton>
    <div v-for="user in users" class="order-card col"> 
      <p class=" mn-small order-status w-100">
         <ul>
          <li v-for="role in user.roles" :key="role">{{role.translate}}</li>
        </ul>
      </p>

      <div class="flex block">
        <p class="w-100 mn-thin p-big">
          <!-- +7{{user.phone}}  -->
        </p>
         
         <p class="w-100">Время регистрации: {{DateToFormattedString(user.createdAt)}}</p>
         <p class="w-100">
          Номер клиента: +7{{user.phone}}<br>
        </p>
        <p class="mn-small w-100">
          <!-- Имя клиента: {{order.info.name}}<br> -->
        </p>
        <hr class="mn-small">
        <router-link :to="{ name: 'User', params: { phone: user.phone }}" class="link">Редактировать</router-link>
      </div>
    </div>
  </section>
</template>


<script setup>


  import { computed, onMounted, reactive, toRefs } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
 
  import HeaderAdmin from '@/components/partials/HeaderAdmin.vue'

  import ProductsSection from '@/components/admin/sections/ProductsSection.vue'

  const store = useStore()
  const route = useRoute()

  store.dispatch('users/fetchUsers')

  let data = reactive({currentTab: 'all'})
  let reactiveData = toRefs(data)
    

  function changeTab (tab) {data.currentTab = tab; console.log(data.currentTab) }
  
  const users = computed(() => { 
    if (data.currentTab === 'all') {
      return store.state.users.all
    } else {

      const filtered = store.state.users.all.filter(function(user, index) {
        return user.roles.some(r=> r.name === data.currentTab)
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
