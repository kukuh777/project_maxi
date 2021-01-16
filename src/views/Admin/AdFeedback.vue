<template>
   <div class="feedback">
      <h3 class="subheading grey--text">Feedback Page</h3>
      <!-- Table Start -->
      <v-data-table :headers="headers" :items="feedback" sort-by="" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Product List</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click.stop="editFeedback(item)">mdi-pencil</v-icon>
          <v-icon small @click.stop="deleteFeedback(item.key)">mdi-delete</v-icon>
        </template>
      </v-data-table> 
      <!-- Table End -->
   </div>
</template>

<script>
import {fb,db} from '../../firebase'
import router from '../../router'
export default {
name: 'feedback',
  data () {
    return {
      key: '',
      feed: {},
      feedback: [],
      ref: fb.firestore().collection('feedback'),
      headers: [

        { text: 'Name', align: 'start', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Topic', value: 'topic' },
        { text: 'Message', value: 'message' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  created () {
    this.ref.onSnapshot((querySnapshot) => {
      this.feedback = [];
      querySnapshot.forEach((doc) => {
        this.feedback.push({
          key: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          topic: doc.data().topic,
          status: doc.data().status,
          message: doc.data().message,
        });
      });
    });
  },
  methods: {
    editFeedback (feed) {
      router.push({ name: 'EditFeedback', params: { id: feed.key }})
    },
    deleteFeedback (id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, your user feedback posts will be deleted from the database!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          fb.firestore().collection('feedback').doc(id).delete().then(() => {
          }).catch((error) => {
            alert("Error removing document: ", error);
          });
          swal("Poof! Your user feedback has been deleted!", {
            icon: "success",
          });
        } else {}
      }); 
    },
    // custom row
    getColor (stock) {
      if (stock == 'Have not answered') return 'orange'
      else if (stock == 'Answered') return 'green'
      else return 'white'
    },
  }
}
</script>
