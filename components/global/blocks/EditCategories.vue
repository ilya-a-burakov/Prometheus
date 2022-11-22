<template>
	<div class="mn-big">
		<div class="mn-small flex-nojustify flex-center flex">
			  <h5 class="mn-r-thin">Подкатегории</h5>
			  <a @click="addArrayObject('categories', 'current.subcategories')" class="i-small pd-thin button-delete button"><img src="@/assets/icons/plus-white.svg"></a>
			</div>
		<p v-if="category.subcategories.length == 0" class="mn-big">У продукта еще не заданы категории.</p> 
		<!-- Categories	 -->
		<div v-if="category.subcategories.length != 0" class="flex-wrap flex-column flex block">
			<div class="mn-small w-100 flex-nowrap flex" v-for="(subcategory, index) in category.subcategories">
				<input 
					@input="updateInputText('categories', 'current.subcategories[' + index + '].name', $event)" 
					:value="Object.keys(subcategory).length === 0 ? '' : subcategory.name" 
					placeholder="Введите название подкатегории" 
					class="input-text input" 
				/>
				<input 
					@input="updateInputText('categories', 'current.subcategories[' + index + '].url', $event)" 
					:value="Object.keys(subcategory).length === 0 ? '' : subcategory.url" 
					placeholder="Введите url подкатегории" 
					class="input-text input" 
				/>
				<!-- <vue-select :options="categories"  :label-by="'name'" searchable clear-on-close :close-on-select="true"> </vue-select> -->
				<a @click="deleteArrayObject('categories', 'current.subcategories[' + index + ']')" class="mn-l-small button">Удалить</a>
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
  category: Object
});

const { category } = toRefs(props);

/////////////////////////////
// MOUNTED
/////////////////////////////
</script>

<style lang="scss">

</style>
