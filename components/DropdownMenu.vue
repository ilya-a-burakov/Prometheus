<template>
	<div :class="{ active: showModal }" id="toggle-menu" class="t-center transition-cubic">
		
		<!-- Left col -->
		<div class="left-col">
			<ul  class="lh-bold">
				<li v-for="(category,index) in categories">

	        <router-link 
	        :to="{ name: 'CatalogCategory', params: { url: category.url }}"
	        class="h4">
	         {{t('categories[' + index + ']')}}
	        </router-link>

				</li>
			</ul>
		</div>


		<!-- Right col -->
		<div class="right-col">
			<ul class="lh-bold">
				<li v-for="(page,index) in pages">

	        <router-link 
	        :to="{ name: 'Page', params: { url: page.url}}"
	        class="h4">
	         {{t('pages[' + index + ']')}}
	        </router-link>

				</li>
			</ul>
		</div>
	</div>
</template>

<script setup="props">
/////////////////////////////
// COMPONENT DEPENDENCIES
/////////////////////////////
import { toRefs } from 'vue';
import { useRouter } from 'vue-router'
import { useI18n }    from 'vue-i18n'

/////////////////////////////
// INIT
/////////////////////////////
const props = defineProps({
  showModal: Boolean,
  categories: Array,
  pages: Array,

});

/////////////////////////////
// LOCALIZATION
/////////////////////////////
const text = {
  messages: {
    en: {
      pages: [],
      categories: []
    },
    ru: {
      pages: [],
      categories: []
    }
  }
}

props.categories.forEach( category => {
  category.localization.forEach( localization => {
    text.messages[localization.locale].categories.push(localization.text)
  })
})

props.pages.forEach( page => {
  page.localization.forEach( localization => {
    text.messages[localization.locale].pages.push(localization.text)
  })
})

const { t } = useI18n(text)
/////////////////////////////
// CREATED
/////////////////////////////
const router = useRouter()

router.beforeEach((to, from, next) => {
  props.showModal = false
	next()
})

/////////////////////////////
// MOUNTED
/////////////////////////////
</script>

<style lang="scss">

	#toggle-menu {
		display: flex;
		top: 100%;
		background: white;

		position: absolute;
		flex-wrap: nowrap;

		width: 100%;

		height: 0;
		opacity: 0;
		padding: 0rem 2rem; 

		overflow: hidden;

		box-shadow: 0px 10px 17px rgba(0, 0, 0, 0.05);
		border-top: 1px solid rgba(0,0,0,0.1);

		.left-col {
			width: 50%;
		} 

		.right-col {
			width: 50%;
		  margin-bottom: -1rem;
		} 
	}

#toggle-menu.active {
	height: auto !important;
	padding: 2rem 2rem !important; 
	opacity: 1;

}
</style>
