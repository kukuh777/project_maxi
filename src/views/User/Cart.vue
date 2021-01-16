<template>
   <div class="cart">
      <navbar></navbar>
      <main>
        <section class="uk-section uk-section-small">
            <div class="uk-container">
                <div class="uk-grid-medium uk-child-width-1-1" uk-grid>
                    <div class="uk-text-center">
                        <ul class="uk-breadcrumb uk-flex-center uk-margin-remove">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <span>Cart</span>
                            </li>
                        </ul>
                        <h1 class="uk-margin-small-top uk-margin-remove-bottom">Cart</h1>
                    </div>
                    <div>
                        <div class="uk-grid-medium" uk-grid>
                            <div class="uk-width-1-1 uk-width-expand@m">
                                <div class="uk-card uk-card-default uk-card-small tm-ignore-container">
                                    <header class="uk-card-header uk-text-uppercase uk-text-muted uk-text-center uk-text-small uk-visible@m">
                                       <div class="uk-grid-small uk-child-width-1-2" uk-grid>
                                          <div>product</div>
                                          <div>
                                             <div class="uk-grid-small uk-child-width-expand" uk-grid>
                                                   <div>price</div>
                                                   <div class="tm-quantity-column">quantity</div>
                                                   <div>sum</div>
                                                   <div class="uk-width-auto">
                                                      <div style="width: 20px;"></div>
                                                   </div>
                                             </div>
                                          </div>
                                       </div>
                                    </header>
                                    <!-- Product Cart Start -->
                                    <div class="uk-card-body" v-for="item in this.$store.state.cart" :key="item.productId">
                                        <div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@m uk-flex-middle" uk-grid>
                                            <!-- Product cell-->
                                            <div>
                                                <div class="uk-grid-small" uk-grid>
                                                    <div class="uk-width-1-3">
                                                        <div class="tm-ratio tm-ratio-4-3">
                                                            <a class="tm-media-box" @click.stop="productDetail(item)">
                                                               <figure class="tm-media-box-wrap">
                                                                  <img :src="item.productImage" :alt="item.productTitle">
                                                               </figure>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="uk-width-expand">
                                                        <div class="uk-text-meta">{{  item.productCategory }}</div>
                                                        <a class="uk-link-heading" @click.stop="productDetail(item)">{{ item.productTitle }}</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Other cells-->
                                            <div>
                                                <div class="uk-grid-small uk-child-width-1-1 uk-child-width-expand@s uk-text-center" uk-grid>
                                                    <div>
                                                        <div class="uk-text-muted uk-hidden@m">Price</div>
                                                        <div>{{ item.productPrice | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</div>
                                                    </div>
                                                    <div class="tm-cart-quantity-column">
                                                        <a @click="decreaseQty(item)" uk-icon="icon: minus; ratio: .75"></a>
                                                        <input class="uk-input tm-quantity-input" type="text" :value="item.productQuantity"/>
                                                        <a @click="increaseQty(item)" uk-icon="icon: plus; ratio: .75"></a>
                                                    </div>
                                                    <div>
                                                        <div class="uk-text-muted uk-hidden@m">Sum</div>
                                                        <div>{{ item.productQuantity * item.productPrice | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</div>
                                                    </div>
                                                    <div class="uk-width-auto@s">
                                                        <a @click="$store.commit('removeFromCart',item)" class="uk-text-danger" uk-tooltip="Remove">
                                                            <span uk-icon="close"></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Product Cart End -->
                                </div>
                            </div>
                            <div class="uk-width-1-1 tm-aside-column uk-width-1-4@m">
                                <div class="uk-card uk-card-default uk-card-small tm-ignore-container" uk-sticky="offset: 30; bottom: true; media: @m;">
                                    <div class="uk-card-body">
                                        <div class="uk-grid-small" uk-grid>
                                            <div class="uk-width-expand uk-text-muted">Weight (gram)</div>
                                            <div>{{ this.$store.getters.totalWeight | currency('', 0, { thousandsSeparator: '.' }) }}</div>
                                        </div>
                                    </div>
                                    <div class="uk-card-body">
                                        <div class="uk-grid-small" uk-grid>
                                            <div class="uk-width-expand uk-text-muted">Subtotal</div>
                                            <div>{{ this.$store.getters.totalPrice | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</div>
                                        </div>
                                    </div>
                                    <div class="uk-card-body">
                                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                                            <div class="uk-width-expand uk-text-muted">Total</div>
                                            <div class="uk-text-lead uk-text-bolder">{{ this.$store.getters.totalPrice | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</div>
                                        </div>
                                        <a @click="checkout" type="submit" class="uk-button uk-button-primary uk-margin-small uk-width-1-1">checkout</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <marketplace></marketplace>
      </main>
      <footernav></footernav>
   </div>
</template>

<script>
import {fb,db} from '../../firebase'
import router from '../../router'
export default {
   name: "Cart",
	props: {
		msg: String
   },
   data() {
      return {
        productId: '',
        productQuantity: '',
        ticket: {
            products: null,
            total: 0
        }
      }
   },
   methods: {
       checkout() {
           this.$router.push('/checkout')
        },
        // tambah dan kurang jumlah barang
        increaseQty(item) {
            item.productQuantity++
            this.$store.commit('saveData', this.item);
        },
        decreaseQty(item) {
            item.productQuantity--
            if(item.productQuantity === 0) {
                this.$store.state.cart.splice(this.$store.state.cart.indexOf(item), 1)
            }
            this.$store.commit('saveData', this.item);
        },
        productDetail (item) {
            router.push({ name: 'Products', params: { id: item.productId }})
        },
   }
}
</script>

<style>

</style>