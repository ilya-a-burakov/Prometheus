<template>
	<li class="instagram-item">
    <img :src="require( `../../assets/images/testimonials/${img}.jpg`)">
    
    <!-- <div class="insta-top">
      
      <div class="flex">
        <img class="logo" src="@/assets/images/testimonials/logo.jpg">
        <div><a href="#" class="t-main text-600 text">your_beach_msk</a><span class="insta-lication">Москва</span>
        </div>
      </div>
    </div> -->
   
  </li>
</template>


<script>
	import { onMounted } from 'vue'
	
	export default {
		data() {
			return {
			} 
		},
    props:['img'],
		name: 'InstgramCard',
		setup(props) {
			onMounted(() => {
			})

			return {
			}
		}
	}
</script>

<style lang="scss">
	.insta-top {
        display: flex;

    width: 100%;
    justify-content: space-between;

    margin-top: 1rem;

    .logo {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 4rem;
      overflow: hidden;
    }

    .flex {
      flex-wrap: nowrap;
      align-items: center;
      div {
          display: block;
          margin-left: 0.75rem;
          text-align: left;
        }
      span {    white-space: normal;}

      a { color: #2266FF; } 
    }

  }

</style>


