<template>
	<div>
	<div class="breadcrumbs section">
		<router-link to="/">
			<svg class="home" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill="black" d="M0.494141 4.26391C0.494141 4.48862 0.659906 4.66912 0.928813 4.66912C1.05037 4.66912 1.16825 4.6065 1.27139 4.52177L1.64344 4.20866V7.56448C1.64344 8.13545 1.98971 8.47803 2.5791 8.47803H7.56678C8.15616 8.47803 8.50243 8.13545 8.50243 7.56448V4.19392L8.8929 4.52177C8.99604 4.6065 9.11392 4.66912 9.23916 4.66912C9.48597 4.66912 9.67015 4.5144 9.67015 4.27128C9.67015 4.1313 9.61121 4.01343 9.5007 3.92133L8.50243 3.08146V1.47538C8.50243 1.30961 8.3956 1.1991 8.22984 1.1991H7.63308C7.46732 1.1991 7.35313 1.30961 7.35313 1.47538V2.11634L5.66969 0.70181C5.31606 0.403433 4.85928 0.403433 4.50197 0.70181L0.663589 3.92133C0.553079 4.01711 0.494141 4.14235 0.494141 4.26391ZM6.13752 5.26219C6.13752 5.08906 6.02701 4.97855 5.85387 4.97855H4.31779C4.14097 4.97855 4.02678 5.08906 4.02678 5.26219V7.63447H2.83327C2.60856 7.63447 2.48332 7.50922 2.48332 7.28084V3.5014L4.90349 1.47538C5.01768 1.37592 5.15029 1.37592 5.26817 1.47538L7.66255 3.48298V7.28084C7.66255 7.50922 7.53731 7.63447 7.3126 7.63447H6.13752V5.26219Z"/>
			</svg>
				<span>Home</span>
		</router-link>
	 	
	 	<svg class="chevron" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4 3.99992C4 3.83673 3.94307 3.70391 3.81025 3.57867L0.899431 0.732369C0.800759 0.629902 0.679317 0.580566 0.531309 0.580566C0.239089 0.580566 0 0.815861 0 1.10808C0 1.25229 0.0607211 1.38512 0.166983 1.49138L2.74763 3.99613L0.166983 6.50846C0.0607211 6.61093 0 6.74375 0 6.89176C0 7.18398 0.239089 7.41928 0.531309 7.41928C0.675522 7.41928 0.800759 7.36994 0.899431 7.26747L3.81025 4.42117C3.94307 4.29594 4 4.15931 4 3.99992Z" fill="black"/>
		</svg>
		
		<router-link to="/catalog"><span>Marketplace</span></router-link>
		
		<svg v-if="categoryCurrent" class="chevron" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4 3.99992C4 3.83673 3.94307 3.70391 3.81025 3.57867L0.899431 0.732369C0.800759 0.629902 0.679317 0.580566 0.531309 0.580566C0.239089 0.580566 0 0.815861 0 1.10808C0 1.25229 0.0607211 1.38512 0.166983 1.49138L2.74763 3.99613L0.166983 6.50846C0.0607211 6.61093 0 6.74375 0 6.89176C0 7.18398 0.239089 7.41928 0.531309 7.41928C0.675522 7.41928 0.800759 7.36994 0.899431 7.26747L3.81025 4.42117C3.94307 4.29594 4 4.15931 4 3.99992Z" fill="black"/>
		</svg>
		
		<router-link v-if="categoryCurrent" :to="'/catalog/' + categoryCurrent.url"><span>{{categoryCurrent.name}}</span></router-link >
		
		<svg v-if="subcategoryCurrent" class="chevron" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4 3.99992C4 3.83673 3.94307 3.70391 3.81025 3.57867L0.899431 0.732369C0.800759 0.629902 0.679317 0.580566 0.531309 0.580566C0.239089 0.580566 0 0.815861 0 1.10808C0 1.25229 0.0607211 1.38512 0.166983 1.49138L2.74763 3.99613L0.166983 6.50846C0.0607211 6.61093 0 6.74375 0 6.89176C0 7.18398 0.239089 7.41928 0.531309 7.41928C0.675522 7.41928 0.800759 7.36994 0.899431 7.26747L3.81025 4.42117C3.94307 4.29594 4 4.15931 4 3.99992Z" fill="black"/>
		</svg>
		<router-link v-if="subcategoryCurrent" :to="'/catalog/' + categoryCurrent.url + '/' + subcategoryCurrent.url"> 
				<span>{{subcategoryCurrent.name}}</span>
			</router-link >
	</div>

	<!-- Catalog wrapper -->
	<div class="catalog-wrapper section">

			<!-- Filters wrapper -->
			<div class="desktop-only filter-wrapper">
				<p class="mn-medium t-medium p-big">Categories</p>
				<!-- Categories -->
				<div class="mn-big filter-section">

					
					<div  class="category" v-for="category in categories" :category="category" :key="category">
						<!-- Category name -->
						<div class="mn-small category-title">	
							<router-link :to="{ name: 'CatalogCategory', params: { url: category.url }}" :class="{'link-active':category.name === store.state.categories.current.name}"  class="nav-link">
								<span class="t-medium p-medium">{{category.name}}</span>
							</router-link>
							<img v-if="category.subcategories.length > 0" @click="category.show = !category.show" :class="{ 'spoiler-active': !category.show }" class="button-icon" src="../../assets/icons/arrow-down-spoiler.svg">
						</div>
						<!-- Subcategory -->
						<transition name="fade">
						<div v-if="!category.show && category.subcategories.length > 0" class="category-subcategories">
							
							<span v-if="category.subcategories.length > 0" v-for="subcategory in category.subcategories" class="p-medium">
								<router-link :to="{ name: 'CatalogSubCategory', params: { url: category.url, id: subcategory.url }}" :class="{'link-active':subcategory.url === route.params.id}" class="nav-link">
									<span class="">{{subcategory.name}}</span>
								</router-link>
							</span>
							
						</div>
						 </transition>
					</div>


				</div>
				<p class="mn-medium t-medium p-big">Filters</p>
				<!-- Dynamic -->
				<div v-if="categoryCurrent" v-for="filter in categoryCurrent.filters" class="mn-thin filter-section">
					<div class="category-title">	
							<p class="h6">{{filter.name}}</p>
						<img @click="filter.show = !filter.show" :class="{ 'spoiler-active': !filter.show }" class="button-icon" src="../../assets/icons/arrow-down-spoiler.svg">
					</div>

					<div v-if="!filter.show" class="colors-wrapper">

   					<div v-for="option in filter.options.split(',')" @click="toggleDynamicFilter(option)" class="color-white color"> 
							<div :class="{'checkbox-active':filtersDynamic.includes(option)}" class="input-checkbox">
								<img src="@/assets/icons/check-mark.svg">
								<input type="checkbox" class="input-checkbox"> 
							</div>
							<span>{{option}}</span> 
						</div>
					</div>				
				</div>
				<!-- Size -->
				<div v-if="sizes.length > 0" class="mn-thin filter-section">
					<p class="h6">Sizes</p>
					<div class="sizes-wrapper">
						<div v-for="size in sizes" :class="{'button-active':filters.includes(size)}" @click="toggleFilter(size)" class="mn-r-small button-small button">
							{{size}}
   					</div>
					</div>				
				</div>
				<!-- Color -->
				<div v-if="colors.length > 0" class="mn-thin filter-section">
					<p class="h6">Colors</p>
					<div class="mn-small colors-wrapper">
						<div v-for="color in colors" @click="toggleFilter(color)" class="color-white color"> 
							<div :class="{'checkbox-active':filters.includes(color)}" class="input-checkbox">
								<img src="@/assets/icons/check-mark.svg">
								<input type="checkbox" class="input-checkbox"> 
							</div>
							<span>{{color}}</span> <span :class="transliterate(color)" class="round"></span> 
						</div>
					</div>					
				</div>
				<!-- Price -->
				<div class="mn-big filter-section">
					<p class="h6">Price</p>
					<div class="price-wrapper">
						<input class="bg-white input-text input" type="number" :value="filtersPrice.min" placeholder="From" @input="updateInputText('products', 'filter.price.min', $event)"  @blur="filterProductsPrice()" >
						<span> – </span>
						<input class="bg-white input-text input" type="number" :value="filtersPrice.max" placeholder="To" @input="updateInputText('products', 'filter.price.max', $event)"  @blur="filterProductsPrice()" >
					</div>							
				</div>
				<!-- Reset filter -->
				<button @click="resetFilterButton()" class="button-reset-filter button">Reset filters</button>

			</div>	
				
			<!-- Products wrapper  -->
			<div class="products-wrapper">
				<!-- Sorting section -->
				<div class="desktop-only  mn-medium sort-wrapper">
					<button 
						:class="{'button-active':sort.current == 'price'}" 			
						@click="setSort('price')" 
						class="button-sort button">
						By price
					</button>
					<button 
						:class="{'button-active':sort.current == 'createdAt'}" 
						@click="setSort('createdAt')" 
						class="button-sort button">By newest</button>
					<button 
						:class="{'button-active':sort.current == 'popularity'}"	
						@click="setSort('popularity')" 
						class="button-sort button">
						By popularity
					</button>
				</div>
				<!-- Products section -->
				<div v-if="!route.params.url" class="mn-big grid-layout">
					<ProductCard v-for="product in products" :product="product" :key="product" @click="router.push({name: 'Product', params: { id: product.id } })" ></ProductCard>
					<button v-if="store.state.products.filteredPrice.length > store.state.products.pagination.page * store.state.products.pagination.perPage" @click="loadMoreProduct()" class="b-center button-loads button">Show more</button>
				</div>

				<div v-if="route.params.url && !route.params.id" class="mn-big grid-layout">
					<ProductCard v-for="product in productsCategory2" :product="product" :key="product" @click="router.push({name: 'Product', params: { id: product.id } })" ></ProductCard>
					<button v-if="productsCategory.length > store.state.products.pagination.page * store.state.products.pagination.perPage" @click="loadMoreProduct()" class="b-center button-loads button">Show more</button>
				</div>

				<div v-if="route.params.id" class="mn-big grid-layout">
					<ProductCard v-for="product in productsSubCategory2" :product="product" :key="product" @click="router.push({name: 'Product', params: { id: product.id } })" ></ProductCard>
					<button v-if="productsSubCategory.length > store.state.products.pagination.page * store.state.products.pagination.perPage" @click="loadMoreProduct()" class="b-center button-loads button">Show more</button>
				</div>
				
			</div>

	</div>
