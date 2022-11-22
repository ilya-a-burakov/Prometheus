<template>
	<div class="mn-big">
		<div class="mn-small flex-nojustify flex-center flex">
		  <h5 class="mn-r-thin">Дополнительные данные</h5>
		  <a @click="addArrayObject('products', 'current.infromation')" class="i-small pd-thin button-delete button"><img src="@/assets/icons/plus-white.svg"></a>
		</div>

		

		<div   class="flex-column flex block">
			<p v-if="product.infromation == 0" class="w-100 mn-small">У продукта еще не заданы дополнительные данные.</p>  
			<a v-if="product.infromation == 0" @click="addArrayObject('products', 'current.infromation')" class="button">Добавить данные</a>
			<div class="mn-medium w-100 flex-nowrap flex " v-for="(info, index) in product.infromation"> 
				<input
					@input="updateInputText('products', 'current.infromation[' + index + '].name', $event)" 
					:value="info.name"	
					:placeholder="'Название параметра'"
					class="input-text input"
				>		
				<input
					@input="updateInputText('products', 'current.infromation[' + index + '].value', $event)" 
					:value="info.value"	
					:placeholder="'Значение параметра'"
					class="mn-l-small input-text input"
				>			
				<a @click="deleteArrayObject('products', 'current.infromation[' + index + ']')" class="mn-l-small button">Удалить</a>
			</div>
		</div>
	</div>
</template>

<script setup="props">
/////////////////////////////
// COMPONENT DEPENDENCIES
/////////////////////////////
import { defineProps, toRefs } from 'vue';

/////////////////////////////
// HELPERS
/////////////////////////////

/////////////////////////////
// CREATED
/////////////////////////////
const props = defineProps({
  product: Object,
});

const { product } = toRefs(props);

/////////////////////////////
// MOUNTED
/////////////////////////////
</script>

<style lang="scss">

</style>
