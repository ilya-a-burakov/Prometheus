<div class="product-data-wrapper">
			<div class="product-images-wrapper">
				<div class="product-previews-wrapper">
					<div class="white-gradient"></div>
					<splide
			      :options="secondaryOptions"
			      ref="secondary"
			    >
			      <splide-slide v-for="image in product.images"  :key="image">
			        <img :src="require( `../assets/images/products/${image}`)" />
			      </splide-slide>
			    </splide>
				</div>

				<div class="product-cover-wrapper">
					<splide
			      :options="primaryOptions"
			      ref="primary"
			    >
			      <splide-slide v-for="image in product.images" :key="image">
			      	<div class="img-crop">
				        <img :src="require( `../assets/images/products/${image}`)" />
				      </div>
			      </splide-slide>
			    </splide>
				</div>

			</div>

			<div class="product-description-wrapper">
				
				<div>
					<!-- Name -->
					<h1 class="h1-product mn-small">{{product.name}}</h1>
					<!-- Price -->
					<p  v-for="price in product.salePrices" class="mn-small h4">
						{{price.value / 100}} ₽
					</p>
					<a class="mn-big small-underline">Условия возврата и доставки</a>
					<!-- Sizes -->
				  <p class="mn-small t-demi">Размер</p>

				  <div class="mn-small sizes-wrapper">

						<div 
							v-if="sizes.length === 0" 
							@click="selectSize('One-size')" 
							class="mn-r-small button-size-active button-one-size button-size button"
						>
							One-size
   					</div>
						<div 
							v-for="(size, index) in sizes"  
							@click="selectSize(size)" 
					  	:class="{'button-size-active': product.selectedSize === size }" 
							class="mn-r-small button-size button"
						>
							{{size}}
   					</div>
					</div>
					<a class="mn-big small-underline">Таблица размеров</a>
					<!-- Colors -->
					<p class="mn-small t-demi" v-if="colors.length > 0">Цвет</p>
				  <div class="mn-extra colors-wrapper">
					  <div 
					  	v-for="color in colors" 
					  	@click="selectColor(color)" 
					  	:class="{'color-active':product.selectedColor === color.value}" 
					  	class="mn-r-small color"
				  	>
					  	<img v-if="color.value === 'Белый'" src="@/assets/icons/check-mark-black.svg">
					  	<img v-else src="@/assets/icons/check-mark.svg">
							<span v-if="product.selectedSize" :class="transliterate(color.value)" class="round"></span> 
						</div>
					</div>
				  
				</div>

				<div>
				  <!-- Add to cart -->
				  <div class="mn-medium buttons-wrapper">
						<button @click="addToCart(product)" class="button">Добавить в корзину</button>
						<button @click="addToCart(product)" class="mn-l-small button-grey button">Быстрый заказ</button>
					</div>
					<p class="p-small">Точный размер по вашим параметрам поможет подобрать менеджер при уточнении заказа</p>
				</div>
			</div>

		</div>