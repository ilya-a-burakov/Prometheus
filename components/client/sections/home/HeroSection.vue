<template>
	<div id="hero" class="cols-2 flex-center flex section">
		<div class="col">
			<h1 class="mn-small" v-html="slide.title"></h1>
			<p class="mn-big t-transp p-big">
				{{slide.description}}
			</p>
			<span class="t-white">
				<router-link  v-if="slide.link === 'inner'" :to="slide.url" id="myButton" class="mn-big button">{{slide.button}}</router-link>
				<a 						v-if="slide.link === 'external'" :href="slide.url" id="myButton" class="mn-big button">{{slide.button}}</a>
			</span>
		</div>
		<div class="col">
			<img :src="require( `@/assets/images/backgrounds/${slide.image}`)">
		</div>
	</div>
</template>


<script setup>
	const slide = {
		title: '<span class="cursive">May the Ceramic Force</span> <br>be with you 🌚',
		description: "Our students create real works of art that will decorate the interior of any home. You can buy goods made by the studio in our online marketplace.",
		url: '/catalog',
		link: 'inner',
		button: 'Open Marketplace →',
		image: 'hero-content.png'
	}
</script>

<style lang="scss">
	#hero {
		padding-bottom: 0;
		padding-top: 0;
		background-image: url(@/assets/images/backgrounds/hero-bg.jpg);
		background-size: cover;
		background-position: center;
		img { width: 100%; }
	}
</style>


