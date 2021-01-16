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
                          <v-text-field v-model="product.title" :rules="Rules" :counter="10" required></v-text-field>
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
                          <v-radio-group v-model="product.condition" row :rules="[v => !!v || 'condition is required']" required>
                            <v-radio label="New" value="new" color="#ED1D32"></v-radio>
                            <v-radio label="Second" value="second" color="#ED1D32"></v-radio>
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
                          <vue-dropzone
                            ref="imgDropZone"
                            id="customdropzone"
                            :options="dropzoneOptions"
                            @vdropzone-complete="afterComplete"
                          ></vue-dropzone>
                          <div v-if="product.images.length > 0" class="image-div ma-n3" max-width="80px">
                            <div v-for="image in product.images" :key="image.src">
                              <img :src="image.src" class="image" />
                            </div>
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
                    <!-- Product Status -->
                    <v-flex md12 class="mx-2 mb-n2">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="overline">
                            Status
                          </v-list-item-title>
                          <v-radio-group v-model="product.status" row :rules="[v => !!v || 'Status is required']" required>
                            <v-radio label="Available" value="available" color="#ED1D32"></v-radio>
                            <v-radio label="Empty" value="empty" color="#ED1D32"></v-radio>
                          </v-radio-group>
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
                    <!-- Product Insurance -->
                    <v-flex md12 class="mx-2 mb-n2">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="overline">
                            Insurance
                          </v-list-item-title>
                          <v-radio-group v-model="product.insurance" row :rules="[v => !!v || 'Insurance is required']" required>
                            <v-radio label="Optional" value="optional" color="#ED1D32"></v-radio>
                            <v-radio label="Yes" value="yes" color="#ED1D32"></v-radio>
                          </v-radio-group>
                        </v-list-item-content>
                      </v-list-item>
                    </v-flex>

                  </v-layout>
                </v-flex>
                <!-- Product Button -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-btn type="submit" class="white--text" block color="#ED1D32">Add Product</v-btn>
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
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  }
</script>

<style>
.image-div {
  display: flex;
}
.image {
  max-width: 80px;
  margin: 5px;
}
</style>