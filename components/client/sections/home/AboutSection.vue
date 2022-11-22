<template>
  <section id="about" class="section">
    <div class="t-center title">
      <h2 class="mn-big">Welcome To<br><b>Ceramic Studio Kulbabka</b></h2>
    </div>

    <div class="about-block cols-2 flex">
      <!-- Left col -->
      <div class="pd-extra text-about flex-center flex col">
          <h3 class="mn-medium">At the quiet main school <span class="cursive">you will find yourself busy to the core. 👩‍👦‍👦</span></h3>
            <p class="mn-big">Children of the age of 3 years, schoolchildren and scholars, have grown up to be of any age. Sergiy’s team and Sergiy himself were informed by the masters to teach those who are keen on pottery - hand-made molding and other techniques for painting ceramic pottery.</p>
            <p class="w-100 mn-medium h6">Like it? Check out our Instagram!</p>
            <a href="https://instagram.com/kulbabka_ceramic" target="_blank">
            <button class="button">Go to Instagram</button>
          </a>
      </div>
      <!-- Right col -->
      <div class="brand-photo col">
          <img :src="require( `@/assets/images/backgrounds/about.png`)">
      </div>
    </div>
  </section>
</template>


<script setup>
  import { computed, onMounted, reactive, toRefs } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute,useRouter } from 'vue-router'
 
  const store = useStore()
  const route = useRoute()
  const router = useRouter()
</script>

<style lang="scss">
#about {

  .about-block {
    grid-template-columns: 2fr 1fr; gap: 0rem;

    background: #F4F7FF;

    border-radius: 2rem;
    overflow: hidden;

  }

  .brand-photo {
    object-fit: cover;
    height: 100%;
    
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}

</style>
