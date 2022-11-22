<template>
  <section id="gift" class="section">

    <div class="t-center section-1-col">
      <p class="mn-small">
        Looking for a beautiful and stylish gift?
      </p>
      <h3 class="mn-medium">
        Gift Certificate is a simple way to donate money<br><b>and make suprise for someone</b>
      </h3>
      
      <router-link to="/catalog/products/7070249d-c84a-4bb4-bfac-a58b65353209">
        <button class="button">Buy now</button>
      </router-link>
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
#gift {
    b {
      color: #2266FF;
    }

   .section-1-col {
    display: block;
    padding: 10rem 3rem;
    color: black;
    border-radius: 2rem;
    background: #2266FF;
    background-image: url("@/assets/images/backgrounds/cerificat.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center bottom;
    overflow: hidden;
    .button {
      margin: 0 auto;
      background: white;
      color: #2266ff;
      // box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.05);
      // border: 1px solid #F4F7FF;
      opacity: 1;

      &:hover {
         background: #2266ff;
      color: white;
      }
    }

  }
}

</style>
