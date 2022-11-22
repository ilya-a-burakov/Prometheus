<template>
	<div class="mn-big">
		<div class="mn-small flex-nojustify flex-center flex">
			  <h5 class="mn-r-thin">Категории</h5>
			  <a @click="addArrayObject('products', 'current.category')" class="i-small pd-thin button-delete button"><img src="@/assets/icons/plus-white.svg"></a>
			</div>
		<p v-if="product.category.length == 0" class="mn-big">У продукта еще не заданы категории.</p> 
		<!-- Categories	 -->
		<div v-if="product.category.length != 0" class="flex-wrap flex-column flex block">
			<div class="mn-small w-100 flex-nowrap flex" v-for="(category, index) in product.category">
				<input 
					@input="updateInputText('products', 'current.category[' + index + ']', $event)" 
					:value="Object.keys(category).length === 0 ? '' : category" 
					placeholder="Введите название категории" 
					class="input-text input" 
				/>
				<!-- <vue-select :options="categories"  :label-by="'name'" searchable clear-on-close :close-on-select="true"> </vue-select> -->
				<a @click="deleteArrayObject('products', 'current.category[' + index + ']')" class="mn-l-small button">Удалить</a>
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
  categories: Array
});

const { product } = toRefs(props);
const { categories } = toRefs(props);

/////////////////////////////
// MOUNTED
/////////////////////////////
</script>

<style lang="scss">

</style>
