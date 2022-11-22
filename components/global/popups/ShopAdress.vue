<template>
	<transition name="scale">
		<div v-if="shopadress.status"  class="popup-wrapper">
			<section class="t-center popup">
				<!-- Close Popup -->
				<button @click="store.commit('toggleShopAdress')" class="button-close-popup button"><img src="@/assets/icons/cross.svg"></button>
				<!-- Popup Header -->
				<h2 class="mn-semi">📍 Як нас знайти?</h2>
				<!-- Popup Form -->
				<div>
					<p class="mn-medium t-transp p-big">Наша майстерня знаходиться у місті Тбілісі, вулиця Мухатгверді, 19</p>
					
					<iframe class="gmap_canvas" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1207.9851740241995!2d44.75538672970814!3d41.797961353343595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40446e71f8644169%3A0x13c1eda89f4df176!2s1%20Asi%20Atasi%20Motsame%20St%2C%20T&#39;bilisi%200131%2C%20Georgia!5e0!3m2!1sen!2sth!4v1667915381789!5m2!1sen!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"  frameborder="0" scrolling="no" marginheight="0" marginwidth="0" referrerpolicy="no-referrer-when-downgrade"></iframe>

          <div class="responsive-image"><img src="@/assets/images/shop-photo.jpg"></div>
				</div>
			</section>  

			<div 
		    @click="store.commit('toggleShopAdress')" 
		    :class="{'active':shopadress.status === true}" 
		    class="color-overlay">
			</div>
		</div>
	</transition>
</template>

<script setup>
// Import libs
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
// Accessing router and store
const store = useStore()
const route = useRoute()
const router = useRouter()
// Accessing state
const shopadress = computed(() => store.state.shopadress)
</script>

<style lang="scss">
.gmap_canvas {
	height: 8rem;
	width: 100%;
}
.responsive-image {
	height: 16rem;
	overflow: hidden;
	img {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;

		object-fit: cover;
	}
}
</style>
