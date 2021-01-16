<template>
    <div class="adcustomers">
        <h3 class="subheading grey--text">Content Page</h3>

        <!-- Table Start -->
        <v-data-table :headers="headers" :items="profiles" sort-by="" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Customer List</v-toolbar-title>
              <v-spacer></v-spacer>
              <!-- <router-link to="/admin/add-content">
                <v-btn color="primary" dark class="mb-2">New Article</v-btn>
              </router-link> -->
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click.stop="editCustomer(item)">mdi-pencil</v-icon>
            <v-icon small @click.stop="deleteCustomer(item.key)">mdi-delete</v-icon>
          </template>
        </v-data-table> 
        <!-- Table End -->
    </div>

</template>

<script>
import {fb,db} from '../../firebase'
import router from '../../router'

export default {
  name: "customers",
  props: {
    msg: String
  },
  data () {
    return {
      key: '',
      expanded: [],
        singleExpand: false,
      profile: {},
      profiles: [],
      ref: fb.firestore().collection('users'),
      headers: [

        { text: 'Name', align: 'start', value: 'name'},
        { text: 'Phone', value: 'phone_number' },
        { text: 'Date', value: 'date' },
        { text: 'Address', value: 'addr_details' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  created () {
    this.ref.onSnapshot((querySnapshot) => {
      this.profiles = [];
      querySnapshot.forEach((doc) => {
        this.profiles.push({
          key: doc.id,
          name: doc.data().name,
          phone_number: doc.data().phone_number,
          date: doc.data().date,
          addr_details: doc.data().addr_details,
          status: doc.data().status,
        });
      });
    });
  },
  methods: {
    editCustomer (profile) {
      router.push({ name: 'EditCustomer', params: { id: profile.key }})
    },
    deleteCustomer (id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, your user data will be deleted from the database!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          fb.firestore().collection('users').doc(id).delete().then(() => {
          }).catch((error) => {
            alert("Error removing document: ", error);
          });
          swal("Poof! Your user data has been deleted!", {
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
