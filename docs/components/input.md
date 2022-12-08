# Input
[[toc]]

## Input Text
<script setup>
	import InputText from '/components/global/elements/InputText.vue'

	let example = {
		name: 'Example'
	}
</script>
<InputText :obj="'example'" :prop="'name'"    :value="example.name"   label="Name"    placeholder="Example"/>

### Data
::: info Store
{{ example }}
:::

### Code 
```html
<InputText 
	:obj="'example'" 
	:prop="'name'"    
	:value="example.name"   
	label="Name"    
	placeholder="Example"
/>
```

## Input Select