<template>
    <v-app class="grey lighten-4">
        <AdmNavbar />
        <div class="mx-4 mb-4">
            <router-view />
        </div>
        
    </v-app>
</template>

<script>
// @ is an alias to /src
import AdmNavbar from "@/components/AdmNavbar"

import {fb} from "../firebase";

export default {
  name: "Admin",
  components: {
      AdmNavbar
  },
  data() {
    return {

    }
  },
  methods: {
    //   closeMenu() {
    //     $("body").toggleClass("sidebar-toggled"), $(".sidebar").toggleClass("toggled"), $(".sidebar").hasClass("toggled")
    //   },
    //   closeMenuTop() {
    //     $("body").toggleClass("sidebar-toggled"), $(".sidebar").toggleClass("toggled"), $(".sidebar").hasClass("toggled")
    //   },
    //   logout() {
    //       fb.auth().signOut()
          
    //       .catch((err) => {
    //           console.log(err);
    //       });
    //   }
  }
};
</script>

