<template>
	<li class="product block">
    <img v-if="product.images[0]" class="pc-img" :src="require( `@/assets/images/products/${product.images[0].links[0]}`)">
    <img v-if="!(product.images[0])" class="pc-img" :src="require( `@/assets/icons/photo.svg`)">
    
    <div class="product-card-content">
      <h5 class="mn-small">{{product.name}}</h5>
      <div class="flex">
        <router-link :to="'/admin/products/' + product.id + '/edit'" class="nav-link">Редактировать</router-link>
        <a class="nav-link" @click="deleteProduct(product)">Удалить</a>
      </div>
    </div>
	</li>
</template>


<script>
	import { toRef,onMounted } from 'vue'
	
	export default {
		props: ['product'], 
		name: 'ProductCard',
		setup(props) {
			onMounted(() => {
			})

			return {
			}
		},
    methods: {
      deleteProduct(product) {
        // this.$store.commit('products/deleteProduct', product);
        this.$store.dispatch('products/deleteProduct', product)
      }
    }
	}
</script>

<style lang="scss" scoped>
  .product {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
  } 
  .pc-img { height: 6rem; width: 6rem; object-fit: cover;}

  .product-card-content {
    padding: 0.75rem 1rem 1rem 1rem;  

    h5 { white-space: normal;}
    .name {margin-bottom: 0.5rem;}
    .size {margin-bottom: 0.75rem;}

    .flex { flex-wrap: nowrap; justify-content: flex-start;  }
    .price {
      margin-right: 1rem; 
      font-weight: 700;
      font-size: 1,125;
    }
  } 


</style>