</div>
</template>


<script setup="props">
	// Import libs
	import { defineProps, computed, onMounted, onServerPrefetch } from 'vue'
	import { useStore } from 'vuex'
	import { useRoute, useRouter,onBeforeRouteLeave } from 'vue-router'
	// Import components
	import ProductCard from '@/components/client/blocks/ProductCard.vue'

	// Accessing router and store
	const store = useStore()
	const route = useRoute()
	const router = useRouter()
	const props = defineProps(['showColors'])
	// Data fetching
	await store.dispatch('categories/fetchCategories')
	
	if (store.state.products.all.length < 1) await store.dispatch('products/fetchProductsPublished')
	
	if (route.params.url) {
		await store.dispatch('categories/fetchCategory', route.params.url)
	}
	// Accessing state
	const categories = computed(() => store.state.categories.all)
	const category = computed(() => store.state.categories.current)

	const categoryCurrent = computed(() => store.state.categories.all.find(category => category.url === route.params.url))
	const subcategoryCurrent = computed(() => store.state.categories.all.flatMap(category => category.subcategories.filter(e => e.url === route.params.id) ).pop())

	const sort = computed(() => store.state.products.sort)
	const filters 	= computed(() => store.state.products.filter.modifications)
	const filtersDynamic 	= computed(() => store.state.products.filter.extra)
	const filtersPrice 	= computed(() => store.state.products.filter.price)

	const products 	= computed(() => store.state.products.filteredPrice.slice(0, store.state.products.pagination.page * store.state.products.pagination.perPage))

	const productsCategory 	= computed(() => {
		const refiled = store.state.products.filteredPrice.filter(function(product) {
		  if (product.category.includes(route.params.url)) {
		  	return true
		  }
		})
		return refiled

	})
	const productsCategory2 	= computed(() => {
		const refiled = store.state.products.filteredPrice.filter(function(product) {
		  if (product.category.includes(route.params.url)) {
		  	return true
		  }
		})
		return refiled.slice(0, store.state.products.pagination.page * store.state.products.pagination.perPage);

	})
	const productsSubCategory 	= computed(() => store.state.products.filteredPrice.filter(function(product) {
	  if (product.category.includes(route.params.id)) {
	  	return true
	  }
	}))
	const productsSubCategory2 	= computed(() => {
		const refiled = store.state.products.filteredPrice.filter(function(product) {
		  if (product.category.includes(route.params.id)) {
		  	return true
		  }
		})
		return refiled.slice(0, store.state.products.pagination.page * store.state.products.pagination.perPage);

	})
	const sizes = computed(() => store.getters.getProductsSizes)
	const colors = computed(() => {
		const colorUnmod = store.getters.getProductsColors;
		const colorMod = []
		
		colorUnmod.forEach(function (char) { 
			if (char.includes('Мультицвет (')) {
				const colorMutadet = char.substr(12).slice(0, -1);
				const colorArray = colorMutadet.split(',');
				
				console.log(colorArray)	

				colorArray.forEach(element => {
					colorMod.push(element)
				});
			} else {
				colorMod.push(char)
		  }
	  })

	  let uniqueChars = [...new Set(colorMod)]
		return uniqueChars;  
  })


	router.beforeEach((to, from) => {
		store.commit('products/resetPageNumber')
		store.dispatch('products/resetFilter')
		// store.dispatch('products/setFilterColors')
	})

	var a = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"i","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"i","Ф":"F","Ы":"I","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"i","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"i","б":"b","ю":"yu"};

	function transliterate(word){
	  return word.split('').map(function (char) { 
	    return a[char] || char; 
	  }).join("");
	}

	function filterProducts(filter) {
		store.dispatch('products/filterProducts', filter)
	} 

	function filterProductsPrice(filter) {
		store.dispatch('products/filterProductsPrice')
	} 

	function toggleFilter(filter) {
		console.log(filter)
		store.dispatch('products/toggleFilter', filter)
		store.dispatch('products/filterProducts', filter)
	} 

	function toggleDynamicFilter(filter) {
		console.log(filter)
		store.dispatch('products/toggleDynamicFilter', filter)
		store.dispatch('products/filterProducts', filter)
	} 

	function setSort(sort) {
		store.dispatch('products/toggleSort', sort)
	} 

	function resetFilterButton () {
		store.dispatch('products/resetFilter')
	}
	function loadMoreProduct() {
		store.commit('products/loadMorePage')
	}
	// function resetPages() {
	// 	store.commit('products/resetPageNumber')
	// }
