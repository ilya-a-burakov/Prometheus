<template>
	<div class="pd-big mn-regular order-client-card col"> 
	  <p class="mn-regular flex-center flex-nowrap flex w-100">
			<img v-if="order.status === 'Создан'" 			class="mn-r-small" src="@/assets/icons/status/created.svg"/>
			<img v-if="order.status === 'Подтвержден'"	class="mn-r-small" src="@/assets/icons/status/confirmed.svg"/>
			<img v-if="order.status === 'Ожидает отправки'" 			class="mn-r-small" src="@/assets/icons/status/paid.svg"/>
			<img v-if="order.status === 'Отправлен'" 		class="mn-r-small" src="@/assets/icons/status/finished.svg"/>
			<img v-if="order.status === 'Выполнен'" 		class="mn-r-small" src="@/assets/icons/status/finished.svg"/>
	    <span class="w-100 t-medium p-big">{{order.status}}</span>
	  </p>
	  
	  <div class="flex-nowrap flex">
	  	<div class="mn-r-bold pd-r-big br-right-dark w-66">
	  		<ul class="mn-semi">
	        <li v-for="(product, index) in orderProducts(order.items.slice(0,2))" :key="product.id" class="shop-cart-item">
	        	<img v-if="product.images" :src="require( `@/assets/images/products/${product.images.links[0]}`)">
	          <img v-if="!(product.images)" :src="require( `@/assets/icons/photo.svg`)">
	          
	          <div class="text-left">
	            <p class="name">{{ product.name }}</p>

	            <div class="flex">
	              <div class="small-underline variant">
	                <span v-if="!product.size && !product.color" class="">One-size</span>
	                <span v-if="product.size" class="">{{ product.size}}</span>
	                <span v-if="product.color && product.size" class="">, </span>
	                <span v-if="product.color" class="">{{ product.color}}</span>
	              </div>
	              
	              <p class="t-demi">{{product.quantity}} x {{product.price / 100}} ₽ </p>
	            </div>

	          </div>

	    		</li>
	      </ul>
	      <p class="mn-small t-medium p-big">
	      	Адрес и доставка
	      </p>
	      <p class="mn-small">
	        {{order.info.city}}, {{order.info.adress}} 
	      </p>
	      <p v-if="order.info.delivery === 'Почтой'" class="w-">
	     		Вы выбрали доставку с помощью курьерской службы СДЭК. Ориентировочная дата доставки {{DateToFormattedString(order.createdAt)}}.
	      </p>

	      <p v-if="order.info.delivery === 'Курьером'" class="w-">
	     		Вы выбрали доставку с помощью курьера. Ориентировочная дата доставки {{DateToFormattedString2(order.createdAt)}}.
	      </p>

	      <p v-if="order.info.delivery === 'Самовывоз'" class="w-">
	     		Вы выбрали получение заказа в магазине Москве.
	      </p>
	    </div>


	    <div class="w-40">
	    	<p class="mn-small w-100 t-medium p-big">
	        <span class="t-transp">Заказ:</span> №{{order._id.slice(0,8)}} 
	      </p>
	       <p  v-if="order.info.delivery === 'Почтой'" class="mn-medium w-100">
	       	<span class="t-transp">Предполагаемся дата отправки:</span><br>{{DateToFormattedString(order.createdAt)}}
	      </p>
	      <p  v-if="order.info.delivery === 'Курьером'" class="mn-medium w-100">
	       	<span class="t-transp">Предполагаемся дата отправки:</span><br>{{DateToFormattedString2(order.createdAt)}}
	      </p>
	      <p  v-if="order.info.delivery === 'Самовывоз'" class="mn-medium w-100">
	       	<span class="t-transp">Тип доставки:</span><br>Самовывоз
	      </p>
	      <hr class="mn-medium">

	      <div :class="{'mn-semi': order.info.delivery == ''}" class="flex">
	        <p  class="t-transp">Итого</p>
	        <p>{{ cartTotalPrice / 100 }} ₽</p>
	      </div>
	      <div v-if="order.info.delivery !== ''" class="mn-semi flex">
	        <p  class="t-transp">Доставка</p>
	        <p v-if="order.info.delivery === 'Самовывоз'">Бесплатно</p>
	        <p v-if="order.info.delivery === 'Курьером'">350 ₽</p>
	        <p v-if="order.info.delivery === 'Почтой'">550 ₽</p>
	      </div>
	      <div class="mn-semi intotal flex-bottom flex">
	        <p  class="t-transp">Всего к оплате</p>
	        <p v-if="order.info.delivery === ''" class="p-big t-semi">{{ cartTotalPrice / 100 }} ₽</p>
	        <p v-if="order.info.delivery === 'Самовывоз'" class="p-big t-semi">{{ cartTotalPrice / 100 }} ₽</p>
	        <p v-if="order.info.delivery === 'Курьером'" class="p-big t-semi">{{ cartTotalPrice / 100 + 350 }} ₽</p>
	        <p v-if="order.info.delivery === 'Почтой'" class="p-big t-semi">{{ cartTotalPrice / 100 + 550 }} ₽</p>
	      </div>
	      <hr  v-if="order.status === 'Подтвержден'" class="mn-semi" >
	     <!-- 	<button 
	     	@click="requestPayment(order)"
	     	v-if="
	     		order.status === 'Подтвержден' 
	     		&& order.payment.type === 'Online'
	     		&& payment.Status !== 'CONFIRMED'
	     		&& payment.Status !== 'REFUNDED'
	     	" 
	     	class='w-100 button'>Оплатить заказ</button> -->
	     	<span class="t-transp" v-if="payment && payment.Status === 'CONFIRMED'">Оплачено</span> 
	    </div>  
	  </div>
	</div>		

</template>


<script setup="props">
	import { defineProps,computed } from 'vue'
	import { useStore } from 'vuex'
	import { useRouter } from 'vue-router'

	const store = useStore()
	const router = useRouter()

	const props = defineProps({
	  order: Object,
	});



	await store.dispatch('payments/getStatus', props.order._id)

	const payment = computed(() => store.state.payments.current)
	const cartTotalPrice = computed(() => store.getters['orders/orderTotalPrice'])

	function requestPayment(order) {
		 store.dispatch("payments/newPayment", order);
	}
	
	function DateToFormattedString(d) {         
    var fixedDate = new Date(d);                                                     
    var mm = (fixedDate.getMonth()+1).toString(); // getMonth() is zero-based         
    var dd  = (fixedDate.getDate() + 6).toString();            
                         
    return (dd[1]?dd:"0"+dd[0]) + '/' + (mm[1]?mm:"0"+mm[0]);
  }

  function DateToFormattedString2(d) {         
    var fixedDate = new Date(d);                                                     
    var mm = (fixedDate.getMonth() + 1).toString(); // getMonth() is zero-based         
    var dd  = (fixedDate.getDate() + 1).toString();            
                         
    return (dd[1]?dd:"0"+dd[0]) + '/' + (mm[1]?mm:"0"+mm[0]);
  }

	function orderProducts (items) {
	  return items.map(({ id, size, color, quantity }) => {
	    const product = store.state.products.all.find(product => product.id === id)
	    return {
	      name: product.name,
	      images: product.images[0],
	      color,
	      size,
	      price: product.price,
	      id: product.id,
	      quantity
	    }
	  })
	}

</script>

<style lang="scss" scoped>
.shop-cart-item {
	&:first-of-type { padding-top: 0;}
}

</style>


