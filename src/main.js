import Vue from "vue";
import Vuex from 'vuex';
import "./registerServiceWorker";
import router from "./router";
import App from "./App.vue";
import {fb} from "./firebase";
import VueFirestore from "vue-firestore";
import VueFilterList from 'vue2-filter-list'
import vuetify from './plugins/vuetify';
import store from './store';
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import SimpleVueValidation from 'simple-vue-validator';
import VueLazyload from 'vue-lazyload'


require('firebase/firestore')
Vue.use(Vuex)
Vue.use(VueFirestore);
Vue.config.devtools = true;
Vue.use(VueFilterList)
Vue.use(VueLodash, { lodash: lodash })
Vue.use(SimpleVueValidation);
Vue.use(VueLazyload)

Vue.component('navbar', require('./components/Navbar.vue').default);
Vue.component('carousel', require('./components/Carousel.vue').default);
Vue.component('slider', require('./components/Slider.vue').default);
Vue.component('latest-news', require('./components/LatestNews.vue').default);
Vue.component('marketplace', require('./components/Marketplace.vue').default);
Vue.component('footernav', require('./components/FooterNav.vue').default);
Vue.component('livecart', require('./components/LiveCart.vue').default);
Vue.component('side-menu', require('./components/SideMenu.vue').default);
Vue.component('related-products', require('./components/RelatedProducts.vue').default);
Vue.component('related-article', require('./components/RelatedArticle.vue').default);
Vue.component('user-profile', require('./components/UserProfile.vue').default);
Vue.component('add-to-cart', require('./components/AddToCart.vue').default);
Vue.component('add-to-cart-from-favorite', require('./components/AddToCartFromFavorite.vue').default);
Vue.component('add-to-favorites', require('./components/AddToFavorites.vue').default);
Vue.component('add-to-favorites-from-products', require('./components/AddToFavoritesFromProducts.vue').default);

Vue.config.productionTip = false;

let app = "";

fb.auth().onAuthStateChanged(function(user) {
  
  if(!app) {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});






