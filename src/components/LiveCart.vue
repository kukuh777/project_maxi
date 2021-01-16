<template>
	<div class="live-cart">
		<div id="cart-offcanvas" uk-offcanvas="overlay: true; flip: true">
			<aside class="uk-offcanvas-bar uk-padding-remove">
				<div class="uk-card uk-card-default uk-card-small uk-height-1-1 uk-flex uk-flex-column tm-shadow-remove">
					<header class="uk-card-header uk-flex uk-flex-middle">
						<div class="uk-grid-small uk-flex-1" uk-grid>
							<div class="uk-width-expand">
								<div class="uk-h3">Cart</div>
							</div>
							<button class="uk-offcanvas-close" type="button" uk-close></button>
						</div>
					</header>
					<div class="uk-card-body uk-overflow-auto">
						<ul class="uk-list uk-list-divider">
                     <!-- Product Cart -->
							<li class="uk-visible-toggle" v-for="item in this.$store.state.cart" :key="item.id">
								<div>
									<div class="uk-grid-small" uk-grid>
										<div class="uk-width-1-4">
											<div class="tm-ratio tm-ratio-4-3">
												<a class="tm-media-box">
													<figure class="tm-media-box-wrap">
														<img v-lazy="item.productImage" :alt="item.productTitle">
													</figure>
												</a>
											</div>
										</div>
										<div class="uk-width-expand">
											<div class="uk-text-meta uk-text-xsmall">{{ item.productTitle }}</div>
                                 				<a class="uk-link-heading uk-text-small">{{ item.productTitle }}</a>
											<div class="uk-margin-xsmall uk-grid-small uk-flex-middle" uk-grid>
												<div class="uk-text-bolder uk-text-small">{{ item.productPrice | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</div>
												<div class="uk-text-meta uk-text-xsmall">{{ item.productQuantity }} × {{item.productQuantity*item.productPrice | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</div>
											</div>
										</div>
										<div>
											<a class="uk-icon-link uk-text-danger uk-invisible-hover" href="#" uk-icon="icon: close; ratio: .75" uk-tooltip="Remove" @click="$store.commit('removeFromCart',item)"></a>
										</div>
									</div>
								</div>
							</li>
                     <!-- End Product Cart -->
						</ul>
					</div>
					<footer class="uk-card-footer">
						<div class="uk-grid-small" uk-grid>
							<div class="uk-width-expand uk-text-muted uk-h4">Subtotal</div>
							<div class="uk-h4 uk-text-bolder">{{ this.$store.getters.totalPrice | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</div>
						</div>
						<div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@m uk-margin-small" uk-grid>
							<div>
                        		<router-link class="uk-button uk-button-default uk-margin-small uk-width-1-1" to="/cart">view cart</router-link>
							</div>
							<div>
								<router-link class="uk-button uk-button-primary uk-margin-small uk-width-1-1"  to="/checkout">checkout</router-link>
							</div>
						</div>
					</footer>
				</div>
			</aside>
		</div>
	</div>
</template>
<script>
	export default {
	  name: "livecart",
	  props: {
	    msg: String
	 },
	 data() {
		 return {
			 
		 }
	 },
	};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>