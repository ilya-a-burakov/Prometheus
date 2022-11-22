<template>
	<div class="mn-big">
		<div class="mn-small flex-nojustify flex-center flex">
			  <h5 class="mn-r-thin">Фильтры для категории</h5>
			  <a @click="addArrayObject('categories', 'current.filters')" class="i-small pd-thin button-delete button"><img src="@/assets/icons/plus-white.svg"></a>
			</div>
		<p v-if="category.filters.length == 0" class="mn-big">У продукта еще не заданы фильтры.</p> 
		<!-- Categories	 -->
		<div v-if="category.filters.length != 0" class="flex-wrap flex-column flex block">
			<div class="mn-small w-100 flex-nowrap flex" v-for="(filter, index) in category.filters">
				<input 
					@input="updateInputText('categories', 'current.filters[' + index + '].name', $event)" 
					:value="Object.keys(filter).length === 0 ? '' : filter.name" 
					placeholder="Введите название фильтра" 
					class="input-text input" 
				/>
				<input 
					@input="updateInputText('categories', 'current.filters[' + index + '].options', $event)" 
					:value="Object.keys(filter).length === 0 ? '' : filter.options" 
					placeholder="Введите параметры фильтра через запятую" 
					class="input-text input" 
				/>
				<!-- <vue-select :options="categories"  :label-by="'name'" searchable clear-on-close :close-on-select="true"> </vue-select> -->
				<a @click="deleteArrayObject('categories', 'current.filters[' + index + ']')" class="mn-l-small button">Удалить</a>
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
