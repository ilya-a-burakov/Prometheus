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
      <div class="mn-big delivery">
        <p class="mn-medium t-medium p-big">Personal data</p>
        <!-- Name and surname -->
        <div class="mn-small flex-nowrap flex">
          <InputText :obj="'orders'" :prop="'current.name'"    :value="order.name"     label="Name*"    placeholder="Elisabeth"   class="mn-r-semi"/>
          <InputText :obj="'orders'" :prop="'current.surname'" :value="order.surname"  label="Surname"  placeholder="Smith"/>
        </div>
        <!-- Phone and email -->
        <div class="flex-nowrap flex">
          <InputText :obj="'orders'" :prop="'current.phone'" label="Your phone" placeholder="+66660929941502" :value="order.phone" class="mn-r-semi"/>
          <InputText :obj="'orders'" :prop="'current.email'" label="Email" placeholder="example@gmail.com" :value="order.email"/>
        </div>
      </div>

      <!-- Type of delivery -->
      <div class="delivery">
        <p class="mn-medium t-medium p-big">Delivery</p>

        <div class="mn-small flex-nowrap flex">
          <InputText :obj="'orders'" :prop="'current.city'" :value="order.city" label="City" placeholder="Your city" />
        </div>

        <div v-if="order.city === 'Tbilisi'" class="mn-medium flex-nowrap flex">
          <label class="input-radio-label"> 
            <div class="round-wrapper">
              <input 
                @click="updateInputText('orders', 'current.delivery', $event)" 
                class="round radiobutton" 
                type="radio" 
                name="delivery" 
                value="By courier"
                :checked="setInput({object:'orders',property:'current.delivery', element:order.delivery === 'By post' ? 'By courier' : order.delivery === '' ? 'By courier' : order.delivery})"
              > 
              <div class="round-checkmark round"></div>
            </div>
            <div class="text">
              <p class="mn-thin t-demi">Delivery by courier (1-3 days)</p>
              <p class="mn-small t-transp">Nearest delivery date:<br>{{someFormattedDate1}} </p>
              <p class="mn-thin">Within Tbilisi — $ 10</p>
              <p>Outside Tbilisi — $20 </p>
            </div>
          </label>

          <label class="input-radio-label"> 
            <div class="round-wrapper">
              <input 
                @click="updateInputText('orders', 'current.delivery', $event)" 
                class="round radiobutton" 
                type="radio" 
                name="delivery" 
                value="Pickup"
              > 
              <div class="round-checkmark round"></div>
            </div>
            <div class="text">
              <p class="mn-thin t-demi">Pickup – free</p>
            </div>
          </label>
        </div>

        <p class="mn-big">You can read all shipping information <a href="" class="t-main underline">here</a></p>
      </div>

      <!-- Pickup -->
      <div v-if="order.delivery === 'Pickup'" class="mn-big delivery">
        <p>
          You can pick up your order at:
          <br>
          <span class="t-demi">Tbilisi, Mukhatgverdi Street, 19</span>
          <br><br>
          The manager will call you to agree on a convenient date and time.
        </p>
      </div>

      <!-- Delivery adress -->
      <div v-if="order.delivery === 'By courier' || order.delivery === 'By post'" class="mn-medium delivery">
        <p class="mn-medium t-medium p-big">Delivery Adress</p>
        <!-- Adress-->
        <div class="mn-small flex-nowrap flex">
          <InputText :obj="'orders'" :prop="'current.adress'" label="Street, house" placeholder="745 Garfield Ave, apt 132@gmail.com" :value="order.adress"/>
        </div>
      </div>

      <!-- Type of payment -->
      <div v-if="order.delivery === 'By courier' || order.delivery === 'Pickup'"  class="delivery">
        <p class="mn-medium t-medium p-big">Payment</p>

        <div class="mn-small flex-nowrap flex">
          <label class="mn-small input-text-label">
            <span class="t-transp p-small">Select a Payment Method</span>
            <select 
              @input="updateInputText('orders', 'current.payment.type', $event)" 
              :value="order.payment.type" 
              class="mn-small input-text input">
              <option value="Cash">Cash</option>
              <option :selected="setInput({object:'orders',property:'current.payment.type',element:'Online'})" value="Online" >Online</option>
            </select>
          </label>
        </div>
      </div>

       <div v-if="order.delivery === 'By post'"  class="delivery">
        <p class="mn-medium t-medium p-big">Payment</p>

        <div class="mn-small flex-nowrap flex">
          <label class="mn-small input-text-label">
            <span class="t-transp p-small">Select a Payment Method</span>
            <select 
              @input="updateInputText('orders', 'current.payment.type', $event)" 
              :value="order.payment.type" 
              class="mn-small input-text input">
              <option value="Online" :selected="setInput({object:'orders',property:'current.payment.type',element:'Online'})" >Online</option>
            </select>
          </label>
        </div>
      </div>

      <div class="mn-big flex-nowrap flex">
        <InputText :obj="'orders'" :prop="'current.comment'" label="Comments to order" placeholder="Leave any comments" :value="order.comment"/>
      </div>
    
      <button :disabled="errorName || errorPhone || errorCity || errorAdress" @click="onSubmit()" class="button">Place an Order</button>
    </div>

    <div v-if="products.length > 0" class="order-list col">
      <p class="mn-medium p-big">Your Order</p>
      
      <ul class="mn-semi">

        <li v-for="product in products" :key="product.id" class="shop-cart-item">

        <img v-if="product.images" :src="require( `@/assets/images/products/${product.images.links[0]}`)">
        <img v-if="!product.images" :src="require( `@/assets/icons/photo.svg`)">
          
          <div class="text-left">
            <p class="name">{{ product.name }}</p>

            <div class="flex">
              <div class="small-underline variant">
                <span v-if="!product.size && !product.color" class="">One-size</span>
                <span v-if="product.size" class="">{{ product.size}}</span>
                <span v-if="product.color && product.size" class="">, </span>
                <span v-if="product.color" class="">{{ product.color}}</span>
              </div>
              
              <p class="t-demi">{{product.quantity}} x $ {{product.price}}</p>
            </div>

          </div>

          
        </li>

      </ul>

      <div :class="{'mn-semi': order.delivery == ''}" class="flex">
        <p>Total</p>
        <p>$ {{ cartTotalPrice }}</p>
      </div>
      <div v-if="order.delivery !== ''" class="mn-semi flex">
        <p>Delivery</p>
        <p v-if="order.delivery === 'Pickup'">Free</p>
        <p v-if="order.delivery === 'By courier'">$ 10</p>
        <p v-if="order.delivery === 'By post'">$ 20</p>
      </div>
      <div class="intotal flex-bottom flex">
        <p>Total to be paid</p>
        <p v-if="order.delivery === ''" class="p-big t-semi">$ {{ cartTotalPrice }}</p>
        <p v-if="order.delivery === 'Pickup'" class="p-big t-semi">$ {{ cartTotalPrice}}</p>
        <p v-if="order.delivery === 'By courier'" class="p-big t-semi">$ {{ cartTotalPrice + 10 }}</p>
        <p v-if="order.delivery === 'By post'" class="p-big t-semi">$ {{ cartTotalPrice + 20 }}</p>
      </div>


    </div>

  </div>

