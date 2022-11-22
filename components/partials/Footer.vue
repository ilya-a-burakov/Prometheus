<template>
  <footer class="footer">

    <div class="top-footer section">
      <div @click="this.$router.push({ name: 'Home' } )" class="logo-link col">
        <img src="@/assets/logotype.svg">
      </div>

      <div class="contact col">
        <span class="title">Studio in <a @click="store.commit('toggleShopAdress')"  class="">Tbilisi</a></span>
        <span class="subtitle">Daily: 10:00 to 21:00</span>
      </div>
      
      
      <div  class="contact col">
        <span class="title">8 (915) 460 60 69</span>
        <span @click="store.commit('toggleBackCall')" class="subtitle"><a hrяef="#" class="">Book a workshop</a></span>
      </div>
      
    </div>

    <div class="cols-3 section">
      
      <ul class="nav-footer col">
        <span class="mn-small colheader">Marketplace</span>

        <div class="mn-medium twocols col">
          <li v-for="category in categories">
            <router-link :to="{ name: 'CatalogCategory', params: { url: category.url }}">
              {{category.name}}
            </router-link>  
          </li>
        </div>

        <a href="https://oz.digital" target="_blank"><img src="@/assets/images/icons/ozdao.svg"></a>
      </ul>
      <ul class="nav-footer col">
        <li class="colheader">
          Information
        </li>
        <li  v-for="page in pages">

          <router-link :to="{ name: 'Page', params: { url: page.url}}" class="col nav-link">
            {{page.name}}
          </router-link>
        </li>
      </ul>
      <div class="nav-footer col">
        <ul>
          <li class="colheader">Address</li>
          <div class="mn-medium">
            <li>Tbilisi,</li>
            <li>Mukhatgverdi Street, 19,</li>
            <li>41.798012, 44.756951</li>
          </div>
          <div class="socials flex-center flex">
            <li> 
              <a href="https://api.whatsapp.com/send/?phone=995585888660&text&app_absent=0" target="_blank">
                <img src="@/assets/images/icons/Whatsapp_blue.svg">
              </a>
            </li>
            <li> 
              <a href="https://t.me/+ZQJCpn39hxQxYTEy" target="_blank"> 
                <img src="@/assets/images/icons/Telegram_blue.svg">
              </a> 
            </li> 
            <li> 
              <a href="https://instagram.com/kulbabka_ceramic" target="_blank">
                <img src="@/assets/images/icons/Instagram_blue.svg">
              </a>
            </li> 
          </div>
        </ul>
      </div>
    </div> 

    
    <p class="copyright">
      Всі права захищені. Інформація сайту захищена законом про авторські правах.<br />
      ИНН 49674945. ОГРНИП 318784700281160.
    </p>
  </footer>
</template>

<script setup="props">
  import { computed, defineProps,onMounted, toRefs,ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  
  
  const store = useStore()
  const router = useRouter()


  // Accessing state
  const categories = computed(() => store.state.categories.all)
  const pages = computed(() => store.state.pages.all.filter(page => (page.groups.includes('all') || page.groups.includes('footer'))))



</script>

<style lang="scss">
  .footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: white;

    .top-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      background: white;

      .col {
        width: calc(33.333% - 1.25rem);
      }

      .contact {
        .title { 
          display: block; 
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .subtitle { 
          font-size: 0.875rem; 
        }
        a { 
          color: #2266FF; 
        }
      }
      
      .logo-link { 
        height: 3rem; 
        img { height: 100%; }
      }

    }

    .cols-3 {
      padding-top: 0;

      border-bottom: 1px solid rgba(0,0,0,0.1);

      .col {

       .colheader {
        display: block;
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: 1rem;
        width: 100%;
      }


      .twocols {
        column-count: 2;
        column-gap: 1rem;
      }
      
      li {
        margin-bottom: 0.5rem;

        font-size: 0.875rem;
      }
      .socials  {
        justify-content: flex-start;

        li { margin-right: 1rem; }
      }

      
    }
  }

  .footer-cn {
    display: flex;
    img {height: 1.5rem; width: auto; margin-left: 2rem;
    }
  }

  .copyright {
    background: white;
    padding: 1.625rem;
    text-align: center;
    font-size: 0.75rem;
  }
}

@media screen and (max-width: 480px) {
  .footer {
    background: white;
    .top-footer {
      height: auto;
      flex-wrap: wrap;
      background: white;
      .col { 
        width: 50%; 
        text-align: center;
        border-bottom: 1px solid rgba(0,0,0,0.1); 
        padding-top: 2rem;
        padding-bottom: 2rem;
        &:first-of-type { 
          padding-top: 0;
          width: 100%; 
          height: 6rem;
        } }
      }
    }
  }
</style>