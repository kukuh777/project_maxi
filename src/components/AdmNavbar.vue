<template>
   <nav>
      <v-app-bar flat app>
         <v-app-bar-nav-icon color="#ED1D32" class="" @click="drawer = !drawer"><v-icon>mdi-menu</v-icon></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase">
               <span class="font-weight-light cerbee">Maxi</span>
               <span class="cerbee"> Komputer</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn icon>
               <v-icon color="#ED1D32">mdi-dots-vertical</v-icon>
            </v-btn>
            <v-btn text color="#ED1D32" class="hidden-sm-and-down" @click="logout">
               <span>Sign Out</span>
               <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
         </v-app-bar>

      <v-navigation-drawer app v-model="drawer" color="#ED1D32">
         <v-layout column align-center>
            <v-flex class="mt-5">
               <v-avatar size="100">
                  <v-img :src="profile.image" alt=""></v-img>
               </v-avatar>
            </v-flex>
            <v-flex>
               <p text-center class="white--text subheading mt-2">
                  {{profile.firstname}} {{profile.lastname}}
               </p>
            </v-flex>
         </v-layout>
         <v-list>
            <template v-for="link in links">
               <v-subheader class="white--text" v-if="link.header" :key="link.header" > {{ link.header }} </v-subheader>
               <v-list-item v-else :key="link.title" ripple router :to="link.route" >
                  <v-list-item-action>
                     <v-icon class="white--text" v-html="link.icon"></v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                     <v-list-item-title class="white--text" v-html="link.title"></v-list-item-title>
                  </v-list-item-content>
               </v-list-item>
            </template>
            <template>
               <a @click="logout">
               <v-list-item class="hidden-md-and-up">
                  <v-list-item-action>
                     <v-icon class="white--text">mdi-exit-to-app</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                     <v-list-item-title class="white--text">Logout</v-list-item-title>
                  </v-list-item-content>
               </v-list-item>
               </a>
            </template>
         </v-list>
      </v-navigation-drawer>


   </nav>
</template>

<script>
import {fb,db} from '../firebase'

export default {
   data() {
      return {
         profile: {},
         drawer: false,
         links: [
          { icon: 'mdi-view-dashboard', title: 'Dashboard', route: '/admin/dashboard' },
          { icon: 'mdi-account-multiple', title: 'Customers', route: '/admin/customers' },
          { icon: 'mdi-clipboard-arrow-down', title: 'Invoice', route: '/admin/invoice'},
          {
            header: 'Store',
          },
          { icon: 'mdi-dropbox', title: 'Products', route: '/admin/products' },
          { icon: 'mdi-tag-multiple', title: 'Catalog', route: '/admin/catalog'},
          { icon: 'mdi-content-duplicate', title: 'Contents', route: '/admin/contents' },
          { icon: 'mdi-backburger', title: 'Feedback', route: '/admin/feedback' },
          
         //  { icon: 'mdi-tag', title: 'Brands', route: '/admin/brands' },
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
      logout() {
      swal({
        title: "Are you sure to logout?",
        text: "If you press OK, you will exit from your account!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      //2 kondisi sebelum log out
      .then((willDelete) => {
        if (willDelete) {
          fb.auth().signOut()
            .then(() => {
              this.$router.replace('/signin')
            })
          .catch((err) => {
              console.log(err);
          });
          swal("Your account has been successfully logged out!", {
            icon: "success",
            
          });
        } else {
          //not showing anything
        }
      });
    }
   }
}
</script>

<style>
.cerbee {
   color: #ED1D32;
}
</style>