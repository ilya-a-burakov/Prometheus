<template>
	<div class="mn-big flex-column flex block">
		<div class="w-100 flex-nowrap flex">
			<select 
				@input="updateInputText('products', 'current.status', $event)" 
				:value="product.status" 
				placeholder="Статус публикации"
				class="w-33 mn-r-small input-text input" 
			>
				<option value="unpublished" :selected="product.status === 'unpublished'">Неопубликован</option>
				<option value="published" :selected="product.status === 'published'">Опубликован</option>
				<option value="archivied" :selected="product.status === 'archivied'">Скрыть</option>
				
			</select>

			<input 
				@input="updateInputText('products', 'current.name', $event)" 
				:value="product.name" 
				placeholder="Введите название"
				class="w-100 mn-r-small input-text input" 
			/>
			<!-- Price -->
			<label class="w-33  mn-r-small mn-small input-price">
				<div class="input-label">₽</div>
				<input 
					@input="updateInputText('products', 'current.price', $event)" 
					:value="product.price" 
					placeholder="Введите цену" 
					class="input-text input"
					type="number"
				>
			</label>
			<input 
				@input="updateInputText('products', 'current.quantity', $event)" 
				:value="product.quantity" 
				placeholder="Количество товара"
				class="w-33 input-text input"
				disabled 
			/>
			
			
		</div>
		<!-- Description -->
		<textarea
			@input="updateInputText('products', 'current.description', $event)" 
			:value="product.description" 
			placeholder="Введите описание" 
			class="mn-small input-description input-text input"
			></textarea> 
		<!-- Sale -->
		<InputText :obj="'products'" :prop="'current.sale'" :value="product.sale" label="Скидка в %"/>
		
	</div>
</template>

<script setup="props">
import InputText  from '@/components/global/elements/InputText.vue'
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
