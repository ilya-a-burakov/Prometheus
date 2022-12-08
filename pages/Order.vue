<template>

<section class="order section">

	<!-- Ask to login  -->
	<AskToLogin class="mn-big" v-if="store.state.users.current.status.loggedIn === false" /> 

	<!-- Order form -->
	<div class="order-wrapper cols-2">
		 
		<!-- Empty State   -->
		<div v-if="products < 1" class="order-form">
			<p>You have an empty cart. To place an order, add items to your shopping cart</p> 
		</div>

		<Succes :order="order" v-if="order.status === true && products.length > 0" />

		<div v-if="order.status !== true && products.length > 0" class="order-form col">
			
			<!-- Client info -->
			<div class="mn-big">
				<p class="mn-medium t-medium p-big">Personal Data</p>
				<!-- Name and surname -->
				<div class="flex-nowrap flex">
					<InputText :obj="'orders'" :prop="'current.name'"    :value="order.name"     label="Name*"    placeholder="Elisabeth"   class="mn-r-semi"/>
					<InputText :obj="'orders'" :prop="'current.surname'" :value="order.surname"  label="Surname"  placeholder="Smith"/>
				</div>
				<!-- Phone and email -->
				<div class="flex-nowrap flex">
					<InputText :obj="'orders'" :prop="'current.phone'" label="Your phone" placeholder="+66660929941502" :value="order.phone" class="mn-r-semi"/>
					<InputText :obj="'orders'" :prop="'current.email'" label="Email" placeholder="example@gmail.com" :value="order.email"/>
				</div>
				<!-- Comment -->
				<div class="mn-big flex-nowrap flex">
					<InputText :obj="'orders'" :prop="'current.comment'" label="Comments to order" placeholder="Leave any comments" :value="order.comment"/>
				</div>
		
			</div>

			<!-- Delivery adress -->
			<div class="mn-big">
				<p class="mn-small t-medium p-big">Delivery Adress</p>
				<p class="mn-medium">You can read about <a href="/pages/delivery" class="t-main underline">shipping information here.</a></p>

				<div class="flex-nowrap flex">
					<InputText :obj="'orders'" :prop="'current.country'" :value="order.country" label="Country" placeholder="Your country" class="mn-r-semi" />
					<InputText :obj="'orders'" :prop="'current.city'" :value="order.city" label="City" placeholder="Your city" />
				</div>

				<div class="flex-nowrap flex">
					<InputText :obj="'orders'" :prop="'current.adress'" label="Street, house" placeholder="745 Garfield Ave, apt 13" :value="order.adress"/>
				</div>
			</div>

			<!-- Type of delivery -->
			<div class="mn-big">
				<p class="mn-medium t-medium p-big">Type of Delivery</p>
				<!-- Adress-->
				<div class="flex-nowrap flex">
					<InputRadio :obj="'orders'" :prop="'current.delivery'" :label="'Courier'" extra="$ 20" :name="'delivery'" :value="order.delivery" class="mn-r-small"/>
					<InputRadio :obj="'orders'" :prop="'current.delivery'" :label="'Post'" extra="$ 10" :name="'delivery'" :value="order.delivery" class="mn-r-small"/>
					<InputRadio :obj="'orders'" :prop="'current.delivery'" :label="'Pickup'" extra="FREE" :name="'delivery'" :value="order.delivery"/>
				</div>
			</div>

			<!-- Type of payment -->
			<div  class="mn-big">
				<p class="mn-medium t-medium p-big">Payment</p>

				<div class="mn-small flex-nowrap flex">
					<InputSelect :obj="'orders'" :prop="'current.payment.type'" :value="order.payment.type" :label="''">
						<option value="" selected disabled hidden>Select type of payment</option>
						<option value="Cash">Cash</option>
						<option value="Online">Online</option>
					</InputSelect>
				</div>
			</div>

			<!-- Send order -->
			<button :disabled="errorName || errorPhone || errorCity || errorAdress || errorDelivery || errorPayment" @click="onSubmit()" class="button">Place an Order</button>
		</div>

		<!-- Order Items -->
		<div v-if="products.length > 0" class="order-list col">
			<p class="mn-medium p-big">Your Order</p>
			
			<ul class="mn-semi">
				<CardOrderItem v-for="product in products" :key="product.id" editable="true" :product="product" 
					:increase="product => store.commit('shopcart/incrementItemQuantity', product)"
					:decrease="product => store.dispatch('shopcart/decreaseQuantity', product)"
					:remove="product => store.dispatch('shopcart/removeProductFromCart', product)"
				/>

			</ul>

			<div :class="{'mn-semi': order.delivery == ''}" class="flex">
				<p>Total</p>
				<p>$ {{ cartTotalPrice }}</p>
			</div>
			<div v-if="order.delivery !== ''" class="mn-semi flex">
				<p>Delivery</p>
				<p v-if="order.delivery === 'Pickup'">Free</p>
				<p v-if="order.delivery === 'Courier'">$ 20</p>
				<p v-if="order.delivery === 'Post'">$ 10</p>
			</div>
			<div class="flex-bottom flex">
				<p>Total to be paid</p>
				<p v-if="order.delivery === ''" class="p-big t-semi">$ {{ cartTotalPrice }}</p>
				<p v-if="order.delivery === 'Pickup'" class="p-big t-semi">$ {{ cartTotalPrice}}</p>
				<p v-if="order.delivery === 'Courier'" class="p-big t-semi">$ {{ cartTotalPrice + 10 }}</p>
				<p v-if="order.delivery === 'Post'" class="p-big t-semi">$ {{ cartTotalPrice + 20 }}</p>
			</div>


		</div>

	</div>

