<template>
   <button class="uk-button uk-button-primary tm-product-card-add-button tm-shine js-add-to-cart" aria-label="add to cart" @click="addToCart">
      <span class="tm-product-card-add-button-icon" uk-icon="cart"></span>
      <span class="tm-product-card-add-button-text">add to cart</span>
   </button>
</template>

<script>
export default {
   name: 'add-to-cart',
   props: {
      pId: String,
      title: String,
      price: String,
      weight: String,
      category: String,
      image: String,
      order: String
   },
   data() {
      return {
         item: {
            productId: this.pId,
            productTitle: this.title,
            productPrice: this.price,
            productWeight: this.weight,
            productCategory: this.category,
            productImage: this.image,
            productQuantity: this.order,
            
         }
         
      }
   },
   methods: {
      addToCart() {
         this.$store.commit('addToCart', this.item)
      }
   },
   

}
</script>

<style>

</style>