<template>
  <div class="EditInvoice">
      <h3 class="subheading grey--text">Edit Invoice</h3>
      <v-card outlined class="rounded-lg">
      <v-container fluid>
        <form @submit="onSubmit">
          <v-layout row wrap class="mx-1">
            <!-- left side -->
            <v-flex md6 >
              <v-layout row wrap>
                <!-- Product Title -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Customer Name
                      </v-list-item-title>
                      <v-text-field v-model="order.name" required></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                <!-- Order Status -->
                <v-flex md12 class="mx-2 mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="overline">
                        Order Status
                      </v-list-item-title>
                      <v-select v-model="order.order_status" :items="status" :rules="[v => !!v || 'Category is required']" required></v-select>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                <v-flex md12 class="mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-btn @click="deleteInv()" type="submit" class="white--text" block color="#ED1D32">Delete</v-btn>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                <v-flex md12 class="mb-n2">
                  <v-list-item>
                    <v-list-item-content>
                      <v-btn type="submit" class="white--text" block color="primary">Update Invoice</v-btn>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
              </v-layout>
            </v-flex>
            <!-- right side -->
            <v-flex md6>
              <v-layout row wrap>
                <!-- Product Insurance -->
                <!-- <v-flex md12 class="mx-2 mb-n2">
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
                </v-flex> -->

              </v-layout>
            </v-flex>
            <!-- Product Button -->
            
          </v-layout>
      </form>
      
      </v-container>
    </v-card>
  </div>
</template>

<script>
import {fb,db} from '../../firebase'
import router from '../../router'
import swal from 'sweetalert'
export default {
   name: "EditInvoice",
	props: {
		msg: String
   },
   data() {
      return {
         key: this.$route.params.id,
         users: this.$route.params.users,
         order: {},
         status: [
            'waiting for payment',
            'waiting for delivery',
            'cancelled',
            'transaction complete'
         ]
      }
   },
   created () {
      const ref = fb.firestore().collection('users').doc(this.$route.params.users).collection('orders').doc(this.$route.params.id);
      ref.get().then((doc) => {
         if (doc.exists) {
         this.order = doc.data();
         } else {
         alert("No such document!");
         }
      });
   },
   methods: {
      onSubmit (evt) {
         evt.preventDefault()
        //  console.log(this.$route.params.users)
         const updateRef = fb.firestore().collection('users').doc(this.$route.params.users).collection('orders').doc(this.$route.params.id);
         updateRef.set(this.order).then((docRef) => {
            this.key = ''
            this.order.name = ''
            this.order.order_status = ''
            
            router.push({ name: 'invoice', params: { id: this.$route.params.id }})
            // success update pop up
            swal({
               title: "Good job!",
               text: "Your invoice has been updated!",
               icon: "success",
            })
         })
         .catch((error) => {
         alert("Error adding document: ", error);
         });
      },
      deleteInv() {
        // console.log(user_id)
        fb.firestore().collection('profiles').doc(this.$route.params.users).collection('orders').doc(this.$route.params.id).delete();
        swal({
          title: "Good job!",
          text: "Your invoice has been deleted!",
          icon: "success",
        })
        router.push({ name: 'invoice', params: { id: this.$route.params.id }})
      }
   }
}
</script>

<style>

</style>