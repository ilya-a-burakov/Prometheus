<template>
	<div>
		<p v-if="product.images.length < 1" class="mn-big">
			У продукта еще не заданы изображения.
		</p> 

		<div v-for="(imageCategory, index) in product.images" class="mn-big">
			<div v-if="imageCategory.name !== 'Без категории'" class="mn-small flex-nojustify flex-center flex">
			  <h5 class="mn-r-thin">{{imageCategory.name}}</h5>
			  <a @click="deleteArrayObject('products', 'current.images[' + index + ']')" class="i-small pd-thin button-delete button"><img src="@/assets/icons/cross-white.svg"></a>
			</div>

			<p v-if="imageCategory.links == 0 && imageCategory.name !== 'Без категории'" class="mn-big">В категории еще не заданы изображения.</p> 
			<p v-if="imageCategory.links == 0 && imageCategory.name === 'Без категории' " class="mn-big">У продукта еще не заданы изображения.</p> 
			
			<div v-for="(image, index2) in imageCategory.links" class="flex block">
				<div class="flex-center flex-nowrap flex"> 
					<img class="mn-r-small i-medium " :src="require( `@/assets/images/products/${image}`)" />
					<p>{{image}}</p>
				</div>
				<a @click="deleteArrayObject('products', 'current.images[' + index + '].links[' + index2 + ']')" class="w-10 button">Удалить</a>
			</div>

		</div>

		<h5 class="mn-small">Загрузить изображения</h5>

		<div class="mn-big block">
			<input 
				@input="updateInputText('products', 'current.imagesCategory', $event)" 
				:value="product.filesCategory" 
				placeholder="Введите название группы изображений"
				class="mn-r-small input-text input" 
			/>
			<input 
				@input="updateInputText('products', 'current.files', $event)"
				class="pd-small input-text" 
				type="file"
				multiple
			/>
		</div>

		<ButtonSend :submit="onSubmit" :callback="afterSubmit" :validation="false" >Update images</ButtonSend>
	</div>
</template>

<script setup="props">
/////////////////////////////
// COMPONENT DEPENDENCIES
/////////////////////////////
import { defineProps, toRefs } from 'vue';
import { useStore } from 'vuex'
// Import components
import ButtonSend  from '@/components/global/elements/ButtonSend.vue'
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

// METHODS
async function onSubmit() {
	await store.dispatch('products/updateImages', props.product.id)
}

function afterSubmit() {
	location.reload();
}

/////////////////////////////
// MOUNTED
/////////////////////////////
</script>

<style lang="scss">

</style>
