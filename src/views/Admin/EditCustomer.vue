<template>
  <div class="adcustomers">
    <h3 class="subheading grey--text">Edit User Data</h3>
    
    <v-card outlined class="rounded-lg">
      <v-container fluid>
        <form @submit="onSubmit">
          <v-layout row wrap class="mx-1">
            <!-- left side -->
            <v-flex md12 class="mx-2 mb-n2">
               <v-layout>
                  <!-- Fullname -->
                  <v-flex md4>
                     <v-list-item>
                        <v-list-item-content>
                           <v-list-item-title class="overline">
                           Fullname
                           </v-list-item-title>
                           <v-text-field v-model="profile.name" :rules="[v => !!v || 'Fullname is required']" required></v-text-field>
                        </v-list-item-content>
                     </v-list-item>
                  </v-flex>
                  <!-- Fisrtname -->
                  <v-flex md4>
                     <v-list-item>
                        <v-list-item-content>
                           <v-list-item-title class="overline">
                              Firstname
                           </v-list-item-title>
                           <v-text-field v-model="profile.firstname" :rules="[v => !!v || 'Firstname is required']" required></v-text-field>
                        </v-list-item-content>
                     </v-list-item>
                  </v-flex>
                  <!-- Lastname -->
                  <v-flex md4>
                     <v-list-item>
                        <v-list-item-content>
                           <v-list-item-title class="overline">
                              Lastname
                           </v-list-item-title>
                           <v-text-field v-model="profile.lastname" :rules="[v => !!v || 'Lastname is required']" required></v-text-field>
                        </v-list-item-content>
                     </v-list-item>
                  </v-flex>
               </v-layout>
            </v-flex>
            <v-flex md6 >
              <v-layout row wrap>
                <!-- Phone Number -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Phone Number
                      </v-list-item-title>
                      <v-text-field v-model="profile.phone_number" :rules="[v => !!v || 'Phone number is required']" required></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                <!-- Article Date -->
                <v-flex md12 class="mx-2 mb-n4">
                <v-list-item>
                    <v-list-item-content>
                    <v-list-item-title class="overline">
                        Date
                    </v-list-item-title>
                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="profile.date" label="Picker the date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" required></v-text-field>
                        </template>
                        <v-date-picker v-model="profile.date" @input="menu2 = false"></v-date-picker>
                    </v-menu>
                    </v-list-item-content>
                </v-list-item>
                </v-flex>
                
              </v-layout>
            </v-flex>
            <!-- right side -->
            <v-flex md6>
              <v-layout row wrap>
                <!-- Country -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Country
                      </v-list-item-title>
                      <v-select v-model="profile.country" :items="country" :rules="[v => !!v || 'Country is required']" required></v-select>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                <v-flex md12 class="mx-2 mb-n2">
                    <v-layout>
                        <!-- City -->
                        <v-flex md8>
                            <v-list-item>
                                <v-list-item-content>
                                <v-list-item-title class="overline">
                                    City
                                </v-list-item-title>
                                <v-text-field v-model="profile.city" :rules="[v => !!v || 'City is required']" required></v-text-field>
                                </v-list-item-content>
                            </v-list-item>
                        </v-flex>
                        <!-- Postcode -->
                        <v-flex md4>
                            <v-list-item>
                                <v-list-item-content>
                                <v-list-item-title class="overline">
                                    Postcode
                                </v-list-item-title>
                                <v-text-field v-model="profile.postcode" type="number" :rules="[v => !!v || 'Postcode is required']" required></v-text-field>
                                </v-list-item-content>
                            </v-list-item>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <!-- Street -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Street
                      </v-list-item-title>
                      <v-text-field v-model="profile.street" :rules="[v => !!v || 'Street is required']" required></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                <!-- Street -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Details
                      </v-list-item-title>
                      <v-textarea v-model="profile.addr_details" rows="1" :rules="[v => !!v || 'details is required']" required></v-textarea>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
              </v-layout>
            </v-flex>
            <!-- User Data Button -->
            <v-flex md12 class="mb-n2">
              <v-list-item>
                <v-list-item-content>
                  <router-link to="/admin/customers">
                    <v-btn type="submit" class="grey--text" block color="default">Cancel</v-btn>
                  </router-link>
                </v-list-item-content>
              </v-list-item>
            </v-flex>
            <v-flex md12 class="mb-n2">
              <v-list-item>
                <v-list-item-content>
                  <v-btn type="submit" class="white--text" block color="#ED1D32">Update User Data</v-btn>
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

import {fb,db} from '../../firebase'
import router from '../../router'
import { VueEditor } from 'vue2-editor'
import swal from 'sweetalert'

export default {
  name: 'EditCustomer',
  components: {
    VueEditor
  },
  data () {
    return {
      key: this.$route.params.id,
      profile: {},

      menu2: false,
      select: null,
      country: [
        'Indonesia',
      ],

    }
  },
  created () {
    const ref = fb.firestore().collection('users').doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.profile = doc.data();
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
    
    // submit event
    onSubmit (evt) {
      evt.preventDefault()
      const updateRef = fb.firestore().collection('users').doc(this.$route.params.id);
      updateRef.set(this.profile).then((docRef) => {
        this.key = ''
        this.profile.fullname = ''
        this.profile.firstname = ''
        this.profile.lastname = ''
        this.profile.phone_number = ''
        this.profile.date = ''
        this.profile.country = ''
        this.profile.city = ''
        this.profile.postcode = ''
        this.profile.street = ''
        this.profile.addr_details = ''
        this.profile.status = ''
        
        // this.profile.phone_number = ''

    
        router.push({ name: 'customers', params: { id: this.$route.params.id }})
        // success update pop up
        swal({
          title: "Good job!",
          text: "Your article has been updated!",
          icon: "success",
        })
      })
      .catch((error) => {
        alert("Error adding document: ", error);
      });
      
    },
    // this.key = ''
    // this.profile.firstname = ''
    // this.profile.lastname = ''
    // this.proflie.phone_number = ''
    // this.profile.date = ''
    // this.profile.country = ''
    // this.profile.city = ''
    // this.profile.postcode = ''
    // this.profile.street = ''
    // this.profile.addr_details = ''
    // deleteImage(img,index) {
    //   let image = fb.storage().refFromURL(img);
    
    //   this.profile.images.splice(index,1);
    //   image.delete().then(function() {
    //     console.log('image deleted');
    //   }).catch(function(error) {
    //     console.log('an error occurred');
    //   });
    // },
    // uploadImage(e) {
    
    //     let file = e[0];
        
    //     var storageRef = fb.storage().ref("images/profiles/" + file.name);
    //     let uploadTask = storageRef.put(file);

    //     console.log(e[0]);
    //     uploadTask.on('state_changed', (snapshot) => {
            
    //     }, (error) => {
    //         // Handle unsuccessful uploads
    //     }, () => {
    //         // Handle successful uploads on complete
    //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //         this.profile.images.push(downloadURL);

    //         console.log('File available at', downloadURL);
    //         });
    //     });
 
    // },
    
  },
}
</script>
<style lang="scss" scoped>
// .img-wrap {
//   position: relative;
// }
// .img-wrap span.delete-img {
//   position: absolute;
//   top: -17px;
//   right: -13px;
// }
// .img-wrap span.delete-img:hover{
//   cursor: pointer;
// }
</style>

