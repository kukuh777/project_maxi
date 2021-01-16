<template>
   <div class="uk-card uk-card-default uk-card-small tm-ignore-container" uk-sticky="offset: 90; bottom: true; media: @m;">
      <div class="uk-card-header">
         <div class="uk-grid-small uk-child-width-1-1" uk-grid>
            <section>
               <div class="uk-width-1-3 uk-width-1-4@s uk-width-1-2@m uk-margin-auto uk-visible-toggle uk-position-relative uk-border-circle uk-overflow-hidden uk-light">
                  <img class="uk-width-1-1" :src="profile.image">
               </div>
            </section>
            <div class="uk-text-center">
               <div class="uk-h4 uk-margin-remove">{{profile.firstname}} {{profile.lastname}}</div>
               <div class="uk-text-meta">Joined {{profile.time}}</div>
            </div>
            <div>
               <div class="uk-grid-small uk-flex-center" uk-grid>
                  <div> <a class="uk-button uk-button-default uk-button-small" href="/personal"><span class="uk-margin-xsmall-right" uk-icon="icon: settings; ratio: .75;"></span><span>Personal</span></a>
                  </div>
                  <div>
                     <button @click="logout" class="uk-button uk-button-default uk-button-small" href="#" title="Log out"><span uk-icon="icon: sign-out; ratio: .75;"></span>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div>
         <nav>
            <ul class="uk-nav uk-nav-default tm-nav">
               <li  class="uk-active"> <a>Orders <span>({{ order }})</span></a>
               </li>
               <li> <a href="/favorites">Favorites <span>({{ this.$store.getters.totalFavorite }})</span></a>
               </li>
               <li> <a href="/settings">Settings</a>
               </li>
            </ul>
         </nav>
      </div>
   </div>
</template>

<script>
import {fb,db} from "../firebase";

export default {
name: "user-profile",
   props: {
      msg: String
   },
   data() {
      return {
         order: '',
         profile: {}
      }
   },
   firestore(){
      const user = fb.auth().currentUser;
      return {
         profile: db.collection('users').doc(user.uid),
      }
   },
   mounted() {
    if(localStorage.order) this.order = localStorage.order;
  },
   methods: {
   //logout methods
      logout() {
         swal({
            title: "Are you sure to logout?",
            text: "If you press OK, you will exit from your account!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
         })
         //2 condition before log out
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
      },
   }
}
</script>

<style>

</style>