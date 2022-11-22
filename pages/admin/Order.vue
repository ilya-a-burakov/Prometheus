<template>
  <section class="br-bot-dark bg-white pd-big">
    <header class="flex-nojustify flex-bottom flex-nowrap flex">
      <h1 class="mn-r-small">Заказ #{{order._id.slice(0,8)}}</h1>
      <TestButton></TestButton>
     </header>
  </section>

   <section class="flex-nowrap flex br-bot-dark bg-white ">
    
    <div class="br-right-dark w-100 flex  pd-big">
      <p class="p-big">
        <span class="t-transp">Статус заказа:</span><br>{{order.status}}
      
        
      </p>
      <button v-if="order.status ==='Создан'"       @click="confirmOrder('Подтвержден','status')" class="button">Подтвердить заказ</button>
      <button v-if="order.status ==='Подтвержден'"  @click="confirmOrder('Создан','status')" class="button">Отменить подтверждение</button>
      <button v-if="order.status ==='Ожидает отправки'"      @click="confirmOrder('Отправлен','status')" class="button">Заказ отправлен</button>
    </div>
 
    <div class="w-100 br-right-dark flex  pd-big">
      <p class="p-big">Статус оплаты:
        <br>
        <span class="t-transp" v-if="payment  && order.payment.type === 'Онлайн' ">{{payment.Status}}</span> 
        <span class="t-transp" v-if="!payment  && order.payment.type === 'Онлайн' ">Не оплачено</span>
        <span class="t-transp" v-if=" order.payment.type !== 'Онлайн' ">{{order.payment.status}}</span>
        

      </p>
      <button v-if="order.payment.status !=='Оплачено' && order.payment.type !== 'Онлайн' "  @click="confirmOrder({status: 'Оплачено'},'payment')" class="button">Изменить статус оплаты</button>
      <button v-if="order.payment.status ==='Оплачено' && order.payment.type !== 'Онлайн'"  @click="confirmOrder({status: 'Неоплачено'},'payment')"  class="button">Отменить оплату</button>
    </div>

     
  </section>


<section class="bg-grey flex-nowrap flex">
  <section class="br-right-dark  bg-grey br-bot-dark pd-big w-50">

    <h5 class="w-100 mn-small">Информация о заказе</h5>
    <div class="mn-medium ">
       <!-- <p class="w-100">Время создания: {{DateToFormattedString(order.createdAt)}}</p> -->
      <div class="mn-small flex-column flex block">
          <InputText :obj="'orders'" :prop="'current.phone'" :value="order.phone" label="Телефон"/>
          <InputText :obj="'orders'" :prop="'current.info.email'" :value="order.info.email" label="Email"/>
          <div class=" w-100 flex-nowrap flex">
            <InputText class="mn-r-small" :obj="'orders'" :prop="'current.info.name'" :value="order.info.name" label="Имя"/>
            <InputText :obj="'orders'" :prop="'current.info.surname'" :value="order.info.surname" label="Фамилия"/>
          </div>
      </div>

       <div class="col flex-column flex block">
          <div class=" w-100 flex-nowrap flex">
            <InputText :obj="'orders'" :prop="'current.info.city'" :value="order.info.city" label="Город"/>
           
          </div>

           <InputText :obj="'orders'" :prop="'current.info.adress'" :value="order.info.adress" label="Адрес"/>
          <InputSelect :obj="'orders'" :prop="'current.info.delivery'" :value="order.info.delivery" label="Выберите тип доставки">
            <option v-if="order.info.city === 'Москва'" value="Самовывоз">Самовывоз</option>
            <option  v-if="order.info.city === 'Москва'" value="Курьером">Курьером</option>
            <option  v-if="order.info.city !== 'Москва'" value="Почтой">Почтой</option>
          </InputSelect>

           <InputSelect :obj="'orders'" :prop="'current.payment.type'" :value="order.payment.type" label="Выберите тип оплаты">
            <option v-if="order.info.delivery === 'Курьером' || order.info.delivery === 'Самовывоз'" value="Наличные" :selected="order.payment.type === 'Наличные'">Наличные</option>
            <option v-if="order.info.delivery === 'Курьером'" value="Курьеру картой" :selected="order.payment.type === 'Курьеру картой'">Курьеру картой</option>
            <option value="Онлайн" :selected="order.payment.type === 'Онлайн'">Онлайн</option>
          </InputSelect>
        </div>

         
    </div> 
     <div class="mn-medium block">
      <p class="w-100">
        Комментарий: {{order.info.comment}} 
      </p>
    </div>
    <button @click="confirmOrder('Отправлен','status')" class="button">Обновить заказ</button>
