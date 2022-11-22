<template>
	<div class="">
		<p class="mn-small t-semi p-big">Мои данные</p>
		<hr class="mn-semi">

			<div class="w-100  mn-r-small mn-small">
				<p class="mn-small w-100">
          Номер клиента:
        </p>
        	<div class="w-100 flex-center flex-nowrap flex"> 
				<input 
					@input="updateInputText('users', 'current.phone', $event)" 
					:value="user.phone" 
					placeholder="Введите цену" 
					class="w-33 mn-r-small  input-text input"
					type="number"
					disabled="true" 
				>
					<p class="w-100 p-medium">*Для изменения обратитесь в поддержку</p>
				</div>
			</div>

			<div class="flex-nowrap flex">
				<label class="w-50  mn-r-small mn-small">
				<p class="mn-small w-100">
          Ваше имя
        </p>
				<input 
					@input="updateInputText('users', 'current.name', $event)" 
					:value="user.name" 
					placeholder="Введите имя" 
					class="w-100  input-text input"
					type="text"
				>
					
			</label>

			<label class="w-50   mn-small">
				<p class="mn-small w-100">
          Фамилия
        </p>
        	
				<input 
					@input="updateInputText('users', 'current.surname', $event)" 
					:value="user.surname" 
					placeholder="Введите фамилию" 
					class="w-100 input-text input"
					type="text"
				>
					
			</label>

			</div>

			<div class="w-100  mn-r-small mn-big">
				<p class="mn-small w-100">
          Дата рождения
        </p>
				<input 
					@input="updateInputText('users', 'current.birthday', $event)" 
					:value="user.birthday" 
					placeholder="Вашу дату рождения" 
					class="w-33 mn-r-small  input-text input"
					type="date"
				>
			</div>

		<p class="mn-semi t-semi p-big">Адрес</p>
		<div class="mn-big flex-nowrap flex">
				<label class="w-33  mn-r-small mn-small">
				<p class="mn-small w-100">
          Город
        </p>
				<input 
					@input="updateInputText('users', 'current.city', $event)" 
					:value="user.city" 
					placeholder="Введите город" 
					class="w-100  input-text input"
					type="text"
				>
					
			</label>

			<label class="w-100   mn-small">
				<p class="mn-small w-100">
          Улица, дом, квартира
        </p>
        	
				<input 
					@input="updateInputText('users', 'current.adress', $event)" 
					:value="user.adress" 
					placeholder="Введите адрес" 
					class="w-100 input-text input"
					type="text"
				>
					
			</label>

			</div>

			<p class="mn-small">Для сохранения изменений нажмите кнпоку сохранить.</p>
			<a @click="updateUser(user)" class="w-33 button">Сохранить</a>
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
  user: Object,
});

const { user } = toRefs(props);

/////////////////////////////
// METHODS
/////////////////////////////
function updateUser(user) {
	console.log(user)
  store.dispatch("users/updateUser", user)
}

/////////////////////////////
// MOUNTED
/////////////////////////////
</script>

<style lang="scss">

</style>
