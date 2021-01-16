<template>
  <div class="all-products">
     <navbar/>
    <main>
      <section class="uk-section uk-section-small">
         <div class="uk-container">
            <div class="uk-grid-medium uk-child-width-1-1" uk-grid>
               <div class="uk-text-center">
                  <ul class="uk-breadcrumb uk-flex-center uk-margin-remove">
                     <li>
                        <router-link to="/">Home</router-link>
                     </li>
                     <li>
                        <router-link to="/catalog">Catalog</router-link>
                     </li>
                     <li>
                        <span>All Products</span>
                     </li>
                  </ul>
                  <h1 class="uk-margin-small-top uk-margin-remove-bottom">All Products</h1>
                  <div class="uk-text-meta uk-margin-xsmall-top">{{ productCount }} items</div>
               </div>
               <div>
                  <div class="uk-grid-medium" uk-grid>
                     <aside class="uk-width-1-4 tm-aside-column tm-filters" id="filters" uk-offcanvas="overlay: true; container: false;">
                        <div class="uk-offcanvas-bar uk-padding-remove">
                           <div class="uk-card uk-card-default uk-card-small uk-flex uk-flex-column uk-height-1-1">
                              <header class="uk-card-header uk-flex uk-flex-middle">
                                 <div class="uk-grid-small uk-flex-1" uk-grid>
                                    <div class="uk-width-expand">
                                       <h3>Filters</h3>
                                    </div>
                                    <button class="uk-offcanvas-close" type="button" uk-close></button>
                                 </div>
                              </header>
                              <div class="uk-margin-remove uk-flex-1 uk-overflow-auto" uk-accordion="multiple: true; targets: &gt; .js-accordion-section" style="flex-basis: auto">
                                 <section class="uk-card-body js-accordion-section uk-open">
                                    <h4 class="uk-accordion-title uk-margin-remove">Brands</h4>
                                    <div class="uk-accordion-content">
                                       <ul class="uk-list tm-scrollbox">
                                          <li>
                                             <input v-model="brand" class="tm-checkbox" id="all" name="brand" value="" type="radio" checked>
                                             <label for="all">
                                                <span>All</span>
                                             </label>
                                          </li>
                                          <li v-for="br in brands" :key="br.title">
                                             <input v-model="brand" class="tm-checkbox" :id="br.title" name="brand" :value="br.title" type="radio">
                                             <label :for="br.title"><span>{{ br.title }}</span>
                                             </label>
                                          </li>
                                       </ul>
                                    </div>
                                 </section>
                                 <section class="uk-card-body js-accordion-section uk-open">
                                    <h4 class="uk-accordion-title uk-margin-remove">Categories</h4>
                                    <div class="uk-accordion-content">
                                       <ul class="uk-list tm-scrollbox">
                                          <li>
                                             <input v-model="category" class="tm-checkbox" id="category-1" name="category" value="" type="radio" checked>
                                             <label for="category-1">
                                                <span>All</span>
                                             </label>
                                          </li>
                                          <li v-for="ctg in categories" :key="ctg.title">
                                             <input v-model="category" class="tm-checkbox" :id="ctg.title" name="category" :value="ctg.title" type="radio">
                                             <label :for="ctg.title">
                                                <span>{{ctg.title}}</span>
                                             </label>
                                          </li>
                                       </ul>
                                    </div>
                                 </section>
                                 <section class="uk-card-body js-accordion-section">
                                    <h4 class="uk-accordion-title uk-margin-remove">Conditions</h4>
                                    <div class="uk-accordion-content">
                                       <ul class="uk-list tm-scrollbox">
                                          <li>
                                             <input v-model="condition" class="tm-checkbox" id="condition-1" name="condition" value="" type="radio" checked>
                                             <label for="condition-1">
                                                <span>All</span>
                                             </label>
                                          </li>
                                          <li>
                                             <input v-model="condition" class="tm-checkbox" id="condition-2" name="condition" value="new" type="radio">
                                             <label for="condition-2"><span>New</span>
                                             </label>
                                          </li>
                                          <li>
                                             <input v-model="condition" class="tm-checkbox" id="condition-3" name="condition" value="second" type="radio">
                                             <label for="condition-3"><span>Second</span>
                                             </label>
                                          </li>
                                       </ul>
                                    </div>
                                 </section>
                                 <div class="uk-card-body">
                                    <button @click.stop="resetFilter" class="uk-button uk-button-default uk-width-1-1"><span class="uk-margin-xsmall-right" uk-icon="icon: close; ratio: .75;"></span>Reset all filters</button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </aside>
                     <div class="uk-width-expand">
                        <div class="uk-grid-medium uk-child-width-1-1" uk-grid>
                           <div>
                              <div class="uk-card uk-card-default uk-card-small tm-ignore-container">
                                 <div class="uk-grid-collapse uk-child-width-1-1" id="products" uk-grid>
                                    <div class="uk-card-header">
                                       <div class="uk-grid-small uk-flex-middle" uk-grid>
                                       </div>
                                    </div>
                                    <div>
                                       <div class="uk-grid-collapse uk-child-width-1-3 tm-products-grid js-products-grid" uk-grid>
                                          <article class="tm-product-card" v-for="product in fuzzy(filterProduct,search)" :key="product.id">
                                             <div class="tm-product-card-media">
                                                <div class="tm-ratio tm-ratio-4-3">
                                                   <a class="tm-media-box" @click.stop="productDetail(product)">
                                                      <div class="tm-product-card-labels">
                                                         <span class="uk-label uk-label-warning">{{ product.top_selling }}</span>
                                                         <span v-if="product.condition==label" class="uk-label uk-label-success">{{ product.condition }}</span>
                                                         <span v-else class="uk-label uk-label-danger">{{ product.condition }}</span>
                                                      </div>
                                                      <figure class="tm-media-box-wrap">
                                                         <img v-lazy="getImage(product.images)" :alt="product.title"/>
                                                      </figure>
                                                   </a>
                                                </div>
                                             </div>
                                             <div class="tm-product-card-body">
                                                <div class="tm-product-card-info">
                                                   <div class="uk-text-meta uk-margin-xsmall-bottom">{{ product.category }}</div>
                                                   <h3 class="tm-product-card-title">
                                                      <a class="uk-link-heading" @click.stop="productDetail(product)">
                                                         {{ product.title }}
                                                      </a>
                                                   </h3>
                                                </div>
                                                <div class="tm-product-card-shop">
                                                   <div class="tm-product-card-prices"> 
                                                      <del class="uk-text-meta">{{ product.price1 | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</del>
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
                                    <!-- <div>
                                       <button class="uk-button uk-button-default uk-button-large uk-width-1-1" style="border-top-left-radius: 0; border-top-right-radius: 0;">
                                          <span class="uk-margin-small-right" uk-icon="icon: plus; ratio: .75;"></span>
                                          <span>Load more</span>
                                       </button>
                                    </div> -->
                                 </div>
                              </div>
                           </div>
                           <!-- <div>
                              <ul class="uk-pagination uk-flex-center">
                                 <li class="uk-active"> <span>1</span>
                                 </li>
                                 <li> <a href="#">2</a>
                                 </li>
                                 <li> <a href="#">3</a>
                                 </li>
                                 <li> <a href="#">4</a>
                                 </li>
                                 <li> <a href="#">5</a>
                                 </li>
                                 <li class="uk-disabled"> <span>…</span>
                                 </li>
                                 <li> <a href="#">20</a>
                                 </li>
                                 <li> <a href="#"><span uk-pagination-next></span></a>
                                 </li>
                              </ul>
                           </div> -->
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <!-- Marketplace -->
      <marketplace/>
   </main>	
   <footernav/>
  </div>
</template>

<script>
// import '../assets/uikit.js';
import {fb} from '../firebase';
import router from '../router';
import VueFilterList from 'vue2-filter-list';
export default {
   name: 'AllProducts',
   mixins: [VueFilterList.mixin],
	props: {},
	data() {
		return {
         min: 0,
         max:0,
         start: 0,
         end: 0,
         brand: '',
         category: '',
         condition: '',
         brands: [],
         
         search: '',
         key: '',
         label: 'new',
         product: {},
         products: [],
         productCount: '',
         ref: fb.firestore().collection('products'),
         categories: [],
         ref2: fb.firestore().collection('categories').orderBy('title','asc'),
         ref3: fb.firestore().collection('brands').orderBy('title','asc'),
      }
	},
	created() {
      this.ref.get().then(res => {
         window.localStorage.setItem('productCount', res.size)
      });
		this.ref.orderBy('timestamp','desc').onSnapshot((querySnapshot) => {
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
					brand: doc.data().brands,
					weight: doc.data().weight,
					condition: doc.data().condition,
					top_selling: doc.data().top_selling,
				});
			});
      });
      this.ref2.onSnapshot((querySnapshot) => {
        this.categories = [];
        querySnapshot.forEach((doc) => {
          this.categories.push({
            title: doc.data().title,
          });
        });
      });
      this.ref3.onSnapshot((querySnapshot) => {
        this.brands = [];
        querySnapshot.forEach((doc) => {
          this.brands.push({
            title: doc.data().title,
          });
        });
      });
   },
  
   computed:{
      filterProduct(){
         var vm = this, products = vm.products 
         return _.filter(products, function(query){
         var   
               brand = vm.brand ? (query.brand == vm.brand) : true,
               category = vm.category ? (query.category == vm.category) : true,
               condition = vm.condition ? (query.condition == vm.condition) : true;
         
         return brand && category && condition
         })
      }
   },
    
  mounted() {
   // get value from local storage
      if(localStorage.productCount) this.productCount = localStorage.productCount;
      
   },
   
	methods: {
      
      getImage(images) {
         return(images[0])
      },
      productDetail (product) {
         router.push({ name: 'Products', params: { id: product.key }})
      },
      resetFilter(){
          this.brand = ""
          this.category = ""
          this.condition = ""
        }
   }
}
</script>