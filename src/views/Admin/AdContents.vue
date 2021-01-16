<template>
  <div class="AdContents">
    <h3 class="subheading grey--text">Content Page</h3>

      <!-- Table Start -->
      <v-data-table :headers="headers" :items="articles" sort-by="" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Article List</v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link to="/admin/add-content">
              <v-btn color="primary" dark class="mb-2">New Article</v-btn>
            </router-link>
          </v-toolbar>
        </template>
        <template v-slot:item.tags="{ item }">
          <span >{{ item.tags | join(', ')  }}</span>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click.stop="editArticle(item)">mdi-pencil</v-icon>
          <v-icon small @click.stop="deleteArticle(item.key)">mdi-delete</v-icon>
        </template>
      </v-data-table> 
      <!-- Table End -->

  </div>
</template>

<script>

import {fb,db} from '../../firebase'
import router from '../../router'

export default {
  name: 'contents',
  data () {
    return {
      key: '',
      article: {},
      articles: [],
      ref: fb.firestore().collection('articles'),
      headers: [

        { text: 'Title', align: 'start', value: 'title' },
        { text: 'Author', value: 'author' },
        { text: 'Date', value: 'date' },
        { text: 'Tags', value: 'tags' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

    }
  },

  created () {
    this.ref.onSnapshot((querySnapshot) => {
      this.articles = [];
      querySnapshot.forEach((doc) => {
        this.articles.push({
          key: doc.id,
          title: doc.data().title,
          author: doc.data().author,
          date: doc.data().date,
          tags: doc.data().tags
        });
      });
    });
  },
  methods: {
    editArticle (article) {
      router.push({ name: 'EditContent', params: { id: article.key }})
    },
    deleteArticle (id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, your article posts will be deleted from the database!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          fb.firestore().collection('articles').doc(id).delete().then(() => {
          }).catch((error) => {
            alert("Error removing document: ", error);
          });
          swal("Poof! Your article has been deleted!", {
            icon: "success",
          });
        } else {}
      });  
    },
  }

}
</script>

<style>
  /* .table {
    width: 96%;
    margin: 0 auto;
  } */
</style>
