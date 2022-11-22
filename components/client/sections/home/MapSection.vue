<template>
  <section id="map" class="section">
    <div class="t-center title">
      <h2 class="mn-big">📍 How to Find Us</h2>
    </div>

    <div class="cols-2">
      <!-- Left col -->
      <div class="pd-extra col">
        <h3 class="mn-medium">Our Address</h3>
        <address class="mn-medium p-big">
          <span class="t-medium">Tbilisi,<br>Muhatgverdi Street, 19</span>
          <p class="mn-small">41.798012, 44.756951</p>
          <p> There is city parking nearby </p>
        </address>
       
        <div class="mn-medium phone">
          <span class="t-medium p-big">+995 585 888 660</span>
          <p>Every day from 10:00 to 21:00</p>
        </div>
        <a @click="store.commit('toggleShopAdress')" class="button-link text">See detailed directions</a>
      </div>
      <!-- Right col -->
      <div class="google-map col">
        <iframe id="gmap_canvas" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1207.9851740241995!2d44.75538672970814!3d41.797961353343595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40446e71f8644169%3A0x13c1eda89f4df176!2s1%20Asi%20Atasi%20Motsame%20St%2C%20T&#39;bilisi%200131%2C%20Georgia!5e0!3m2!1sen!2sth!4v1667915381789!5m2!1sen!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"  frameborder="0" scrolling="no" marginheight="0" marginwidth="0" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </section>
</template>


<script setup>
  import { ref, computed, onServerPrefetch, onMounted } from 'vue'
  import { useStore } from "vuex";


  const store = useStore()

</script>

<style lang="scss">
#map {
  padding-bottom: 0;
  
  .cols-2 {
      background-color: #F4F7FF;

      border-radius: 2rem;
      overflow: hidden;
      
      .col:first-of-type {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .button-link {color: #2266FF;}
      }
      .col:last-of-type {

          #gmap_canvas {
            // border-radius: 2rem;
            overflow: hidden;
            
             height: 32rem;
              width: 100%;
          }
      }
  }
}
</style>
