<template>
	<div v-if="!(images === undefined)" class="product-images-wrapper">
    <div class="product-previews-wrapper">
      <div class="product-cover-wrapper">
        <Suspense>
          <carousel ref="ImagesSlider" :items-to-show="1" :transition="330" :autoplay="3000" :pauseAutoplayOnHover="true">
              <slide  v-for="image in images.links" :key="key">
                  <img :src="require( `@/assets/images/products/${image}`)" />
              </slide>
            </carousel>
          </Suspense>
      </div>
    </div>
  </div>

  <div v-else class="product-images-wrapper col">
    <div class="w-100 product-cover-wrapper">
      <img style="width: 100%; height: 100%; object-fit: cover;" :src="require( `@/assets/icons/photo.svg`)" />
    </div>
  </div>
</template>

<script setup="props">
/////////////////////////////
// COMPONENT DEPENDENCIES
/////////////////////////////
import { ref, defineProps,onMounted } from 'vue';
 import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'


/////////////////////////////
// HELPERS
/////////////////////////////

/////////////////////////////
// CREATED
/////////////////////////////
const ImagesSlider = ref(null)

const props = defineProps({
  images: Object,
});


onMounted(() => {

    setTimeout(() => {
      ImagesSlider.value.restartCarousel()
    }, "500")

})

/////////////////////////////
// MOUNTED
/////////////////////////////
</script>

<style lang="scss">
.product-images-wrapper {

  .product-previews-wrapper {

    border-radius: 2rem;
    background: #F4F7FF;
    overflow: hidden;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      aspect-ratio: 1/1;
    }
  }

  
}

</style>
