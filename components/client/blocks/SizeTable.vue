<template>
	<div style="position: relative"> 
		<a @click="isOpen = !isOpen" class="mn-big small-underline">Таблица размеров</a>
		
		<transition name="fade">
		<div v-if="isOpen === true" @click="isOpen = !isOpen" class="size-table-wrapper">
			<div class="arrow-up"></div>
			<div class="size-table">
				
			  <div>
			    <div class="size-table-header">
			      <div>Российский размер</div>
			      <div>ОГ, см</div>
			      <div>ОТ, см</div>
			      <div>ОБ, см</div>
			    </div>
			  </div>
			  <div>
			    <div>
			      <div>38</div>
			      <div>78-82</div>
			      <div>60-64</div>
			      <div>86-90</div>
			    </div>
			    <div>
			      <div>40</div>
			      <div>82-86</div>
			      <div>64-68</div>
			      <div>92-98</div>
			    </div>
			    <div>
			      <div>42</div>
			      <div>86-90</div>
			      <div>68-72</div>
			      <div>98-102</div>
			    </div>
			    <div>
			      <div>44</div>
			      <div>90-94</div>
			      <div>72-76</div>
			      <div>102-106</div>
			    </div>
			    <div>
			      <div>46</div>
			      <div>94-98</div>
			      <div>76-80</div>
			      <div>106-110</div>
			    </div>
			    <div>
			      <div>48</div>
			      <div>90-102</div>
			      <div>80-84</div>
			      <div>110-114</div>
			    </div>
			  </div>
			</div>
		</div>
		</transition>
	</div>
</template>


<script setup>
	import { ref } from 'vue'

	let isOpen = ref(false);
</script>

<style lang="scss">

.size-table-wrapper {
	position: absolute;
	left: 0;
	top: 1rem;
	width: 100%;
	z-index: 10;	
}

.arrow-up {
	position: relative;
	margin-left: 2rem;
  width: 0; 
  height: 0; 
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  
  border-bottom: 15px solid white;
  z-index: 3;
}

.size-table {
	padding: 2rem;
	background: #FFFFFF;
	box-shadow: 0px 3px 14px rgba(0, 0, 0, 0.05);
	border-radius: 1rem;

	z-index: 2;



	&-header {
		padding-bottom: 1rem;
		opacity: 0.5;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		margin-bottom: 1rem !important;
	}
	> div {
		> div {
			display: flex;
			flex-wrap: nowrap;

			margin-bottom: 1rem;

			&:last-of-type {
				margin-bottom: 0;
			}

			div {
				width: 25%;
			}
		}
	}
}
</style>


