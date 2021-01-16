<template>
    <div class="adcategory">
      <h3 class="subheading grey--text">Catalog Page</h3>
      <v-container fluid>
        
          <v-layout>
            <!-- Tables Catalogs -->
            <!-- <v-flex md6 class="mx-2">

            </v-flex> -->
            <!-- Tables Ctaegories -->
            <v-flex md6 class="mx-2">
              <!-- Table Start -->
              <v-data-table :headers="CategoryHeaders" :items="categories" :items-per-page="5" sort-by="title" class="elevation-1">
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <v-toolbar-title>Category List</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <router-link to="/admin/add-category">
                      <v-btn color="primary" dark class="mb-2">New</v-btn>
                    </router-link>
                  </v-toolbar>
                </template>
                <template v-slot:item.price="{ item }">
                  {{ item.price | currency('Rp ', 0, { thousandsSeparator: '.' }) }}
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click.stop="editCategory(item)">mdi-pencil</v-icon>
                  <v-icon small @click.stop="deleteCategory(item.CategoryKey)">mdi-delete</v-icon>
                </template>
              </v-data-table> 
              <!-- Table End -->
            </v-flex>
            <!-- Tables brands -->
            <v-flex md6 class="mx-2">
              <!-- Table Start -->
              <v-data-table :headers="BrandHeaders" :items="brands" :items-per-page="5" sort-by="title" class="elevation-1">
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <v-toolbar-title>Brand List</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <router-link to="/admin/add-brand">
                      <v-btn color="primary" dark class="mb-2">New</v-btn>
                    </router-link>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click.stop="editBrand(item)">mdi-pencil</v-icon>
                  <v-icon small @click.stop="deleteBrand(item.BrandKey)">mdi-delete</v-icon>
                </template>
              </v-data-table> 
              <!-- Table End -->
            </v-flex>
          </v-layout>
        
      </v-container>
       
    </div>

</template>

<script>
import {fb,db} from "../../firebase"
import router from '../../router'

export default {
  name: "AdCategory",
  props: {
    msg: String
  },
    data() {
      return {
        CategoryKey: '',
        BrandKey: '',
        // Category
        categories: [],
        ref2: fb.firestore().collection('categories'),
        CategoryHeaders: [
          { text: 'Title', align: 'start', value: 'title' },
          { text: 'Price', value: 'price' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        
        brands: [],
        ref3: fb.firestore().collection('brands'),
        BrandHeaders: [
          { text: 'Title', align: 'start', value: 'title' },
          { text: 'Descriptions', value: 'descriptions' },
          { text: 'Actions', align: 'end', value: 'actions', sortable: false },
        ],
      }
    },
    created () {
      this.ref2.onSnapshot((querySnapshot) => {
        this.categories = [];
        querySnapshot.forEach((doc) => {
          this.categories.push({
            CategoryKey: doc.id,
            title: doc.data().title,
            price: doc.data().price,
          });
        });
      });
      this.ref3.onSnapshot((querySnapshot) => {
        this.brands = [];
        querySnapshot.forEach((doc) => {
          this.brands.push({
            BrandKey: doc.id,
            title: doc.data().title,
            descriptions: doc.data().descriptions,
          });
        });
      });
    },
    
    methods: {
      // Start Category
      editCategory (category) {
        router.push({ name: 'EditCategory', params: { id: category.CategoryKey }})
      },
      deleteCategory (id) {
        swal({
          title: "Are you sure?",
          text: "Once deleted, your category posts will be deleted from the database!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            fb.firestore().collection('categories').doc(id).delete().then(() => {
            }).catch((error) => {
              alert("Error removing document: ", error);
            });
            swal("Poof! Your category has been deleted!", {
              icon: "success",
            });
          } else {}
        });  
      },
      deleteImage(img,index) {
        let image = fb.storage().refFromURL(img);

        this.category.images.splice(index,1);
        image.delete().then(function() {
          console.log('image deleted');
        }).catch(function(error) {
          console.log('an error occurred');
        });
      },
      // End Category
      // Start Brand
      editBrand (brand) {
        router.push({ name: 'EditBrand', params: { id: brand.BrandKey }})
      },
      deleteBrand (id) {
        swal({
          title: "Are you sure?",
          text: "Once deleted, your brand posts will be deleted from the database!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            fb.firestore().collection('brands').doc(id).delete().then(() => {
            }).catch((error) => {
              alert("Error removing document: ", error);
            });
            swal("Poof! Your brand has been deleted!", {
              icon: "success",
            });
          } else {}
        });   
      },
      // End Brand
    }

};
</script>
<style scoped lang="scss">
.img-wrap {
  position: relative;
}
.img-wrap span.delete-img {
  position: absolute;
  top: -15px;
  right: -7px;
}
.img-wrap span.delete-img:hover{
  cursor: pointer;
}
</style>
