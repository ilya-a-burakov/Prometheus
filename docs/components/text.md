# Text

<script setup>
	import InputText from '/components/global/elements/InputText.vue'

	let example = {
		name: 'Example'
	}
</script>


<b>{{ example }}</b>

<InputText :obj="'example'" :prop="'name'"    :value="example.name"   label="Name"    placeholder="Example"   class="mn-r-semi"/>
