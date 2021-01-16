import Vue from "vue";
import Vuex from 'vuex';
import maxi from '../src/data/maxi.json'

Vue.use(Vuex)

let cart = window.localStorage.getItem('cart');
let favorite = window.localStorage.getItem('favorite');
// let order = window.localStorage.getItem('favorite');
export default new Vuex.Store({
   state: {
      cart: cart ? JSON.parse(cart) : [],
      favorite: favorite ? JSON.parse(favorite) : [],
      maxi: [],
   },

   getters: {
      maxi: (state) => state.maxi,
      // save total quantity to local storage
      totalQuantity: state => {
         let total = 0;
         state.cart.filter((item) => {
            total += (1 * item.productQuantity);
         });
         return total;
      },
      // save total price to local storage
      totalPrice: state => {
         let total = 0;
         state.cart.filter((item) => {
            total += (item.productPrice * item.productQuantity);
         });
         return total;
      },
      // save total weight to local storage
      totalWeight: state => {
         let total = 0;
         state.cart.filter((item) => {
            total += (item.productWeight * item.productQuantity);
         });
         return total;
      },
      // save total favorite to local storage
      totalFavorite: state => {
         let total = 0;
         state.favorite.filter((item) => {
            total += (1 * (item.favoriteQuantity / item.favoriteQuantity));
         });
         return total;
      },
      
   },
   actions: {
      getMaxi({ commit }) {
         commit('getMaxiData');
      }
   },

   mutations: {
      getMaxiData(state) {
         state.maxi = maxi;
      },
      // add item to cart
      addToCart(state,item) {
         let found = state.cart.find(product => product.productId === item.productId );
         if(found) {
            found.productQuantity++;
         } else {
            state.cart.push(item);
         }
         this.commit('saveData');
      },
      // add item to favorite
      addToFavorite(state,item) {
         let found = state.favorite.find(product => product.favoriteId === item.favoriteId );
         if(found) {
            // found.favoriteQuantity++;
         } else {
            state.favorite.push(item);
         }
         this.commit('saveDataFavorite');
      },
      // addToFavorite(state,item) {
      //    let found = state.favorite.find(product => product.favoriteId === item.favoriteId );
      //    if(found) {
      //       // found.favoriteQuantity++;
      //    } else {
      //       state.favorite.push(item);
      //    }
      //    this.commit('saveDataFavorite');
      // },
      // save favorite item to local storage
      saveDataFavorite(state) {
         window.localStorage.setItem('favorite', JSON.stringify(state.favorite));
      },
      // save cart item to local storage
      saveData(state) {
         window.localStorage.setItem('cart', JSON.stringify(state.cart));
      },
      
      // clear local storage after checkout
      destroy(state) {
         window.localStorage.removeItem('cart', JSON.stringify(state.cart));
      },
      // remove item from cart
      removeFromCart(state, item) {
         let index = state.cart.indexOf(item);

         state.cart.splice(index,1);

         this.commit('saveData')
      },
      // remove item from favorite
      removeFromFavorite(state, item) {
         let index = state.favorite.indexOf(item);

         state.favorite.splice(index,1);

         this.commit('saveDataFavorite')
      },
   },
   
  })