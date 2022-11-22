<template>
	<!-- -------------------------------- -->
	<!-- Product data -->
	<!-- -------------------------------- -->
	<div class="product-info-wrapper">
		<!-- Product data header  -->
		<div class="mn-big product-tab-header">
			<button @click="changeTab('description')" :class="{'product-tab-active':data.currentTab === 'description'}" class="mn-r-semi product-tab">
				<img class="mn-r-small" src="@/assets/icons/description.svg">
				Описание товара
			</button>

			<button @click="changeTab('delivery')" :class="{'product-tab-active':data.currentTab === 'delivery'}" class="mn-r-semi product-tab">
				<img class="mn-r-small" src="@/assets/icons/delivery.svg">
				Доставка
			</button>

			<button @click="changeTab('payment')" :class="{'product-tab-active':data.currentTab === 'payment'}" class="mn-r-semi product-tab">
				<img class="mn-r-small" src="@/assets/icons/payment.svg">
				Оплата
			</button>

		</div>
		<!-- -------------------------------- -->
		<!-- Product data content -->
		<!-- -------------------------------- -->
		<!-- Description -->
		<div class="product-content">
			<div v-if="data.currentTab === 'description'" class="product-description">
				
			</div>
		</div>
		<!-- Delivery -->
		<div v-if="data.currentTab === 'delivery'" class="product-description">
			<div class="cols-2">
				<!-- Left col -->
				<div class="mn-r-medium col">
					<img class="mn-medium" src="@/assets/icons/shopping-bag.svg">
					<p class="mn-small t-demi">Если вы в Москве</p>
					<p class="mn-small">
						Доставляем по Москве курьером в примеркой! У нас свои вежливые и пунктуальные курьеры.
					</p>
					<ul style="list-style: disc; line-height: 1.5;" class="mn-big">
							<li>Не ограничиваем количество моделей на примерку - привезём все, что понравится</li>
							<li>Не ограничиваем время на примерку</li>
							<li>Если ничего не подойдёт, вы платите только за доставку</li>
						</ul>
					<p class="mn-small t-demi">Тарифы</p>
					<p class="mn-thin">В пределах МКАД — <span class="mn-small t-demi">350 ₽</span></p>
					<p class="mn-small">За пределы МКАД — <span class="mn-small t-demi">550 ₽</span></p>
				</div>
				<!-- Right col -->
				<div class="col">
					<img class="mn-medium" src="@/assets/icons/globe.svg">
					<p class="mn-small t-demi">Доставка в любую точку мира</p>
					<p class="mn-small">В другие города отправляем почтой России или компанией СДЭК по 100% предоплате на карту.</p>
					<p class="mn-small">Наши менеджеры на связи с вами ежедневно с 10 до 21 часов и готовы ответить на любые вопросы, а так же сделать дополнительные замеры, фото или видео вещей.</p>  
					<p class="mn-small">Стоимость доставки рассчитывается индивидуально🌷</p>
					<p>Срок доставки от 6 до 15 дней.</p>
				</div>
			</div>
		</div>
		<!-- Payment -->
		<div v-if="data.currentTab === 'payment'" class="product-description">
			<div class="cols-2">
				<!-- Left col -->
				<div class="mn-r-medium col">
					<p class="mn-small t-demi">Если вы в Москве</p>
					<ul style="list-style: decimal; line-height: 1.5;" class="mn-medium">
						<li class="mn-thin">Положите выбранные товары в корзину и оформите заказ.</li>
						<li class="mn-thin">Наши менеджеры свяжутся с вами в рабочее время для уточнения деталей</li>
						<li class="mn-thin">После утверждения заказа, менеджер осуществит сброку ипередаст его на доставку нашим курьерам</li>
						<li class="mn-thin">Ожидайте курьера в назначенную дату. Вы можете примерить все что заказали, выбрать и оплатить только то, что вам подошло + за доставку курьеру</li>
						<li class="mn-thin">Оплатить можно как наличными, так и по карте, у наших курьеров всегда с собой терминал</li>
					</ul>
					<p>В <a  @click="store.commit('toggleShopAdress')"  class="t-demi underline">шоуруме в Москве</a> оплатить товары вы сможете как наличными, так и по карте.</p>
				</div>
				<!-- Right col -->
				<div class="col">
					<p class="mn-small t-demi">Если вы не Москве</p>
					<ul style="list-style: decimal; line-height: 1.5;" class="mn-medium">
						<li class="mn-thin">Положите выбранные товары в корзину и оформите заказ.</li>
						<li class="mn-thin">Наши менеджеры свяжутся с вами в рабочее время для уточнения деталей</li>
						<li class="mn-thin">После утверждения заказа, менеджер вышлет ссылку для оплаты удобным вам способом</li>
						<li class="mn-thin">После оплаты вы получите электронный чек и трек-номер для отслеживания посылки на эл.почту или в Whatsapp</li>
						<li class="mn-thin">Ожидайте доставку оплаченного заказа в выбранной транспортной компании (Почта России или СДЭК)</li>
					</ul>
				</div>
			</div>
		</div>

	</div>
	<!-- -------------------------------- -->
	<!-- Product data end -->
	<!-- -------------------------------- -->
</template>


<script setup scoped>
	import { ref, computed, toRefs, reactive } from 'vue'
	import { useStore } from "vuex";


	const store = useStore()

	let data = reactive({currentTab: 'description'})
	let reactiveData = toRefs(data)

	function changeTab (tab) {data.currentTab = tab; console.log(data.currentTab) }


</script>

<style lang="scss">

.product-tab-header {
	display: flex; 

	border-bottom: 1px solid rgba(0,0,0,0.1);
	
	.product-tab {

		display: flex;

		min-height: 2.5rem;

		text-transform: uppercase;

		background: transparent;

		border-bottom: 1px solid rgba(0,0,0,0);

		opacity: 0.33;

		&-active {
			opacity: 1;
			border-bottom: 1px solid rgba(0,0,0,1);
		}
	}
}

</style>


