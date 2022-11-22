<template>
	<div class="mn-big">
		<p class="mn-small t-semi p-big">Бонусная система</p>
		<button v-if="!connected" class="button" @click="connect">Connect wallet</button>
    <button v-if="connected" class="block">{{account}}</button>
    
    <!-- {{ contractResult }} -->
		<hr class="mn-semi">
		<div class="mn-regular flex-nowrap flex">
			<div class="mn-r-medium w-100 pd-big bg-card">
				<img class="mn-big" :src="require( `@/assets/icons/star.svg`)">
				<p class="mn-small t-main p-big">324 бонуса</p>
				<p class="t-transp">1 бонус = 1 рубль</p>
			</div>
			<div class="w-100 pd-big bg-card">
				<img class="mn-big" :src="require( `@/assets/icons/clock.svg`)">
				<p class="mn-small p-big">278 дней</p>
				<p class="t-transp">До окончания действия бонусов</p>
			</div>


		</div>

		<div class="pd-big bg-card">
				<p class="mn-small p-big">Как работает бонусная система:</p>
				<p class="">
					Бонусы начисляются за покупки и отображаются в личном кабинете. За каждый заказ бонусы можно или начислить, или списать. 1 бонус = 1 рубль. На день рождения начисляются доп. 300 бонусов, которые можно потратить в течении недели (об этом можно выводить на сайте какое-то праздничное уведомление).
					<br>	
					Если бонусы к ДР не используют, они просто сгорают. Бонусы за покупку действуют год, потом сгорают. Бонусами можно оплатить часть покупки, это операция “Оплатить бонусами” или “Списать бонусы”, можно потратить не все бонусы при оплате. Бонусами можно оплатить только ДО 40% от покупки.
					<br>
					В бонусной системе будет описание работы бонусной системы (можно сворачиваемым его сделать или поп-апом, текст напишу в ближайшие дни) и количество бонусов в текущий момент.</p>
			</div>
	</div>
</template>

<script setup="props">
/////////////////////////////
// COMPONENT DEPENDENCIES
/////////////////////////////
import { defineProps, ref,toRefs, onMounted } from 'vue';
// Import WEB3
import Web3 from 'web3'
/////////////////////////////
// CREATED
/////////////////////////////
 const props = defineProps({
  user: Object,
});

const { user } = toRefs(props);

let account = ref(null) 
let connected = ref(false);

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8080');
const accounts = await web3.eth.requestAccounts();

account = accounts[0];
/////////////////////////////
// METHODS
/////////////////////////////
function connect() {
	// this connects to the wallet
	if (window.ethereum) { // first we check if metamask is installed
		window.ethereum.request({ method: 'eth_requestAccounts' }).then(() => {
			console.log('aman')
			connected.value = true; // If users successfully connected their wallet
		});
	}
}

/////////////////////////////
// MOUNTED
/////////////////////////////
onMounted(() => {

});
</script>

<style lang="scss">

</style>
