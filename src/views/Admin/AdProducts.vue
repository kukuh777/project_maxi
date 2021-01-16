<template>
  <div class="adproducts">
    <h3 class="subheading grey--text">Product Page</h3>
    
    <!-- Table Start -->
      <v-data-table :headers="headers" :items="products" sort-by="" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Product List</v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link to="/admin/add-product">
              <v-btn color="primary" dark class="mb-2">New Product</v-btn>
            </router-link>
          </v-toolbar>
        </template>
        <template v-slot:item.price1="{ item }">
         {{ item.price1 | currency('Rp ', 0, { thousandsSeparator: '.' }) }}
        </template>
        <template v-slot:item.price2="{ item }">
         {{ item.price2 | currency('Rp ', 0, { thousandsSeparator: '.' }) }}
        </template>
        <template v-slot:item.stock="{ item }">
          <v-chip :color="getColor(item.stock)" dark>{{ item.stock }}</v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click.stop="editProduct(item)">mdi-pencil</v-icon>
          <v-icon small @click.stop="deleteProduct(item.key)">mdi-delete</v-icon>
        </template>
      </v-data-table> 
      <!-- Table End -->
  </div>
  
</template>

<script>
import {fb,db} from '../../firebase'
import router from '../../router'

export default {
  name: 'products',
  data () {
    return {
      key: '',
      product: {},
      products: [],
      ref: fb.firestore().collection('products'),
      headers: [

        { text: 'Title', align: 'start', value: 'title' },
        { text: 'Category', value: 'category' },
        { text: 'Normal', value: 'price1' },
        { text: 'Promo', value: 'price2' },
        { text: 'Stock', value: 'stock' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
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
          stock: doc.data().stock,
          status: doc.data().status,
        });
      });
    });
  },
  methods: {
    editProduct (product) {
      router.push({ name: 'EditProduct', params: { id: product.key }})
    },
    deleteProduct (id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, your product posts will be deleted from the database!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          fb.firestore().collection('products').doc(id).delete().then(() => {
          }).catch((error) => {
            alert("Error removing document: ", error);
          });
          swal("Poof! Your product has been deleted!", {
            icon: "success",
          });
        } else {}
      }); 
    },
    // custom row
    getColor (stock) {
      if (stock <= 5) return 'red'
      else if (stock > 5) return 'green'
      else return 'white'
    },
    
  }
  
}
</script>

<style>
.cerbee {
   color: #ED1D32;
}
</style>
