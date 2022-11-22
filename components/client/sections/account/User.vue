<template>
	<div class="">
		<p class="mn-small t-semi p-big">My data</p>
		<hr class="mn-semi">

		<div class="w-100 mn-r-small mn-small">
			<p class="mn-small w-100">
				Client's number:
			</p>
			<div class="w-100 flex-center flex-nowrap flex">
				<input
				@input="updateInputText('users', 'current.phone', $event)"
				:value="user.phone"
				placeholder="Enter price"
				class="w-33 mn-r-small input-text input"
				type="number"
				disabled="true"
				>
				<p class="w-100 p-medium">*Contact support to change</p>
			</div>
		</div>

		<div class="flex-nowrap flex">
			<label class="w-50 mn-r-small mn-small">
				<p class="mn-small w-100">
					Your name
				</p>
				<input
				@input="updateInputText('users', 'current.name', $event)"
				:value="user.name"
				placeholder="Enter a name"
				class="w-100 input-text input"
				type="text"
				>

			</label>

			<label class="w-50 mn-small">
				<p class="mn-small w-100">
					Surname
				</p>
				
				<input
				@input="updateInputText('users', 'current.surname', $event)"
				:value="user.surname"
				placeholder="Enter last name"
				class="w-100 input-text input"
				type="text"
				>

			</label>

		</div>

		<div class="w-100 mn-r-small mn-big">
			<p class="mn-small w-100">
				Date of Birth
			</p>
			<input
			@input="updateInputText('users', 'current.birthday', $event)"
			:value="user.birthday"
			placeholder="your date of birth"
			class="w-33 mn-r-small input-text input"
			type="date"
			>
		</div>

		<p class="mn-semi t-semi p-big">Address</p>
		<div class="mn-big flex-nowrap flex">
			<label class="w-33 mn-r-small mn-small">
				<p class="mn-small w-100">
					City
				</p>
				<input
				@input="updateInputText('users', 'current.city', $event)"
				:value="user.city"
				placeholder="Enter city"
				class="w-100 input-text input"
				type="text"
				>

			</label>

			<label class="w-100 mn-small">
				<p class="mn-small w-100">
					Street, house, flat
				</p>
				
				<input
				@input="updateInputText('users', 'current.adress', $event)"
				:value="user.adress"
				placeholder="Enter address"
				class="w-100 input-text input"
				type="text"
				>

			</label>

		</div>

		<p class="mn-small">Click save to save your changes.</p>
		<a @click="updateUser(user)" class="w-33 button">Save</a>
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
