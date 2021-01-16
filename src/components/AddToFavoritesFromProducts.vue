<template>
   <div class="uk-width-auto uk-width-expand@s uk-flex uk-flex-middle uk-text-meta">
        <a class="uk-margin-small-right js-add-to js-add-to-favorites tm-action-button-active js-added-to" uk-tooltip="Add to favorites" @click="addToFavorite">
            <span uk-icon="heart"></span>
        </a>
    </div>
</template>

<script>
import {fb, db} from "../firebase";
export default {
name: "add-to-favorites-from-products",
   props: {
      pId: String,
      title: String,
      // price1: String,
      // price2: String,
      // weight: String,
      // category: String,
      // condition: String,
      // status: String,
      // image: String,
      // top_selling: String,
      // order: String,
      // stock: String,
      // brands: String,
      

   },
   data() {
      return {

         item: {
            favoriteId: this.pId,
            favoriteTitle: this.title,
            // favoritePrice1: this.price1,
            // favoritePrice2: this.price2,
            // favoriteWeight: this.weight,
            // favoriteCategory: this.category,
            // favoriteStatus: this.status,
            // favoriteStock: this.stock,
            // favoriteBrand: this.brands,
            // favoriteCondition: this.condition,
            // favoriteImage: this.image,
            // favoriteTopSelling: this.top_selling,
            // favoriteQuantity: this.order,
         }
      }
   },

   methods: {
      addToFavorite() {
         this.$store.commit('addToFavorite', this.item);
      }
      // AddToFavorites(user) {
      //    const UserId = fb.auth().currentUser
      //    this.favorite = {
      //       title: this.title,
      //       price1: this.favotitePrice1,
      //       price2: this.favoritePrice2,
      //       weight: this.favoriteWeight,
      //       category: this.favoriteCategory,
      //       condition: this.favoriteCondition,
      //       status: this.favoriteStatus,
      //       image: this.favoriteImage,
      //       top_selling: this.favoriteTopSelling,
      //    }
      //    fb.firestore().collection('profiles').doc(UserId).update(this.favorite);
      // }
   }
}
</script>
