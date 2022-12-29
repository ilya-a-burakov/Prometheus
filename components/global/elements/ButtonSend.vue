<template>
	<button @click="Submit" :disabled="validation" ref="button" class="w-100 button">

		<transition mode="out-in" name="scale">
			<div v-if="loading && !error" class="loading">
				<svg class="i-default" width="135" height="140" viewBox="0 0 135 140" xmlns="http://www.w3.org/2000/svg" fill="#fff">
					<rect y="10" width="15" height="120" rx="6">
						<animate attributeName="height"
						begin="0.5s" dur="1s"
						values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
						repeatCount="indefinite" />
						<animate attributeName="y"
						begin="0.5s" dur="1s"
						values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
						repeatCount="indefinite" />
					</rect>
					<rect x="30" y="10" width="15" height="120" rx="6">
						<animate attributeName="height"
						begin="0.25s" dur="1s"
						values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
						repeatCount="indefinite" />
						<animate attributeName="y"
						begin="0.25s" dur="1s"
						values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
						repeatCount="indefinite" />
					</rect>
					<rect x="60" width="15" height="140" rx="6">
						<animate attributeName="height"
						begin="0s" dur="1s"
						values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
						repeatCount="indefinite" />
						<animate attributeName="y"
						begin="0s" dur="1s"
						values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
						repeatCount="indefinite" />
					</rect>
					<rect x="90" y="10" width="15" height="120" rx="6">
						<animate attributeName="height"
						begin="0.25s" dur="1s"
						values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
						repeatCount="indefinite" />
						<animate attributeName="y"
						begin="0.25s" dur="1s"
						values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
						repeatCount="indefinite" />
					</rect>
					<rect x="120" y="10" width="15" height="120" rx="6">
						<animate attributeName="height"
						begin="0.5s" dur="1s"
						values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
						repeatCount="indefinite" />
						<animate attributeName="y"
						begin="0.5s" dur="1s"
						values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
						repeatCount="indefinite" />
					</rect>
				</svg>
			</div>
		</transition>
		<div v-if="error" class="error">
			{{ error }}
		</div>

		<transition mode="out-in" name="scale">
			<div v-if="finished" class="h4 loading">
				<span class="t-white">✔</span>
			</div>
		</transition>

		<transition mode="out-in" name="scale">
			<slot v-if="!loading && !error && !finished"></slot>
		</transition>
	</button> 
</template>


<script setup="props">
	import { defineProps,ref } from 'vue'

	const props = defineProps({
		submit: Function,
		callback: Function,
		validation: Boolean,
	})

	var button = ref(null)

	var error =   ref(null)
	var loading = ref(null)
	var finished = ref(null)


	function Submit() {
		button.value.style['pointer-events'] = 'none';
		error.value = null
		loading.value = true
	  // button.value.style['background-color'] = '#223399';

		props.submit().then(
			finish => {
				button.value.style['background-color'] = '#0088ff';
				loading.value = false
				finished.value = true
				setTimeout(() =>  props.callback(), 750);

			},
			err => {
				error.value = err.toString()
			}
			);
	}
</script>

<style lang="scss">
</style>


