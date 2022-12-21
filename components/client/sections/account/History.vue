<template>
	<div class="mn-big">
		<p v-if="store.state.orders.current._id === ''" class="mn-small t-semi p-big">История заказов</p>
		<p @click="store.commit('orders/resetOrder')" v-if="store.state.orders.current._id !== ''" class="mn-small t-semi p-big flex-nojustify flex-center flex link-inherit">
			<svg class="mn-r-small" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill="black" fill-rule="evenodd" clip-rule="evenodd" d="M5.34661 10.8333L10.5907 16.0774L9.41217 17.2559L2.15625 10L9.41217 2.74408L10.5907 3.92259L5.34661 9.16667H17.5014V10.8333H5.34661Z" />
			</svg>
			Назад ко всем заказам
		</p>
		<hr class="mn-semi">

		<transition  @before-enter="scrollTop" name="scale">	
			<OrderCard v-if="store.state.orders.current._id !== ''" :order="store.state.orders.current" />
		</transition>

		<transition  @before-enter="scrollTop" name="scale">	
			<div v-if="store.state.orders.current._id === ''" >	
				<section  v-for="order in user.orders" class="pd-big mn-regular order-client-card col"> 
		      <p class="mn-regular flex-center flex-nowrap flex w-100">
						<img v-if="order.status === 'Создан'" 			class="mn-r-small" src="@/assets/icons/status/created.svg"/>
						<img v-if="order.status === 'Подтвержден'"	class="mn-r-small" src="@/assets/icons/status/confirmed.svg"/>
						<img v-if="order.status === 'Ожидает отправки'" 			class="mn-r-small" src="@/assets/icons/status/paid.svg"/>
						<img v-if="order.status === 'Отправлен'" 		class="mn-r-small" src="@/assets/icons/status/finished.svg"/>
						<img v-if="order.status === 'Выполнен'" 		class="mn-r-small" src="@/assets/icons/status/finished.svg"/>
		        <span class="w-100 t-medium p-big">{{order.status}}</span>
		      </p>
		      <ul class="mn-semi order-images-wrapper">
		        <li v-for="(product, index) in orderProducts(order.items.slice(0,2))" :key="product.id" class="mn-r-small">
    	        <img v-if="product.images" :src="require( `@/assets/images/products/${product.images.links[0]}`)">
			        <img v-if="!product.images" :src="require( `@/assets/icons/photo.svg`)">
		    		</li>
		    		<li v-if="order.items.length >= 3" class="mn-r-small order-last-image">
		    			+{{order.items.length - 2 }}
		  			</li>
		      </ul>
		      <div class="flex">
		      	<div>
				      <p class="w-100">
				        <span class="t-transp">Заказ:</span> #{{order._id}} 
				      </p>
				       <p  v-if="order.status !== 'Отправлен' && (order.info.delivery === 'Почтой' || order.info.delivery === 'Курьером')" class="w-100">
				       	<span class="t-transp">Предполагаемая дата отправки:</span>  {{DateToFormattedString(order.createdAt)}}
				      </p>

				       <p  v-if="order.status === 'Отправлен'"  class="w-100">
				       	<span  class="t-transp">Дата отправки:</span> {{DateToFormattedString(order.createdAt)}}
				      </p>
				    </div>
				    <div>
				     <button @click="store.commit('orders/setOrder', order)" class='button'>Смотреть заказ</button>
				    </div>  
			    </div>
			  </section>
	  	</div>
  	</transition>

	</div>

</template>

<script setup="props">
/////////////////////////////
// COMPONENT DEPENDENCIES
/////////////////////////////
import OrderCard from '@/components/client/blocks/OrderCard.vue';

import { defineProps, toRefs, computed } from 'vue';
import { useStore } from 'vuex'
/////////////////////////////
// HELPERS
/////////////////////////////

/////////////////////////////
// CREATED
/////////////////////////////
const props = defineProps({
  user: Object,
});

const store = useStore()

const { user } = toRefs(props);

const cartTotalPrice = computed(() => store.getters['shopcart/cartTotalPrice'])
	

function scrollTop(){
	document.getElementById('page-content').scrollIntoView({behavior: 'smooth', block: "start", inline: "start"});
}

function DateToFormattedString(d) {         
    var fixedDate = new Date(d);                                                     
    var mm = (fixedDate.getMonth()+1).toString(); // getMonth() is zero-based         
    var dd  = (fixedDate.getDate() + 6).toString();            
                         
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

/////////////////////////////
// MOUNTED
/////////////////////////////
</script>

<style lang="scss" scoped>
.order-client-card {
	background: #FBFCFD;	
}
.order-images-wrapper {
	display: flex;

	img {
		width: 4.5rem;
    height: 5.5rem;
		object-fit: cover;
	}

	.order-last-image {
		height: 6rem;
		width: 5rem;

		text-align: center;
		line-height: 6rem;

		font-size: 1.5rem;

		background: #00ff88;
		color: white;

	}
}

</style>