</script>

<style lang="scss">	

	.category-title {
		display: flex;

		align-items: center;
		justify-content: space-between;

		img { transition: all 0.25s ease; }
	}

	.catalog-wrapper {
		display: grid; 
		grid-template-columns: 1fr 3fr; 
		gap: 2rem; 

		padding-top: 1rem;
		
		.filter-wrapper {
			> p {
				height: 2.5rem;
				line-height: 2.5rem;
			}
			.filter-section {
				padding: 1.5rem;

				border: 1px solid rgba(34, 102, 255, 0.05);
				border-radius: 2rem;

				.h6 { margin-bottom: 1rem}
				
				.category { 

					margin-bottom: 0.5rem;

		

					.category-subcategories {
						margin-left: 1rem;
						margin-bottom: 1rem;

						overflow: hidden;

						span { display: block; margin-bottom: 0.5rem; &:last-of-type { margin-bottom: 0} }
					}

				}

				.sizes-wrapper {
					display: flex;
					flex-wrap: wrap;

				}

				.colors-wrapper {
					max-height: 8.75rem;
					overflow: hidden;

					&-active {
						max-height: 100rem;
					}

					.color {
						display: flex;
						align-items: center;

						height: 1.5rem;

						margin-bottom: 0.25rem;

						.input-checkbox {
							background: #f7f7f7;
							margin-right: 0.5rem;
						}
						img { opacity: 0}
						input { margin-right: 0.5rem; } 
						img, input, span { transition: all 0.2s ease; }
						.checkbox-active {
							img { opacity:1}
							input { background: #2266FF; margin-right: 0.5rem;}
						}
						.round {
							display: block;
							width: 1.375rem;
							height: 1.375rem;
							border-radius: 4rem;

							margin-left: auto;
							background: rgna(0,0,0,0.1);
						}

						&:hover {
							cursor: pointer;

							span:first-of-type {
								color: #2266FF
							} 

							input {
								// background: rgba(#2266FF,0.1);
							}
						}

					}
					
				}

				.price-wrapper {
					display: flex;
					width: 100%;
					align-items: center;
					flex: 1 1 auto;

					.input-text {
						padding: 0.5rem;
						width: 100%;
						border-radius: 0.5rem;
						font-size: 0.875rem;
					}

					span { 
						margin-left: 0.5rem;
						margin-right: 0.5rem;
					}
				} 	

			} 

		}
		.products-wrapper {
			
			.sort-wrapper {	
				display: flex;
				align-items: center;
				justify-content: flex-end;

				height: 2.5rem;

				padding-top: 1rem;
				padding-bottom: 1rem;

				.button-sort {
					margin-left: 1rem;
				}
			}
			

			.grid-layout {
				display: grid;
				padding: 0px;
				width: 100%; 
				grid-template-columns: 1fr 1fr 1fr; 
				 gap: 2rem; 
		    // grid-auto-rows: auto;

		    .button-loads {
	  	    grid-column: 2/3;
		    }

			}

			.grid-item {
				display: flex;
				flex-direction: column;
				overflow: hidden;
				border-radius: 0;

				font-size: 14px;

				transition: all 0.5s ease;

				box-shadow: 32px 16px 100px 0px rgb(0 0 0 / 15%);

				background: white;

				.image {
					width: 100%;
					height: 100%; 
					background-repeat: no-repeat; 
					background-position: center center; 
					background-size: cover;
				}

				.text {
					padding: 24px;
					color: black;
					background: white;
					
					h5 {margin-bottom: 8px; }
					span {opacity: 0.5; } 
				}
			}
		}
	}

	.fade-enter-active,
	.fade-leave-active {
		opacity: 1;
		height: auto;
	}

	.fade-enter-from,
	.fade-leave-to {
	  opacity: 0;
	  height: 0;
	  transition: all 0.25s ease;
	}


</style>