</section>

  <section class="bg-navy w-50 br-bot-dark pd-big">
    
    <Positions :order="order" :products="Products" />

    
  </section>
</section>




<!--  <section class="flex-nowrap flex br-bot-dark">
    
    <div class="br-right-dark w-100 section-subsection section">
      <p class="mn-semi p-big">Сумма к оплате:  
        <span v-if="order.info.delivery === 'Самовывоз'" class="p-big t-semi">{{ orderTotalPrice / 100 }} ₽</span>
        <span v-if="order.info.delivery === 'Курьером'" class="p-big t-semi">{{ orderTotalPrice / 100 + 350 }} ₽</span>
        <span v-if="order.info.delivery === 'Почтой'" class="p-big t-semi">{{ orderTotalPrice / 100 + 550 }} ₽</span>
        ({{orderTotalPrice}} + 
        <span v-if="order.info.delivery === 'Самовывоз'" >0</span>
        <span v-if="order.info.delivery === 'Курьером'" >350</span>
        <span v-if="order.info.delivery === 'Почтой'">550</span>
        ₽)  
      </p>

      <button class="button">Запросить онлайн</button>
    </div>
    <div class="w-100  section-subsection section">
      <p class="mn-semi p-big">Статус оплаты: {{order.payment.status}}</p>
      <button class="button">Изменить статус оплаты</button>
    </div>
  </section> -->


</template>

<script setup="props">
  // GLOBAL
  import InputText    from '@/components/global/elements/InputText.vue'
  import InputSelect  from '@/components/global/elements/InputSelect.vue'
  // BLOCKS
  import Positions    from '@/components/admin/blocks/Positions.vue'
  // fport libs
  import { computed, ref, defineProps, onMounted,onBeforeUpdate, reactive, toRefs } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  // Import components
  // Accessing router and store
  const store = useStore()
  const route = useRoute()
  // On Mounted
  // onMounted(() => {
      
  //   store.dispatch('payment/getStatus', route.params)
  //   store.dispatch('rent/getStatus', route.params).then(() => {
  //     if ((store.state.rent.current.Status === 'Начата') && !(store.state.rent.current.Status === 'Закрыта'))
  //       setTimer(getYourTime())
  //   })

  //  })

  // Data prefetching
  await store.dispatch('products/fetchProductsPublished')
  await store.dispatch('orders/fetchOrder', route.params.id).then(
    succes => { 
      console.log('succes order')
      store.dispatch('payments/getStatus', route.params.id)
    },
    error => {  
      console.log('eror') 
    }
  )
  // Accessing state
  const order = computed(() => store.state.orders.current)
  const Products = computed(() => store.state.products.all)


  const props = defineProps(['showProduct'])
  props.showProduct = [];

 

  const payment = computed(() => store.state.payments.current)
  
  function confirmOrder(status, prop) {
    // alert(status)
    if (status === 'Подтвержден') {
      store.dispatch('leftovers/create', {type: 'loss', order: route.params.id, positions: store.state.orders.current.items} )
    }

    if (status === 'Создан') {
      store.dispatch('leftovers/delete', route.params.id)
    }
    
    store.dispatch('orders/confirmOrder', {id: route.params.id, status: status,  prop: prop} )
  }

  function changePaymentStatus() {
    store.dispatch('orders/changePaymentStatus', route.params.id)
  }

  

</script>

<style lang="scss">

.vue-select {
  width: inherit;

  margin-right: 1rem;
}
.vue-select-header {
  height: 3rem;
}
</style>
