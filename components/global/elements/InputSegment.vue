<template>
	<div class="element-intro filters">
			<a 
			v-for="(tab,index) in tabs" :tab="tab" 
			@click="changeTab(tab)"
			:class="{'filter-active':currentTab === tab}"  
			class="cursor-hover h5">
				{{tab}}
			</a>
	</div>
</template>


<script setup="props">
	import { computed, ref} from 'vue'

	const props = defineProps(['tabs'])
	const emit = defineEmits(['changeTab'])

	let currentTab = ref(props.tabs[0])

	function changeTab (tab) {
		currentTab.value = tab; 
		emit('changeTab', tab)
	} 



</script>

<style lang="scss">
	.filters {
		display: flex;
		width: max-content;
		background: rgba(25,25,25,.025);
		border-radius: 1rem;
		overflow: hidden;

		a {
			display: block;
			padding: 1rem;
			opacity: 0.5;

			&:hover {
				opacity: 1;
			}
		}

		.filter-active  {
			background: #00ff88;
			opacity: 1;
		}

		@media (max-width: 640px) {
			flex-wrap: wrap;
			width: 100%;

			a { width: 50%; text-align: center; }
		}
	}
</style>


