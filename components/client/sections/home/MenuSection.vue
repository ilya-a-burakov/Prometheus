<template>
	<section id="main-menu" class="section">
		<ul class="cols-4 grid-1">
			<MenuBlock url="souvenirs" name="Souvenirs" description="Pins, magnets" />
			<MenuBlock url="dishes" name="Dishes" description="Plates, cups" />
			<MenuBlock url="pets" name="For Pets" description="Bowls and collars" />
			<MenuBlock @click="store.commit('toggleBackCall')" name="Book a workshop" description="For children and adults" />
		</ul>
	</section>
</template>


<script setup>
	import { ref, onMounted } from 'vue'

	import MenuBlock from '@/components/client/blocks/MenuBlock.vue'
	import { useStore } from 'vuex'
	import { useRouter } from 'vue-router'
	
	
	const store = useStore()
	const router = useRouter()
	onMounted(() => {
	})
</script>

<style lang="scss">
#main-menu{
	// background:linear-gradient(180deg, #f6eeee, transparent);
	background: white;
	.grid-1 {
		display: grid;
		grid-template-areas:
			"col1 col2 col3 col3"
			"col1 col2 col4 col4";

		li {
			display: flex;
			position: relative;
			flex-direction: column;
			justify-content: flex-end;

			overflow: hidden;
			
			min-height: 12rem;

			background-position: 100% center;
			background-size: auto 100%;
			background-repeat: no-repeat;

			border-radius: 1rem;
			border: 1px solid #F4F7FF;
			overflow: hidden;

			
			transition: all 0.33s ease;

			span { max-width: 24rem; }

			img { 
				position: absolute;
				bottom: -6rem;
				right: 1.25rem;

				transition: all 0.33s ease;
			}

			&:nth-child(1) {
				grid-area: col1;
				background-image: url("@/assets/images/menu/souvenirs.png");
				 background-size: 60%;
				 background-position: top right;

				transition: all 0.33s ease;
		
			}

			&:nth-child(2){
				grid-area: col2;
				 background-image: url("@/assets/images/menu/dishes.png");
				 background-size: 80%;
				 background-position: top right;

			}

			&:nth-child(3){
				grid-area: col3;
				background-image:url("@/assets/images/menu/pets.png");
			}

			&:nth-child(4){
				grid-area: col4;
				background: #2266FF;
				color: #F4F7FF;
				p { max-width: 50%;}
			}

			&:hover {
				cursor: pointer;
				background-repeat: no-repeat;
				// background-color: rgba(#2266FF,0.1);
				box-shadow: 0px 10px 32px rgba(#2266FF,0.1);

				span:last-of-type {text-decoration: underline;}

				img { 
					bottom: 1.25rem;
					right: 1.25rem;
				}

				&:last-of-type {
					background: white;
					color: #2266FF;
				}
			}
		}
	}
}
</style>
