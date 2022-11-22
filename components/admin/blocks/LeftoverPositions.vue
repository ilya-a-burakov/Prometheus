<template>
  <div class="w-100">
    <div class="flex">
      <h5 class="mn-small">
        Изменения остатков
      </h5>
      <div>
        <a v-if="showAddNew === false" class="mn-r-small t-main h5" @click="changeAdd()">Добавить</a>
        <a v-else class="t-main h5" @click="changeAdd()">Закрыть</a>
        <a v-if="showAddNew === false" class="mn-r-small t-main h5" @click="reserOrderList()">Сбросить</a>
      </div>

    </div>
     
    <div  v-if="showAddNew !== false"  class="mn-small block">
      <div class="w-100 flex-nowrap flex ">
        <div class="w-100 flex-nowrap flex">
          <vue-select :options="products"  v-model="techStack" :label-by="'name'"  searchable clear-on-close  :placeholder="'Выберите товар'" :close-on-select="true"> </vue-select>
          <vue-select v-if="techStack && techStack.modifications.length > 0" :options="techStack.modifications"  :placeholder="'Выберите модификацию'"  v-model="techStack2" :label-by="'name'"  searchable clear-on-close :close-on-select="true"> </vue-select>
        </div>
        <input 
          class="mn-r-regular w-20 input-text input" 
          type="number"
          v-model.number="techStack3" 
          placeholder="Количество">
        <button :disabled="isProductValid" @click="addProductToLeftover()" class=" w-20 button">Добавить</button>
      </div>
    </div>
  
    <ul  class="flex-column flex-wrap block">
      <span v-if="order.positions.length < 1" class="w-100">Вы еще не добавили позиции</span> 

      <li v-for="(product, index) in order.positions" :key="product.id" class="w-100">
        <!-- <img v-if="product.images" :src="require( `@/assets/images/products/${product.images.links[0]}`)"> -->
        <!-- <img v-if="!product.images" :src="require( `@/assets/icons/photo.svg`)"> -->
        <div class="w-100 flex-center flex-nowrap flex">
          <span class="mn-r-regular w-100">{{ product.name }}</span>
          <input 
            @input="updateInputText('leftovers', 'current.positions[' + index + '].quantity', $event)" 
            :value="product.quantity" 
            placeholder="Маргарита"
            class="mn-r-regular w-20 input-text input" 
          />
          <a class="w-20 button" @click="deleteItem(product)">Удалить</a>
        </div>
        <hr v-if="!(index == order.positions.length - 1)" class="mn-t-small mn-small w-100 ">
      </li>
    </ul>
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

  let data = reactive([])
  let reactiveData = toRefs(data)

  const techStack = ref(null)
  const techStack2 = ref(null)
  const techStack3 = ref(null)
  function test () {
     console.log(techStack)
  }

 
  const isProductValid = computed(() => { 
    if (techStack.value === null || techStack3.value === null || techStack3.value === '') {
      return true;
    } else {
      if (techStack.value.modifications.length > 0) {
        if (techStack2.value === null) {
          return true 
        } else {
          return false 
        }
      }
    }

    })
   //  if (techStack.value.modifications.length > 0) {
   //    if (techStack2.value !== null) {
   //      return true 
   //    } else {
   //      return false 
   //    }
   // } else {
   //     if (techStack.value !== null) {
   //      return true 
   //    } else {
   //      return false
   //    }
   // } })

  function addProductToLeftover () {
     
     if (techStack.value.modifications.length > 0) {
        techStack2.value.quantity = techStack3.value
     } else {
        techStack.value.quantity = techStack3.value
     } 
     store.dispatch('leftovers/addProductToLeftover', techStack.value.modifications.length > 0 ? techStack2.value : techStack.value)
     showAddNew.value = !showAddNew.value;
  }

  function deleteItem (item) {
     store.commit('leftovers/deleteItemFromLeftover', item)
  }

  var showAddNew = ref(false)

  function reserOrderList () {
    if (route.params.id) store.dispatch('leftovers/fetch', route.params.id).then(

      succes => { console.log(succes) },
      error => {  
        console.log('eror') 
      }
    ) 

    if (!route.params.id) store.commit('leftovers/reset')
      
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

<style lang="scss" >
.vue-select {
  background: #F7F7F7;
  border-radius: 0.5rem;
  border: 0;
  height: 3rem;
    padding-left: 1rem;
   
    z-index: 4;
  .vue-input {
    input { 
       font-size: 1.125rem;
    font-weight: 300;
      background: #F7F7F7; }
  }
}
</style>


