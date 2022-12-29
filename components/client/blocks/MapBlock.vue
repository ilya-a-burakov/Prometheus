<template>
	<div :class="{'cols-2-2_1': map }" class="o-hidden radius-medium bg-grey flex-nowrap flex">
      <!-- Left col -->
      <div class="pd-medium col">
        <h3 class="mn-small">{{name}}</h3>
        <a :href="link" v-if="link" target="_blank" class="t-semi mn-medium t-main">Open Google Maps</a>
        <p>{{text}}</p>
      </div>
      <!-- Right col -->
      <div v-if="map" class="google-map col">
        <iframe id="gmap_canvas" :src="map"></iframe>
      </div>
    </div>
</template>


<script setup>
	import { useRouter } from 'vue-router'
	
	const router = useRouter()

	const props = defineProps([
		'name',
		'adress',
		'url',
		'map',
		'link',
		'text'
	])


</script>

<style lang="scss">
</style>


