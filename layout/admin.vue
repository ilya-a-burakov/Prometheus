<template>
	<transition name="moveFromTop">
		<StatusError v-if="store.state.error.show" :error="store.state.error" />
	</transition>
	
	<div class="flex-nowrap flex">
	<HeaderAdmin />
	
		<Suspense>
			<router-view  v-slot="{ Component, route }" >
									
				<transition   @before-leave="scrollTop" name="scale">
					<div v-if="search.current.length === 0"  id="page-content" class="w-100 bg-white" >
					<!-- <transition   @before-leave="scrollTop" name="scale"> -->
						<component  :is="Component"  />
					<!-- </transition> -->

					</div>		
				</transition>


			</router-view>
		</Suspense>
	</div>
</template>


<script setup>

	import StatusError from '@/components/global/elements/StatusError.vue'

	import HeaderAdmin from '@/components/partials/HeaderAdmin.vue'
	
	import Footer from '@/components/partials/Footer.vue'

	import { computed, ref, onBeforeMount } from 'vue'

	import { useStore } from 'vuex'
	// Vue extensions
	import { useRoute } from 'vue-router'
	// Module Created
	const route = useRoute()
	const store = useStore()

	onBeforeMount(() => {
		// store.commit("favorites/setFavorites");
  	});

	const search = computed(() => store.state.products.search)
	const signin = computed(() => store.state.signin)
	const user = computed(() => store.state.users.current.status.loggedIn)

	function scrollTop () {
		document.getElementById('app').scrollIntoView({behavior: 'auto', block: "start", inline: "start"});
	}
	function scrollTopSearch () {
		document.getElementById('search').scrollIntoView({behavior: 'smooth', block: "start", inline: "start"});
	}
</script>

<style lang="scss" scoped>
	@import "src/scss/home";
	@import "vue-next-select/dist/index.min.css";

#app {
	
	width: 100%;
	scroll-margin-top: -10rem;
	position: relative;
	background: white;
	z-index: 1;
}
#search {
	width: 100%;
	scroll-margin-top: 4rem;
}

#page-content2 {
	position: relative;
	min-height: 100vh;
	width: 100%;
	background: white;	
}
#page-content {
	min-height: 100vh;
	width: 100%;
	scroll-margin-top: 4rem;
	// background: #F7F7F7;
	position: relative;
	z-index: 1;
	box-shadow: 0 4px 32px -8px rgb(36 36 36 / 10%);
}

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
