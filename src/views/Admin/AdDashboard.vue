<template>
  <div class="adcustomers">
    <h3 class="subheading grey--text">Your Profile Data</h3>
    
    <v-card outlined class="rounded-lg">
      <v-container fluid>
        <form @submit.prevent="updateProfile(profile)">
          <v-layout row wrap class="mx-1">
            <!-- left side -->
            <v-flex md12 class="mx-2 mb-n2">
               <v-layout>
                  <!-- Fisrtname -->
                  <v-flex md6>
                     <v-list-item>
                        <v-list-item-content>
                           <v-list-item-title class="overline">
                              Firstname
                           </v-list-item-title>
                           <v-text-field v-model="profile.firstname" required></v-text-field>
                        </v-list-item-content>
                     </v-list-item>
                  </v-flex>
                  <!-- Lastname -->
                  <v-flex md6>
                     <v-list-item>
                        <v-list-item-content>
                           <v-list-item-title class="overline">
                              Lastname
                           </v-list-item-title>
                           <v-text-field v-model="profile.lastname" required></v-text-field>
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
                      <v-text-field v-model="profile.phone_number" required></v-text-field>
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
                <!-- Product Images -->
                <!-- <v-flex md12 class="mx-2 mb-n2">
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
                            <div class="pa-1" outlined tile v-for="(image, index) in profile.image" :key="image">
                              <div class="img-wrap">
                                <v-img :src="profile.image" width="80px"></v-img>
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
                </v-flex> -->
                
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
                      <v-select v-model="profile.country" :items="country" required></v-select>
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
                                <v-text-field v-model="profile.city" required></v-text-field>
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
                                <v-text-field v-model="profile.postcode" type="number" required></v-text-field>
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
                      <v-text-field v-model="profile.street" required></v-text-field>
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
                      <v-textarea v-model="profile.addr_details" rows="1" required></v-textarea>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
              </v-layout>
            </v-flex>
            <!-- User Data Button -->
            <v-flex md12 class="mb-n2">
              <v-list-item>
                <v-list-item-content>
                  <v-btn type="submit" class="white--text" block color="#ED1D32">Update Data</v-btn>
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
      profile: {},
      profile: {
        image: [],
      },

      menu2: false,
      select: null,
      country: [
        'Indonesia',
      ],

    }
  },
  firestore(){
			const user = fb.auth().currentUser;
			return {
			profile: db.collection('admins').doc(user.uid),
			}
		},
  methods: {
    
    // submit event
    updateProfile(user) {
				//update data with user uid
				db.collection("admins").doc(user['.key']).update({
					firstname: this.profile.firstname,
					lastname: this.profile.lastname,
					name: this.profile.firstname + " " + this.profile.lastname,
					phone_number: this.profile.phone_number,
					date: this.profile.date,
					country: this.profile.country,
          postcode: this.profile.postcode,
          city: this.profile.city,
					street: this.profile.street,
					addr_details: this.profile.addr_details,
					// image: this.profile.image,
					status: 'admin',
				});
				console.log("sucess")
				swal("Good job!", "Your data has been saved!", "success");
      },
      // deleteImage(img,index) {
      //   let image = fb.storage().refFromURL(img);

      //   this.profile.image.splice(index,1);
      //   image.delete().then(function() {
      //     console.log('image deleted');
      //   }).catch(function(error) {
      //     console.log('an error occurred');
      //   });
      // },
      // uploadImage(e) {
			// 	// console.log(e[0]);
			// 	let file = e[0];
				
			// 	var storageRef = fb.storage().ref("images/admins/" + file.name);
			// 	let uploadTask = storageRef.put(file);
	
			// 	console.log(e[0]);
			// 	uploadTask.on('state_changed', (snapshot) => {
					
			// 	}, (error) => {
			// 		// Handle unsuccessful uploads
			// 	}, () => {
			// 		// Handle successful uploads on complete
			// 		// For instance, get the download URL: https://firebasestorage.googleapis.com/...
			// 		uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
			// 		this.image.push(downloadURL);
	
			// 		console.log('File available at', downloadURL);
			// 		});
			// 	});
			// },
  },
}
</script>

