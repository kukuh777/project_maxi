<template>
    <div class="adbrands">
      <h3 class="subheading grey--text">Brands Page</h3>
      <v-container fluid>
        
          <v-layout>
            <v-flex md6 class="mx-2">
              <v-card outlined class="rounded-lg">
                <v-form @submit.prevent="AddNewBrand">
                  <v-layout row wrap class="px-4 py-2">
                    <!-- Brands Title -->
                    <v-flex md12 class="px-n1">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="overline">
                            Brands Title
                          </v-list-item-title>
                          <v-text-field v-model="brand.title" :rules="titleRules" :counter="20" required></v-text-field>
                        </v-list-item-content>
                      </v-list-item>
                    </v-flex>
                    <!-- Brands Descriptions -->
                    <v-flex md12 class="px-n1">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="overline">
                            Descriptions
                          </v-list-item-title>
                          <v-text-field v-model="brand.descriptions" :rules="descRules" :counter="50" required></v-text-field>
                        </v-list-item-content>
                      </v-list-item>
                    </v-flex>
                    <!-- Brands Images -->
                    <v-flex md12 class="px-n1">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="overline">
                            Brands Images
                          </v-list-item-title>
                          <v-file-input type="file" @change="uploadImage" label="File input" multiple required></v-file-input>
                          <div>
                            <v-list-item-content class="mt-n5">
                              <v-list-item-title>
                                images:
                              </v-list-item-title>
                              <v-card class="d-flex flex-row mb-6" flat tile>
                                <div class="pa-1" outlined tile v-for="(image, index) in brand.images" :key="image">
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
                    <!-- Product Button -->
                    <v-flex md12 class="mb-n2">
                      <v-list-item>
                        <v-list-item-content>
                          <v-btn type="submit" class="white--text" block color="#ED1D32" :disabled="disable">Add Category</v-btn>
                        </v-list-item-content>
                      </v-list-item>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card>
            </v-flex>
          </v-layout>
        
      </v-container>
    </div>

</template>

<script>
import {fb,db} from "../../firebase"
import router from '../../router'

export default {
  name: "add-brands",
  props: {
    msg: String
  },
  data() {
    return {
      valid: false,
      disable: true,
      brand: {
        title: '',
        descriptions: '',
        images: [],
      },
      // Rules
      titleRules: [
        v => !!v || 'Title is required',
        v => (v && v.length <= 20) || 'Title must be less than 20 characters',
      ],
      descRules: [
        v => !!v || 'Descriptions is required',
        v => (v && v.length <= 50) || 'Descriptions must be less than 50 characters',
      ]
    }
  },
  methods: {
    deleteImage(img,index) {
      let image = fb.storage().refFromURL(img);

      this.brand.images.splice(index,1);
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
        
        var storageRef = fb.storage().ref("images/brands/" + file.name);
        let uploadTask = storageRef.put(file);

        console.log(e[0]);
        uploadTask.on('state_changed', (snapshot) => {
            
        }, (error) => {
            // Handle unsuccessful uploads
        }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.brand.images.push(downloadURL);
            this.disable = false;
            console.log('File available at', downloadURL);
            });
        });
      }
    },
    AddNewBrand() {
      db.collection("brands").add(this.brand)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        this.reset();
        swal({
          title: "Brand added successfully!",
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
    editBrand (brand) {
      router.push({ name: 'EditBrand', params: { id: brand.key }})
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
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
