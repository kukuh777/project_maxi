<template>
  <div class="related-items">
      <section>
         <div uk-slider="finite: true">
            <div class="uk-grid-small uk-flex-middle uk-margin-bottom" uk-grid>
               <h2 class="uk-width-expand uk-text-center uk-text-left@s">Other Products</h2>
               <div class="uk-visible@s">
                  <a class="tm-slidenav" href="#" uk-slider-item="previous" uk-slidenav-previous></a>
                  <a class="tm-slidenav" href="#" uk-slider-item="next" uk-slidenav-next></a>
               </div>
            </div>
            <div>
               <div class="uk-card uk-card-default uk-card-small tm-ignore-container">
                  <div class="uk-position-relative">
                     <div class="uk-slider-container">
                        <div class="uk-slider-items uk-grid-collapse uk-child-width-1-3 uk-child-width-1-4@m tm-products-grid">
                           <article v-for="product in products" :key="product.id" class="tm-product-card">
                              <div class="tm-product-card-media">
                                 <div class="tm-ratio tm-ratio-4-3">
                                    <a class="tm-media-box" @click.stop="productDetail(product)">
                                       <div class="tm-product-card-labels">
                                          <span class="uk-label uk-label-warning">{{ product.top_selling }}</span>
                                          <span v-if="product.condition==label" class="uk-label uk-label-success">{{ product.condition }}</span>
                                          <span v-else class="uk-label uk-label-danger">{{ product.condition }}</span>
                                       </div>
                                       <figure class="tm-media-box-wrap">
                                          <img v-lazy="getImage(product.images)" :alt="product.title" />
                                       </figure>
                                    </a>
                                 </div>
                              </div>
                              <div class="tm-product-card-body">
                                 <div class="tm-product-card-info">
                                    <div class="uk-text-meta uk-margin-xsmall-bottom">{{ product.category }}</div>
                                    <h3 class="tm-product-card-title">
                                       <a class="uk-link-heading" @click.stop="productDetail(product)">{{ product.title }}</a>
                                    </h3>
                                 </div>
                                 <div class="tm-product-card-shop">
                                    <div class="tm-product-card-prices"> <del class="uk-text-meta">{{ product.price1 | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</del>
                                       <div class="tm-product-card-price">{{ product.price2 | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</div>
                                    </div>
                                    <div class="tm-product-card-add">
                                       <add-to-favorites
                                       :pId="product.key"
                                       :title="product.title"
                                       :image="getImage(product.images)"
                                       :price1="product.price1"
                                       :price2="product.price2"
                                       :weight="product.weight"
                                       :status="product.status"
                                       :stock="product.stock"
                                       :condition="product.condition"
                                       :top_selling="product.top_selling"
                                       :category="product.category"
                                       :order="product.order"
                                       :brands="product.brands"/>
                                       <!-- Add To Cart -->
                                       <add-to-cart
                                       :pId="product.key"
                                       :title="product.title"
                                       :image="getImage(product.images)"
                                       :price="product.price2"
                                       :weight="product.weight"
                                       :category="product.category"
                                       :order="product.order"
                                       />
                                    </div>
                                 </div>
                              </div>
                           </article>
                        </div>
                     </div>
                  </div>
               </div>
               <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin-top uk-hidden@s"></ul>
            </div>
         </div>
      </section>
  </div>
</template>

<script>
import {fb,db} from '../firebase'
import router from '../router'
import { VueEditor } from "vue2-editor";
export default {
 name: "related-products",
 props: {
    msg: String
 },
 data() {
    return {
       key: '',
       label: 'new',
       prouct: {},
       products: [],
       ref: fb.firestore().collection('products').orderBy('category','asc'),
      //  .where('category','==','laptop')
    }
 },
 created () {
    this.ref.onSnapshot((querySnapshot) => {
      this.products = [];
      querySnapshot.forEach((doc) => {
        this.products.push({
          key: doc.id,
          title: doc.data().title,
          category: doc.data().category,
          price1: doc.data().price1,
          price2: doc.data().price2,
          images: doc.data().images,
          order: doc.data().order,
          status: doc.data().status,
          stock: doc.data().stock,
          brands: doc.data().brands,
          weight: doc.data().weight,
          condition: doc.data().condition,
          top_selling: doc.data().top_selling,
        });
      });
    });
  },
  methods: {
      getImage(images) {
         return(images[0])
      },
      productDetail (product) {
         router.replace({ name: 'Products', params: { id: product.key }})
         router.go(0)
      },
  }
}
</script>

<style>

</style>