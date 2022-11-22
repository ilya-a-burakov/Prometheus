<template>
	<li class="product-card">
        <img src="@/assets/images/pics/pr-c-img.png" class="pc-img">
        <div class="product-card-content">
          <h5>{{product.name}}</h5>
          <div class="flex">
            Редактировать
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
    }
	}
</script>

<style lang="scss">
	.product-card {
      display: flex;
      flex-direction: column;
      border-radius: 1rem;
      box-shadow: -8px -8px 20px -8px #FFFFFF,
      8px 8px 20px -12px rgba(239, 239, 239, 1);
      overflow: hidden;

      .pc-img {width: 100%;}

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
    }

</style>


