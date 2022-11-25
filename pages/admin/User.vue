<template>
  <section class="section-header section">
    <div class="title">
      <h1 class="mn-regular">Редактировать пользователя</h1>
       <p class="t-transp w-100 h3">
        #{{user._id}} 
      </p>
    </div>

  </section>

  <section class=" bg-grey br-bot-dark section-subsection section">

    <h5 class="w-100 mn-small">Данные для входа  <TestButton></TestButton>

    </h5>
    <div class="cols-2 mn-medium ">
       <!-- <p class="w-100">Время создания: {{DateToFormattedString(order.createdAt)}}</p> -->
      <div class="col flex block">
        <p class="mn-small w-100">
          Номер клиента:
        </p>
        <div class="w-100 flex-nowrap flex">
          <input 
            @input="updateInputText('users', 'current.phone', $event)" 
            :value="user.phone"  
            placeholder="hello@example.com"
            class="mn-r-small input-text input" 
          >
           <button class="button">Обновить</button> 
        </div>
      </div>
       <div class="col flex block">
        <p class="mn-small w-100">
          Роли: 
        </p>
        <vue-select :options="roles" :label-by="'translate'" :close-on-select="true"> </vue-select>
        
    </div>
      
    </div> 
     <div class="flex block">
      <p class="mn-small  w-100">
        Пароль:
      </p>
      <div class="w-100 flex-nowrap flex">
      <input 
          @input="updateInputText('users', 'current.phone', $event)" 
          placeholder="Новый пароль"
          class="w-40 mn-r-small input-text input" 
        >
        <input 
          @input="updateInputText('users', 'current.phone', $event)" 
          placeholder="Повторите новый пароль"
          class="w-40 mn-r-small input-text input" 
        >
        <button class="w-20 button">Сохранить пароль</button> 
      </div>
    </div>

   
  </section>
</template>

<script setup>
  // Import libs
  import { computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  // Accessing router and store
  const store = useStore()
  const route = useRoute()
  // Data prefetching
  store.dispatch('users/fetchRoles')
  store.dispatch('users/fetchUser', route.params.phone)
  // Accessing state
  const user = computed(() => store.state.users.current)
  const roles = computed(() => store.state.users.roles)
</script>

<style lang="scss" scoped>

.vue-select {
  width: 100%;
  background: #F7F7F7;
  border: 0;
}
.vue-select-header {
  height: 3rem;
  padding-left: 1rem;

  input {
    font-size: 1.125rem;
    font-weight: 300;

    &::placeholder {
      color: ba
    }
  }
}

</style>
