 <template>
  <section id="instagram" class="section">
    <div ref="root" class="t-center glide">
        <div class="title">
          <h2 class="mn-big">Отзывы наших покупателей</h2>
      </div>
       <div data-glide-el="controls" class="mn-big flex controls">
        <button data-glide-dir="<" class="btn-circle">
           <img src="@/assets/images/icons/arrow-left.svg">
        </button>
        <button data-glide-dir=">" class="btn-circle">
         <img src="@/assets/images/icons/arrow-right.svg">
        </button>
      </div>
      <div data-glide-el="track" class="mn-extra group glide__track">
        <ul class="glide__slides flex">
          <InstagramCard :img="1"/>
          <InstagramCard :img="2"/>
          <InstagramCard :img="3"/>
          <InstagramCard :img="4"/>
        </ul>
      </div>
    </div>
    <div class="t-center title">
      <p class="text-medium">Мы очень рады, что вы делитесь с нами своей красотой и присылаете нам фото-приветы.<br>Спасибо за ваши фотографии!</p>
      <button class="button">Посмотреть все отзывы</button> 
    </div>
  </section>
</template>


<script>
import InstagramCard from "@/components/client/blocks/InstagramCard.vue";

import { ref, onMounted } from "vue";
import Glide from "@glidejs/glide";
export default {
  data() {
    return {};
  },
  name: "InstagramSection",
  components: {
    InstagramCard,
  },
  setup() {
    const root = ref(null);

    onMounted(() => {
      var glideClass = root.value;
        var glideObject = new Glide(glideClass, {
          type: 'carousel',
          startAt: 0,
          perView: 3,
          peek: 0,
          gap: 30,
          breakpoints: {
            900: {
              perView: 2  
            },
            600: {
              perView: 1,
              gap: 10,
              peek: 10
            }
          }
        }).mount();

        function convertRemToPixels(rem) {    
            return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
        }
      })
    return {
      root,
    };
  },
};
</script>

<style lang="scss">
#instagram {
  position: relative;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.900651) 100%), url("@/assets/images/backgrounds/testimonials.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  border-bottom: 1px solid rgba(0,0,0,0.1);

  .button { margin: 0 auto; }
  .controls {
      position: absolute;
      top: 53%;
      width: 100%;

        .btn-circle{
          position: absolute;
          display: flex;
          align-items: center;
          top: 50%;
          justify-content: center;
          height: 4rem;
          width: 4rem;
          background: white;
          box-shadow: 0px 0px 29px rgba(0, 0, 0, 0.06);
          border: none;
          padding: 1rem;
          border-radius: 4rem;
          z-index: 14;

          transform: scale(1);

          transition: all 0.33s ease;
          
          &:first-child {left: -2rem;}
          &:last-child {right: -2rem;}

          &:hover {
            cursor: pointer;

            transform: scale(0.9);
          }
        }
      }

  .instagram-integration {
    margin-bottom: 4rem;
  }
  .title {
    p {
      margin-bottom: 1.5rem;
    }
  }

  ul {
    display: flex;
    justify-content: space-between;

    .instagram-item {
      width: calc(25% - 0.5rem);
      border-radius: 1rem;

      box-shadow: -8px -8px 20px -8px #FFFFFF, 8px 8px 20px -12px rgba(183, 124, 124, 0.06);
      &:last-child{
        margin-right: 0;
      }
      .insta-top{
          span{display: block;}
      }
      > img { width: 100%; }
      .insta-bottom{
        padding: 0.625rem 0.625rem 1rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
          img {
            margin-right: 0.625rem;
            &:last-child{margin-right: 0;}
            }
          span {display: block; margin-top: 0.25rem}
      }
      
    }
  }
}

@media screen and (max-width: 480px) {
  #instagram {
    padding: 0;
    padding-top: 2rem;
    padding-bottom: 4rem;

    .mn-extra { margin-bottom: 2rem;}

    .controls {
      display: none;

    }
  }
}

</style>
