<template>
	<div>
		<p v-if="product.modifications == 0" class="mn-small w-100">У продукта еще не заданы модификации.</p> 
		
		<!-- Modification Info -->
		<div class="mn-small flex-column flex-wrap block" v-for="(modification, index) in product.modifications"> 
			<div class="w-100 flex-nowrap flex"> 
				<input 
					:value="modification.quantity"	
					:disabled="true" 
					:placeholder="'Количество'"
					class="mn-medium input-text input"
					type="number"
				>
				<input
					@input="updateInputText('products', 'current.modifications[' + index + '].name', $event)" 
					:value="modification.name"	
					:placeholder="'Новая модификация'"
					class="mn-medium input-text input"
				>
				<a @click="deleteArrayObject('products', 'current.modifications[' + index + ']')" class="mn-l-small i-normal pd-regular button-delete button"><img src="@/assets/icons/cross-white.svg"></a>
			</div>	
			<hr  class="mn-medium">
			<!-- Modification Characteristic -->
			<div class="mn-medium w-100 flex-nowrap flex variants-wrapper" v-for="(characteristic, index2) in modification.characteristics"> 
				<input
					@input="updateInputText('products', 'current.modifications[' + index + '].characteristics['+ index2 + '].name', $event)" 
					:value="characteristic.name"	
					:placeholder="'Название параметра'"
					class="input-text input"
				>
				<input
					@input="updateInputText('products', 'current.modifications[' + index + '].characteristics['+ index2 + '].value', $event)" 
					:value="characteristic.value"	
					:placeholder="'Значение параметра'"
					class="mn-l-small input-text input"
				/>
				<a @click="deleteArrayObject('products', 'current.modifications[' + index + '].characteristics['+ index2 + ']')"  class="mn-l-small i-normal pd-regular button-delete button"><img src="@/assets/icons/cross-white.svg"></a>
			</div>
			<hr  class="mn-medium">
			<a @click="addArrayObject('products', 'current.modifications[' + index + '].characteristics')" class="button">Добавить характеристику</a>
		</div>
		
		<div class="mn-big t-center flex-center flex block">
			<a @click="addArrayObject('products', 'current.modifications')" class="w-100">Добавить модификацю</a>
		</div>
		<a @click="onSubmit()" class="button">Сохранить модификации</a>
		
	</div>	
</template>

<script setup="props">
/////////////////////////////
// COMPONENT DEPENDENCIES
/////////////////////////////
import { defineProps, toRefs } from 'vue';
import { useStore } from 'vuex'

/////////////////////////////
// HELPERS
/////////////////////////////

/////////////////////////////
// CREATED
/////////////////////////////
const store = useStore()

const props = defineProps({
  product: Object,
});

const { product } = toRefs(props);

function onSubmit() {
	store.dispatch('products/updateModifications', props.product.id)
}

/////////////////

/////////////////////////////
// MOUNTED
/////////////////////////////
</script>

<style lang="scss" scoped>
.variants-wrapper {
	// a 
}
</style>
