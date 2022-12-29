<template>
  <div>
    <div class="breadcrumbs section">
      <router-link to="/">
        <svg class="home" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="black" d="M0.494141 4.26391C0.494141 4.48862 0.659906 4.66912 0.928813 4.66912C1.05037 4.66912 1.16825 4.6065 1.27139 4.52177L1.64344 4.20866V7.56448C1.64344 8.13545 1.98971 8.47803 2.5791 8.47803H7.56678C8.15616 8.47803 8.50243 8.13545 8.50243 7.56448V4.19392L8.8929 4.52177C8.99604 4.6065 9.11392 4.66912 9.23916 4.66912C9.48597 4.66912 9.67015 4.5144 9.67015 4.27128C9.67015 4.1313 9.61121 4.01343 9.5007 3.92133L8.50243 3.08146V1.47538C8.50243 1.30961 8.3956 1.1991 8.22984 1.1991H7.63308C7.46732 1.1991 7.35313 1.30961 7.35313 1.47538V2.11634L5.66969 0.70181C5.31606 0.403433 4.85928 0.403433 4.50197 0.70181L0.663589 3.92133C0.553079 4.01711 0.494141 4.14235 0.494141 4.26391ZM6.13752 5.26219C6.13752 5.08906 6.02701 4.97855 5.85387 4.97855H4.31779C4.14097 4.97855 4.02678 5.08906 4.02678 5.26219V7.63447H2.83327C2.60856 7.63447 2.48332 7.50922 2.48332 7.28084V3.5014L4.90349 1.47538C5.01768 1.37592 5.15029 1.37592 5.26817 1.47538L7.66255 3.48298V7.28084C7.66255 7.50922 7.53731 7.63447 7.3126 7.63447H6.13752V5.26219Z"/>
        </svg>
          <span>Main</span>
      </router-link>

      <svg  class="chevron" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 3.99992C4 3.83673 3.94307 3.70391 3.81025 3.57867L0.899431 0.732369C0.800759 0.629902 0.679317 0.580566 0.531309 0.580566C0.239089 0.580566 0 0.815861 0 1.10808C0 1.25229 0.0607211 1.38512 0.166983 1.49138L2.74763 3.99613L0.166983 6.50846C0.0607211 6.61093 0 6.74375 0 6.89176C0 7.18398 0.239089 7.41928 0.531309 7.41928C0.675522 7.41928 0.800759 7.36994 0.899431 7.26747L3.81025 4.42117C3.94307 4.29594 4 4.15931 4 3.99992Z" fill="black"/>
      </svg>
      
      <router-link :to="'/pages/' + page.url"><span>{{page.name}}</span></router-link >
      
      
    </div>
    <div class="cols-2-1_2 section"> 
      <ul class="mn-r-big pd-medium menu-tabs">
        <p class="mn-medium t-semi p-medium">Information</p>
        <li  v-for="page in pages"  :class="{'product-tab-active':route.params.url === page.url}" class="product-tab">

          <router-link :to="{ name: 'Page', params: { url: page.url}}" >
           {{page.name}}
          </router-link>
        </li>
      </ul>  
      <section class="page ">
        <h1 class="mn-small">{{page.name}}</h1>
        <hr class="mn-semi">
        <div v-html="content" class="page-content-wrapper"></div>
      </section>  
    </div>
  </div>
</template>

<script setup>
  // Import libs
  import { computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  
  import marked from 'marked';
 
  // const renderer = {
  //   image(image) {
  //     var imageRequired = require('../../../assets/images/cases/' + image)
  //     return `<img src='${imageRequired.default}' />`;
  //   }
  // };

  // marked.use({ renderer });
  // Import components
  // Accessing router and store
  const store = useStore()
  const route = useRoute()
  // Data prefetching
  if (route.params.url) {
    await store.dispatch('pages/fetch', route.params.url).then(
      succes => { console.log('succes') },
      error => {  
        console.log('error') 
      }
    )
  } else {
    store.commit('pages/init');
  }

  await store.dispatch('pages/fetchAll').then(
    succes => { console.log('sycces') },
    error => {  
      console.log('eror') 
    }
  )

  const pages = computed(() => store.state.pages.all)
  console.log(store.state.pages)

  const page = computed(() => store.state.pages.current)
  const content = computed(() => { return marked(store.state.pages.current.content, { sanitize: true })})
</script>

<style lang="scss">
.menu-tabs {
  margin-right: 3rem;
  .product-tab {
    height: 2.5rem;
  }
}
.page {
  width: 100%;
  .page-content-wrapper {
    > * {
      margin-bottom: 1rem;
    }
  }
  p { 
    opacity: 0.5;
  }
  ul {
    li {
      list-style-type: circle;
      // height: 4rem;
      margin-bottom: 0.5rem;
    }
  }
}
</style>
