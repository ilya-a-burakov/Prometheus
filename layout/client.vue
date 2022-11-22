<template>
	<transition name="moveFromTop">
		<StatusError v-if="store.state.error.show" :error="store.state.error" />
	</transition>

	<HeaderCenter id="header" />
	<Suspense>
		<HeaderBottom />
	</Suspense>
  	<Suspense>
		<Favorites />
	</Suspense>	
	
	<ShopCart />

	<Auth  />	
	<BackCall  />	
	<ShopAdress  />	

	<router-view v-slot="{ Component, route }" class="w-100">
		
		
			<div id="page-content" >
				<transition  @before-leave="scrollTop" name="scale2">
					<component  :is="Component" :key="route.path"  />

				</transition>

			</div>
	

	</router-view>
	<Footer/>
</template>


<script setup>

	import StatusError from '@/components/global/elements/StatusError.vue'

	import HeaderCenter from '@/components/partials/header/HeaderCenter.vue'
	import HeaderBottom from '@/components/partials/header/HeaderBottom.vue'

	import Auth from '@/components/global/popups/auth/Auth.vue'
	import BackCall from '@/components/global/popups/BackCall.vue'
	import ShopAdress from '@/components/global/popups/ShopAdress.vue'
	import ShopCart from '@/components/client/blocks/ShopCart.vue'
	import Favorites from '@/components/client/blocks/Favorites.vue'

	import Footer from '@/components/partials/Footer.vue'

	import { computed, ref, onBeforeMount } from 'vue'

	import { useStore } from 'vuex'
	// Vue extensions
	import { useRoute, useRouter } from 'vue-router'
	// Module Created
	const route = useRoute()
	const router = useRouter()
	const store = useStore()

	// const search = computed(() => store.state.products.search)
	const signin = computed(() => store.state.signin)
	const user = computed(() => store.state.users.current.status.loggedIn)

	

	function scrollTop () {
		document.getElementById('header').scrollIntoView({behavior: 'smooth', block: "center", inline: "start"});
	}
</script>

<style lang="scss">
@import "src/scss/home";
@import "vue-next-select/dist/index.min.css";

.scale-enter-active,
.scale-leave-active {
		// position: absolute !important; 
	opacity: 1;
	transform: scale(1);
  transition: all 0.5s ease;
}
.scale-enter-from,
.scale-leave-to {
	position: absolute;

	// width: 100%;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.5s ease; 
}


.scale2-enter-active,
.scale2-leave-active {
	opacity: 1;
	transform: translateZ(0);
  	transition: all 0.5s ease;
}
.scale2-enter-from,
.scale2-leave-to {
	position: absolute;
	opacity: 0;
	// transform: scale(1.1);
	transform: translateZ(40px);
	transition: all 0.5s ease; 

	> * { position: absolute;}
}


.moveFromTop-enter-active,
.moveFromTop-leave-active {
	transform: translateY(-12rem);
  transition: all 0.5s ease;
}
.moveFromTop-enter-from,
.moveFromTop-leave-to {
      transform: translateY(0);
  transition: all 0.5s ease; 
}
</style>
<!-- 
 	> * {  
 		transform-origin: center 0;
  	opacity: 0; 
 		transform: scale(0.9);  
 		transition: all 0.5s ease; 
 	} -->