</section>

</template>


<script setup>
///////////////////////////////////////////////////////////////////////////////////////////////////
// Import components
///////////////////////////////////////////////////////////////////////////////////////////////////
// Inputs
import InputRadio     from 'prometheus/components/global/elements/InputRadio.vue'
import InputText      from 'prometheus/components/global/elements/InputText.vue'
import AskToLogin     from 'prometheus/components/client/blocks/AskToLogin.vue'
// Block
import CardOrderItem  from 'prometheus/components/client/blocks/CardOrderItem.vue'
// Sections
import Succes         from '@/components/client/sections/order/Succes.vue'
///////////////////////////////////////////////////////////////////////////////////////////////////
// Import libs
///////////////////////////////////////////////////////////////////////////////////////////////////
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute,useRouter } from 'vue-router'
///////////////////////////////////////////////////////////////////////////////////////////////////
// Variables and computed
///////////////////////////////////////////////////////////////////////////////////////////////////
// Accessing router and store
const store = useStore()
const route = useRoute()
const router = useRouter()
// Accessing state
const products = computed(() => store.getters['shopcart/cartProducts'])
const order = computed(() => store.state.orders.current)
const user = computed(() => store.state.users.current)
const cartTotalPrice = computed(() => store.getters['shopcart/cartTotalPrice'])
///////////////////////////////////////////////////////////////////////////////////////////////////
// Before created
///////////////////////////////////////////////////////////////////////////////////////////////////
router.afterEach(async (to, from, next) => {
	if (store.state.orders.current.status === true) { 
			// store.commit('products/fetchProduct', to.params.id).then(() => {
			store.commit('shopcart/setShopCartNull')
			store.commit('orders/setOrderCloses')
		// })  
		next()
	} else {
		next()
	}
})
///////////////////////////////////////////////////////////////////////////////////////////////////
// Store Verification
///////////////////////////////////////////////////////////////////////////////////////////////////
const errorName = computed(() => {
	return store.state.orders.current.name.length < 2 ? "Заполните поле имени" : false
})

const errorPhone = computed(() => {
	return store.state.orders.current.phone.length < 6 ? "Заполните поле телефона" : false
})

const errorCity = computed(() => {
	return store.state.orders.current.city.length < 2 ? "Заполните поле города" : false
})

const errorAdress = computed(() => {
	if (store.state.orders.current.delivery !== "Pickup") { 
		return store.state.orders.current.adress.length < 2 ? "Заполните поле адреса" : false
	} else {
		return false
	}
})

const errorDelivery = computed(() => {
	if (store.state.orders.current.delivery) { 
		return false
	} else {
		return true
	}
})

const errorPayment = computed(() => {
	if (store.state.orders.current.order.payment.type) { 
		return false
	} else {
		return true
	}
})
///////////////////////////////////////////////////////////////////////////////////////////////////
// Methods
///////////////////////////////////////////////////////////////////////////////////////////////////
function onSubmit() {
	localStorage.removeItem('shopcart')
	store.dispatch('orders/addOrder')
}
</script>

<style lang="scss">

.order-wrapper {
	gap: 2.5rem;
}

.round-wrapper {
	position: relative;

	.round {
		margin: 0;
		margin-right: 1rem;
	}

	input:checked {
		background: #2266FF;
	}

	.round-checkmark {
		position: absolute;
		width: 0.5rem;
		height: 0.5rem;
		background: white;

		left: 0.5rem;
		top:  0.5rem;

		opacity: 1;
	}
}

.order {
	padding-top: 2rem;

	.order-form     { order: 2; }
	.order-finished { order: 2; .order-data {background: #F4F7FF; } }
	
	.order-list {
		order: 1;
		height: fit-content;
		padding: 2.5rem;
		border-radius: 2rem;

		border: 1px solid rgba(0,0,0,0.1);
	}
}
	
</style>
