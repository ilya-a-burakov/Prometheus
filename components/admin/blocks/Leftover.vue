<template>
  <div class="flex-column flex-wrap block">
    <div class="w-100 mn-thin flex">
      <div>
        <p class="p-big">
          <span  v-if="leftover.type === 'loss'">Списание</span>
          <span  v-if="leftover.type === 'inventory'">Инвентаризация</span> 
          #{{leftover._id}}
        </p> 
        <p class="t-transp"> {{DateToFormattedString(leftover.createdAt)}}</p>
      </div>
      <div>
        <router-link :to="{ name: 'LeftoverEdit', params: { id: leftover._id }}" class="i-small">
          <svg width="24" height="24" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#2266FF" d="M6.41357 11.979C9.6831 11.979 12.3901 9.26611 12.3901 6.00244C12.3901 2.73291 9.67724 0.0258789 6.40771 0.0258789C3.14404 0.0258789 0.437008 2.73291 0.437008 6.00244C0.437008 9.26611 3.1499 11.979 6.41357 11.979ZM6.41357 10.9829C3.64795 10.9829 1.43896 8.76807 1.43896 6.00244C1.43896 3.23682 3.64209 1.02197 6.40771 1.02197C9.17334 1.02197 11.3882 3.23682 11.394 6.00244C11.3999 8.76807 9.1792 10.9829 6.41357 10.9829ZM8.72802 4.36182L9.1499 3.93408C9.3374 3.74072 9.35498 3.52979 9.1792 3.34814L9.04443 3.21924C8.86865 3.0376 8.65185 3.06104 8.46435 3.24854L8.03662 3.67041L8.72802 4.36182ZM4.53271 8.53955L8.37646 4.71338L7.68505 4.02197L3.84716 7.84814L3.51318 8.62158C3.45459 8.76807 3.59521 8.89697 3.72412 8.8501L4.53271 8.53955Z"/>
          </svg>

        </router-link>
       </div>
      <hr class="mn-t-small mn-thin">
    </div>

    <div class="w-100 spoiler">
      <div @click="spoiler = !spoiler"  class="mn-small flex">
        <span>Всего товаров {{leftover.positions.length}}</span>
        <img :class="{ 'spoiler-active': spoiler }" class="button-icon" src="@/assets/icons/arrow-down-spoiler.svg">
      </div>
      <transition name="fade">
        <div v-if="spoiler">
          <div  v-for="position in leftover.positions" class="w-100 mn-thin flex"> 
            <div class=" w-50 flex">
              <span>
                <!-- <span class="t-transp">Название:</span>  -->
                {{position.name}}
              </span>
            </div>
            
            <div class="t-right w-50 flex">
              <span class="w-100">
                
                {{position.quantity}}
                <span class="t-transp">{{declOfNum(position.quantity, ['единица', ' единицы', ' единиц'])}}</span> 
              </span>
            </div>
          </div> 
        </div>
      </transition>
    </div>
    
  </div>
</template>


<script setup="props">
	import { defineProps,ref } from 'vue'
	import { useStore } from 'vuex'
	import { useRouter } from 'vue-router'

	const store = useStore()
	const router = useRouter()

	const props = defineProps({
	  leftover: Object,
	});


	const spoiler = ref(false)

  function declOfNum(number, words) {  
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
  }
	
</script>

<style lang="scss" scoped>
.shop-cart-item {
	&:first-of-type { padding-top: 0;}
}

</style>


