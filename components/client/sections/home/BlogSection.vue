<template>
  <section id="blog" class="section">
    <div class="mn-big t-center title">
      <h2 class="mn-small">Блог</h2>
      <p>Интересные и полезные материалы на темы отдыха, моды и здоровья</p>
    </div>
    <div class="mn-big articles">

      <div v-for="blogpost in blogposts" class="article">
        <!-- <img class="mn-medium" :src="require( `@/assets/images/blog/${blogpost.image}`)"> -->
        <h4 class="mn-medium">{{blogpost.title}}</h4>
        <p class="mn-medium">{{blogpost.description.slice(0,200)}}...</p>
        <a target="_blank"  :href="blogpost.url">
          <span class="mn-r-thin uppercase">Читать полностью</span>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6548 8.8334H0.5V7.16673H12.6548L7.41074 1.92265L8.58925 0.744141L15.8452 8.00006L8.58925 15.256L7.41074 14.0775L12.6548 8.8334Z" fill="#2266FF"/>
          </svg>

        </a>
      </div>
    </div>
    <a href="https://zen.yandex.ru/id/606f43e5441f9c665b16ca70" target="_blank" class="button">Читать все статьи</a>
  </section>
</template>



<script setup>
  import { ref, computed, onServerPrefetch, onMounted } from 'vue'
  import { useStore } from "vuex";


  const store = useStore()

  if (store.state.blog.length < 1) { 
    store.dispatch('fetchBlog').then(
      finish => {
        console.log('succes1')
      },
      err => {
        console.log('error')
      }
    ); 
  }

  const blogposts = computed(() => store.state.blog.slice(0,3))


</script>


<style lang="scss">
#blog {
  .title {
    p {
      font-size: 1.25rem;
    }
  }
  .articles {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;

    .article {
      display: block;

      padding: 1.875rem;

      width: calc(33.333% - 1.25rem);
      > img { width: 100%; }
      h4 {
        font-size: 1.125rem;
        text-transform: none;
        letter-spacing: 0;
        line-height: 1;
      }

      p { opacity: 0.5}
      a { display: flex; color: #2266FF; img {margin-left: 0.5rem;} }

    }
  }

  .button { margin: 0 auto; background: white; color: #2266FF; border: 1px solid #2266FF;  }
}

@media screen and (max-width: 480px) {
  #blog {
    padding-top: 2rem;
    padding-bottom: 4rem;

    
    .articles {
     flex-wrap: wrap;

     .article {
      padding: 0;
      width: 100%;

      margin-bottom: 10px;
     }
    }
        
  }  
  
}
</style>
