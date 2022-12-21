<template>
	<div class="flex-center flex-nowrap flex section">

		<!-- Adress -->
		<div  @click="store.commit('toggleShopAdress')" class="adress contact col mn-r-small" >
			<span class="mn-extra-thin title">Studio in <a href="#" class="">Tbilisi</a></span>
			<span class="t-transp">Daily: 10:00 to 21:00</span>
		</div>

		<!-- Logo -->
		<div @click="router.push({ name: 'Home' }	)" class="logo-link col">
			<img class="desktop-only" src="@/assets/logotype.svg">
			<img class="mobile-only" src="@/assets/logo.svg">
		</div>

		<!--Number -->
		<div @click="store.commit('toggleBackCall')" class="contact col">
			<span class="mn-extra-thin title">+995 585 888 660</span>
			<span><a href="#" class="">Book a workshop</a></span>
		</div>

	</div>
</template>

<script setup>
	import { computed, defineProps,onMounted } from 'vue'
	import { useStore } from 'vuex'
	import { useRouter } from 'vue-router'
	
	
	const store = useStore()
	const router = useRouter()

</script>

<style lang="scss">

#header {
		padding-top: 1rem;
		padding-bottom: 1rem;

		background: white;

		.contact {
			width: 50%;

			.title { 
				display: block; 
				font-weight: 700;
			}

			a { color: #00ff88; }

			&:last-of-type {
				text-align: right;
			}

			&:hover {
				cursor: pointer;

				a { text-decoration: underline; }
			} 
		}
		
		.logo-link { 
			height: 3.5rem; 
			text-align: center;
			
			img { height: 100%;  position: relative; }
			
			&:hover {
				cursor: pointer;
			} 
		}

	} 
</style>