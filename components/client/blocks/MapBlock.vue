<template>
	<div class="mapblock flex-nowrap flex">
      <!-- Left col -->
      <div class="w-66 pd-medium col">
        <h3 class="">{{name}} 📍</h3>
        <a class="t-semi mn-medium t-main">Open Google Maps</a>
        <p>When you are on Sukhumvit Road, turn left on to Sukhumvit Soi 65. Go down the soi for approximately 500 meters... <a class="mn-medium t-main">Show Details</a></p>
      </div>
      <!-- Right col -->
      <div class="w-33 google-map col">
        <iframe id="gmap_canvas" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1207.9851740241995!2d44.75538672970814!3d41.797961353343595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40446e71f8644169%3A0x13c1eda89f4df176!2s1%20Asi%20Atasi%20Motsame%20St%2C%20T&#39;bilisi%200131%2C%20Georgia!5e0!3m2!1sen!2sth!4v1667915381789!5m2!1sen!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"  frameborder="0" scrolling="no" marginheight="0" marginwidth="0" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
</template>


<script setup>
	import { useRouter } from 'vue-router'
	
	
	const router = useRouter()

	const props = defineProps({
		name: String,
		adress: String,
		url: String
	})


</script>

<style lang="scss">
	.mapblock {
		background-color: #f7f7f7;
	}
</style>


