<template>
  <div class="order-list">
    <div class="flex">
      <h5 class="mn-small">
        Состав заказа
         
      </h5>
      <div>

        <a v-if="showAddNew === false" class="t-main h5" @click="changeAdd()">Добавить</a>
        <a v-else class="t-main h5" @click="changeAdd()">Закрыть</a>
        <a v-if="showAddNew === false" class="mn-l-small t-main h5" @click="reserOrderList()">Сбросить</a>
        <a v-if="showAddNew === false" class="mn-l-small t-main h5" @click="saveItemList()">Сохранить</a> 
        
      </div>

    </div>
     
    <div v-if="showAddNew !== false" class="mn-small w-100 block">
      <vue-select :options="products"  v-model="techStack" :label-by="'name'"  searchable clear-on-close :close-on-select="true"> </vue-select>
      <button @click="addProductToOrder()" class="w-25 button">Добавить в заказ</button>
    </div>

    <ul  class="mn-semi">
      <li v-for="(product, index) in orderProducts" :key="product.id" class="shop-cart-item mn-small ">
        <!-- <img v-if="product.images" :src="require( `@/assets/images/products/${product.images.links[0]}`)"> -->
        <!-- <img v-if="!product.images" :src="require( `@/assets/icons/photo.svg`)"> -->
        <div class="text-left">
          <p class="name">{{ product.name }}</p>
          
          <div class="mn-small flex">
            <div class="small-underline variant">
              <span v-if="!product.size && !product.color" class="">One-size</span>
              <span v-if="product.size" class="">{{ product.size}}</span>
              <span v-if="product.color && product.size" class="">, </span>
              <span v-if="product.color" class="">{{ product.color}}</span>
              <div v-if="product.edit">{{product.edit}}</div>
            </div>
            
            <p  class="t-demi">{{product.quantity}} x $ {{product.price}}</p>
          </div>

          <div v-if="data[index]" class="flex-nowrap flex w-100">
            <select 
                v-if="product.size"
                @input="updateInputText('orders', 'current.items[' + index + '].size', $event)" 
                :value="product.size"  
                placeholder="hello@example.com"
                class="mn-r-small mn-small input-text input" 
              >
              <option v-for="size in productSizes(product)" :value="size" >{{size}}</option>
            </select>

            <select 
                v-if="product.color"
               
                @input="updateInputText('orders', 'current.items[' + index + '].color', $event)"
                placeholder="hello@example.com"
                class="mn-r-small mn-small input-text input" 
              >

              <option :value="product.color" selected disabled>{{product.color}}</option>
              <option v-for="(color, index) in productColors(product)" :value="color" >{{color}}</option>
            </select>


            <input 
              @input="updateInputText('orders', 'current.items[' + index + '].quantity', $event)" 
              :value="product.quantity" 
              placeholder="Маргарита"
              class="mn-small input-text input" 
            />
          </div>
          <a v-if="!data[index]" @click="changeEdit(index)">Редактировать</a>
          <a v-if="data[index]" @click="deleteItem(product)">Удалить</a>
          <a v-if="data[index]" @click="changeEdit(index)">Закрыть</a>
        </div>
      </li>
    </ul>
  

    <div class=" w-100 flex-center flex block">
      <p class="p-big">Сумма к оплате:<br> 
        <span v-if="order.info.delivery === 'Самовывоз'" class="p-big t-semi">$ {{ orderTotalPrice }}</span>
        <span v-if="order.info.delivery === 'Курьером'" class="p-big t-semi">$ {{ orderTotalPrice + 10 }}</span>
        <span v-if="order.info.delivery === 'Почтой'" class="p-big t-semi">$ {{ orderTotalPrice + 20 }}</span>
        (Заказ $ {{orderTotalPrice}} + доставка
        <span v-if="order.info.delivery === 'Самовывоз'" >0</span>
        <span v-if="order.info.delivery === 'Курьером'" >10</span>
        <span v-if="order.info.delivery === 'Почтой'">20</span>
        ₽)  
      </p>
    </div>
  </div>
</template>


<script setup="props">
    // GLOBAL
  import InputText    from '@/components/global/elements/InputText.vue'
  import InputSelect  from '@/components/global/elements/InputSelect.vue'

	import { defineProps,ref,computed,reactive,toRefs } from 'vue'
	import { useStore } from 'vuex'
	import { useRouter,useRoute } from 'vue-router'

	const store = useStore()
	const router = useRouter()
  const route = useRoute()

	const props = defineProps({
	  order: Object,
    products: Array,
	});

  const orderTotalPrice = computed(() => store.getters['orders/orderTotalPrice'])
  const orderProducts = computed(() => store.getters['orders/orderProducts'])

  let data = reactive([])
  let reactiveData = toRefs(data)

  const techStack = ref(null)

  function test () {
     console.log(techStack)
  }
	
  function addProductToOrder () {
     store.dispatch('orders/addProductToOrder', techStack)
     showAddNew.value = !showAddNew.value;
  }

   function deleteItem (item) {
     store.commit('orders/deleteItemFromOrder', item)
   }

   function saveItemList () {
     store.dispatch('orders/updateOrderItems', route.params.id)
   }

  
  function changeEdit (index) {
     data[index] = !data[index];
  }

  var showAddNew = ref(false)
  // const reactshowAddNew = toRefs(showAddNew)
  
  function reserOrderList () {
    store.dispatch('orders/fetchOrder', route.params.id)
  }

  function changeAdd () {
   showAddNew.value = !showAddNew.value;
  }

  function productSizes (product) { 
    const productData = store.state.products.all.find(p => p.id === product.id)
    var computedProduct = computed(() => store.getters['orders/getProductSizes'](productData))
    return computedProduct.value
  }
  function productColors (product) { 
    const productData = store.state.products.all.find(p => p.id === product.id)
    var computedProduct = computed(() => store.getters['orders/getProductColors']({product, productData}))
    return computedProduct.value
  }

</script>

<style lang="scss" scoped>
.shop-cart-item {
	&:first-of-type { padding-top: 0;}
}

</style>


