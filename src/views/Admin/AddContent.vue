<template>
    <div class="adcontents">
      <h3 class="subheading grey--text">Add New Content</h3>
      <v-card outlined class="rounded-lg">
        <v-container fluid>

          <form  @submit.prevent="AddNewArticle">
            <v-layout row wrap class="mx-1">
              <!-- Left Side -->
              <v-flex md7>
                <v-layout row wrap>
                  <!-- Article Title -->
                  <v-flex md12 class="mx-2 mb-n2">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="overline mb-n2">
                          Title
                        </v-list-item-title>
                        <v-text-field v-model="article.title" :rules="titleRules" :counter="50" required></v-text-field>
                      </v-list-item-content>
                    </v-list-item>
                  </v-flex>
                  <!-- Article Author -->
                  <v-flex md12 class="mx-2 mb-n2">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="overline mb-n2">
                          Author
                        </v-list-item-title>
                        <v-text-field v-model="article.author" :rules="authorRules" :counter="20" required></v-text-field>
                      </v-list-item-content>
                    </v-list-item>
                  </v-flex>
                  <!-- Article Description -->
                  <v-flex md12 class="mx-2 mb-n2">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="overline ">
                          Descriptions
                        </v-list-item-title>
                        <vue-editor v-model="article.description" required></vue-editor>
                      </v-list-item-content>
                    </v-list-item>
                  </v-flex>
                  
                </v-layout>
              </v-flex>
              <!-- Right Side -->
              <v-flex md5>
                <v-layout row wrap>
                  <!-- Article Date -->
                  <v-flex md12 class="mx-2 mb-n4">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="overline">
                          Date
                        </v-list-item-title>
                        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="article.date" label="Picker the date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" required></v-text-field>
                          </template>
                          <v-date-picker v-model="article.date" @input="menu2 = false"></v-date-picker>
                        </v-menu>
                      </v-list-item-content>
                    </v-list-item>
                  </v-flex>
                  <!-- Article Tags -->
                  <v-flex md12 class="mx-2 mb-n2">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="overline mb-n2">
                          Tags
                        </v-list-item-title>
                        <v-combobox v-model="article.tags" :search-input.sync="search" hide-selected multiple persistent-hint small-chips></v-combobox>
                      </v-list-item-content>
                    </v-list-item>
                  </v-flex>
                  <!-- Article Images Cover -->
                  <v-flex md12 class="mx-2 mb-n2">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="overline mb-n2">
                          Cover Image
                        </v-list-item-title>
                        <v-file-input type="file" @change="uploadImage" multiple required></v-file-input>
                        <div>
                          <v-list-item-content class="mt-n5">
                            <v-list-item-title>
                              images:
                            </v-list-item-title>
                            <v-card class="d-flex flex-row mb-6" flat tile>
                              <div class="pa-1" outlined tile v-for="(image, index) in article.images" :key="image">
                                <div class="img-wrap">
                                  <v-img :src="image" width="200px"></v-img>
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
                </v-layout>
              </v-flex>
              <!-- Product Button -->
              <v-flex md12 class="mb-n2">
                <v-list-item>
                  <v-list-item-content>
                    <v-btn type="submit" class="white--text" block color="#ED1D32" :disabled="disable">Add Article</v-btn>
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
import {fb,db} from "../../firebase";
import { VueEditor, Quill } from "vue2-editor";
import swal from "sweetalert";

export default {
  name: "AddContent",
 
  components: {
    VueEditor,Quill
  },
  props: {
    msg: String
  },
  data() {
    return {
      disable: true,
      menu2: false,
      valid: false,
      article: {
        title: '',
        description: '',
        author: '',
        date: new Date().toLocaleDateString('in-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        tags: [],
        images: [],
      },
      // RULES START
      titleRules: [
        v => !!v || 'Title is required',
        v => v.length <= 50 || 'Title must be less than 50 characters',
      ],
      authorRules: [
        v => !!v || 'Author name is required',
        v => v.length <= 20 || 'Author name must be less than 20 characters',
      ],
      // RULES END
      // TAGS START
      search: null,
      // TAGS END
    }
  },
  methods: {
    deleteImage(img,index) {
      let image = fb.storage().refFromURL(img);

      this.article.images.splice(index,1);
      image.delete().then(function() {
        console.log('image deleted');
      }).catch(function(error) {
        console.log('an error occurred');
      });
    },
    uploadImage(e) {
    
        let file = e[0];
        
        var storageRef = fb.storage().ref("images/articles/" + file.name);
        let uploadTask = storageRef.put(file);

        console.log(e[0]);
        uploadTask.on('state_changed', (snapshot) => {
            
        }, (error) => {
            // Handle unsuccessful uploads
        }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.article.images.push(downloadURL);
            this.disable = false,   
            console.log('File available at', downloadURL);
            });
        });
    
    },
    AddNewArticle() {
      db.collection("articles").add(this.article)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        this.reset();
        swal({
          title: "Article added successfully!",
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
    

  },
 

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
