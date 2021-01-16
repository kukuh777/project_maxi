<template>
  <div class="adproducts">
    <h3 class="subheading grey--text">Add New Product</h3>
    
    <v-card outlined class="rounded-lg">
      <v-container fluid>
        <form @submit.prevent="AddNewProduct">
          <v-layout row wrap class="mx-1">
            <!-- left side -->
            <v-flex md6 >
              <v-layout row wrap>
                <!-- Product Title -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Product Title
                      </v-list-item-title>
                      <v-text-field v-model="product.title" :rules="Rules" :counter="50" required></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                <!-- Product Category -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Category
                      </v-list-item-title>
                      <v-select v-model="product.category" :items="ctg" :rules="[v => !!v || 'Category is required']" required></v-select>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                <!-- Product Brands -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Brands
                      </v-list-item-title>
                      <v-select v-model="product.brands" :items="brand" :rules="[v => !!v || 'Brands is required']" required></v-select>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                <!-- Product Condition -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Condition
                      </v-list-item-title>
                      <v-radio-group class="ml-2" v-model="product.condition" row :rules="[v => !!v || 'condition is required']" required>
                        <v-radio label="New" value="new" color="#ED1D32"></v-radio>
                        <v-radio label="Second" value="second" color="#ED1D32"></v-radio>
                      </v-radio-group>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                <!-- Product Status -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Status
                      </v-list-item-title>
                      <v-radio-group class="ml-2" v-model="product.status" row :rules="[v => !!v || 'Status is required']" required>
                        <v-radio label="Available" value="available" color="#ED1D32"></v-radio>
                        <v-radio label="Empty" value="empty" color="#ED1D32"></v-radio>
                      </v-radio-group>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                <!-- Product Descriptions -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Descriptions
                      </v-list-item-title>
                      <vue-editor v-model="product.description" required></vue-editor>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                
              </v-layout>
            </v-flex>
            <!-- right side -->
            <v-flex md6>
              <v-layout row wrap>
                <!-- Product Images -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Upload Image
                      </v-list-item-title>
                      <v-file-input type="file" @change="uploadImage" label="File input" multiple required></v-file-input>
                      <div>
                        <v-list-item-content class="mt-n5">
                          <v-list-item-title>
                            images:
                          </v-list-item-title>
                          <v-card md3 class="d-flex flex-row mb-6" flat tile>
                            <div class="pa-1" outlined tile v-for="(image, index) in product.images" :key="image">
                              <div class="img-wrap">
                                <v-img :src="image" width="80px"></v-img>
                                <span class="delete-img" @click="deleteImage(image,index)">
                                  <v-icon>mdi-close-circle</v-icon>
                                </span>
                              </div>
                            </div>
                          </v-card>
                        </v-list-item-content>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                <!-- Product Order -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Minimal Order
                      </v-list-item-title>
                      <v-text-field v-model="product.order" type="number" min="1" :rules="[v => !!v || 'Minimal order is required']" required></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                <!-- Normal Price -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Normal Price
                      </v-list-item-title>
                      <v-text-field v-model="product.price1" min="50" label="Amount" type="number" value="1000000" prefix="Rp" :rules="[v => !!v || 'Normal price is required']" required></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                <!-- Promo Price -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Promo Price
                      </v-list-item-title>
                      <v-text-field v-model="product.price2" min="50" label="Amount" type="number" value="1000000" prefix="Rp" :rules="[v => !!v || 'Promo price is required']" required></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                <!-- Product Stock -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Stock
                      </v-list-item-title>
                      <v-text-field v-model="product.stock" type="number" min="1" :rules="[v => !!v || 'Stock is required']" required></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                
                <!-- Product Weight -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Weight
                      </v-list-item-title>
                      <v-text-field v-model="product.weight" type="number" label="in Gram" min="1" :rules="[v => !!v || 'Weight is required']" required></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                <!-- Product Sell -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Sell
                      </v-list-item-title>
                      <v-checkbox v-model="product.top_selling" value="top selling" class="mx-2" label="Top Selling"></v-checkbox>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                <!-- Product Insurance -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Insurance
                      </v-list-item-title>
                      <v-radio-group class="ml-2" v-model="product.insurance" row :rules="[v => !!v || 'Insurance is required']" required>
                        <v-radio label="Optional" value="optional" color="#ED1D32"></v-radio>
                        <v-radio label="Yes" value="yes" color="#ED1D32"></v-radio>
                      </v-radio-group>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>

              </v-layout>
            </v-flex>
            <!-- Product Button -->
            <v-flex md12 class="mb-n2">
              <v-list-item>
                <v-list-item-content>
                  <v-btn type="submit" class="white--text" block color="#ED1D32" :disabled="disable">Add Product</v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-flex>
          </v-layout>
      </form>
      </v-container>
    </v-card>
  </div>