</section>

</template>


<script setup>
// Import components
import InputText  from '@/components/global/elements/InputText.vue'
import AskToLogin  from '@/components/client/blocks/AskToLogin.vue'
// Sections
import Succes  from '@/components/client/sections/order/Succes.vue'
// Import libs
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute,useRouter } from 'vue-router'
// Accessing router and store
const store = useStore()
const route = useRoute()
const router = useRouter()
// Accessing state
const products = computed(() => store.getters['shopcart/cartProducts'])
const order = computed(() => store.state.orders.current)
const user = computed(() => store.state.users.current)
const cartTotalPrice = computed(() => store.getters['shopcart/cartTotalPrice'])

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
  if (store.state.orders.current.delivery !== "Самовывоз") { 
    return store.state.orders.current.adress.length < 2 ? "Заполните поле адреса" : false
  } else {
    return false
  }
})

var someDate = new Date();
var numberOfDaysToAdd = 6;
someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
var dd = someDate.getDate();
var mm = someDate.getMonth() + 1;
var y = someDate.getFullYear();

var someFormattedDate = dd + '/'+ mm + '/'+ y;

var someDate1 = new Date();
var numberOfDaysToAdd1 = 1;
someDate1.setDate(someDate1.getDate() + numberOfDaysToAdd1); 
var dd1 = someDate1.getDate();
var mm1 = someDate1.getMonth() + 1;
var y1 = someDate1.getFullYear();

var someFormattedDate1 = dd1 + '/'+ mm1 + '/'+ y1;

// Input validation
function setInput({object,property,element}) {
  store.commit('updateInputText',{object,property,element}); 
  return true 
  // if ( store.state.orders.current[property] === element) { 
   
    
  // } else {
  //   console.log(store.state.orders.current.delivery)
  //    // element = store.state.orders.current.delivery] 
  //    // store.commit('updateInputText',{object,property,element}); 
  //   return true
  // }
} 


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



  .order-form {
    order: 2;
  }

  .order-finished {

    order: 2;

    .order-data {
      background: #F4F7FF;
    }
  }

  .order-list {
    order: 1;
    height: fit-content;
    padding: 2.5rem;
    border-radius: 2rem;

    background: #F4F7FF;

    
  }
}

.intotal {
      padding-top: 1.5rem;
      border-top: 1px solid rgba(0,0,0,0.1);
    }
  
</style>