</template>

<script>

import {fb, db} from "../../firebase";
import router from '../../router';
import { VueEditor } from "vue2-editor";
import swal from "sweetalert";

export default {
  name: "AddProduct",
  components: {
    VueEditor
  },
  props: {
    msg: String
  },
  data() {
    return {
      
      valid: false,
      disable: true,
      product: {
        title: '',
        category: null,
        brands: null,
        condition: null,
        description: '',
        images: [],
        order: '',
        price1: null,
        price2: null,
        stock: '',
        status: null,
        weight: '',
        insurance: null,
        top_selling: null,
        timestamp: new Date()
      },
      // start title
      Rules: [
        v => !!v || 'Product title is required',
        v => v.length <= 50 || 'Title must be less than 50 characters',
      ],
      //end title
      // start desc

      // end desc
      // start select
      select: null,
      ctg: [
        'Accessories',
        'Cables','Cases','Chargers','PC','Connectors','Converters',
        'Gamepads',
        'Inks',
        'Harddisks','Headsets',
        'Joysticks',
        'Keyboards',
        'Laptops',
        'Monitors','Motherboards','Mouses','Mousepads',
        'Pointers','Power Supplies','Printers','Projectors','Processors',
        'RAM',
        'Speakers','SSD',
        'TV Tuners',
        'VGA',
        'Etc.',
      ],
      brand: [
        'Acer','Adata','AMD','AsRock','Asus',
        'Canon','Cooler Master','Corsair',
        'Dazumba','Deepcool','Dell',
        'Epson',
        'Fantech',
        'Gigabyte',
        'HP',
        'Intel',
        'Kingston',
        'Lenovo','LG','Logitech',
        'MSI',
        'Rexus',
        'Samsung','Sandisk','Simbadda',
        'Transcend',
        'V-Gen',
        'Western Digital',
        'Zotac',
        'Etc.',
      ],
      // end select
    }
  },
  firestore() {
    return {
      products: db.collection('products'),
    }
  },

  methods: {
    deleteImage(img,index) {
      let image = fb.storage().refFromURL(img);

      this.product.images.splice(index,1);
      image.delete().then(function() {
        console.log('image deleted');
      }).catch(function(error) {
        console.log('an error occurred');
      });
    },
    uploadImage(e) {
      // console.log(e[0]);
      if(e[0]) {
        let file = e[0];
        
        var storageRef = fb.storage().ref("images/products/" + file.name);
        let uploadTask = storageRef.put(file);

        console.log(e[0]);
        uploadTask.on('state_changed', (snapshot) => {
            
        }, (error) => {
            // Handle unsuccessful uploads
        }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.product.images.push(downloadURL);
            this.disable = false,
            console.log('File available at', downloadURL);
            });
        });
      }
    },
    AddNewProduct() {
      db.collection("products").add(this.product)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        this.reset();
        swal({
          title: "Product added successfully!",
          icon: "success",
          button: "OK",
        });
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      }); 
    },
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
    
  }
}
</script>
<style lang="scss" scoped>
.img-wrap {
  position: relative;
}
.img-wrap span.delete-img {
  position: absolute;
  top: -17px;
  right: -13px;
}
.img-wrap span.delete-img:hover{
  cursor: pointer;
}
</style>
