<template>
  <div>
    <header>
   <div class="uk-navbar-container uk-light uk-visible@m tm-toolbar-container">
          <div class="uk-container" uk-navbar>
            <div class="uk-navbar-left">
              <nav>
                <ul class="uk-navbar-nav">
                    <li>
                      <a href="/contacts" onclick="return false">
                          <span class="uk-margin-xsmall-right" uk-icon="icon: receiver; ratio: .75;"></span>
                          <span class="tm-pseudo">{{ maxi.call }}</span>
                          <span uk-icon="icon: triangle-down; ratio: .75;"></span>
                      </a>
                      <div class="uk-margin-remove" uk-drop="mode: click; pos: bottom-center;">
                          <div class="uk-card uk-card-default uk-card-small uk-box-shadow-xlarge uk-overflow-hidden uk-padding-small uk-padding-remove-horizontal uk-padding-remove-bottom">
                              <div class="uk-card-body">
                                  <div class="uk-text-small">
                                      <div class="uk-text-bolder">Contact Number</div>
                                      <div>{{ maxi.call }}</div>
                                      <div>{{ maxi.whatsapp }}</div>
                                  </div>
                              </div>
                          </div>
                      </div>		
                    </li>
                    <li>
                        <a href="/contacts" onclick="return false">
                        <span class="uk-margin-xsmall-right" uk-icon="icon: location; ratio: .75;"></span>
                        <span class="tm-pseudo">{{ maxi.address1 }}</span>
                        <span uk-icon="icon: triangle-down; ratio: .75;"></span>
                        </a>
                        <div class="uk-margin-remove" uk-drop="mode: click; pos: bottom-center;">
                            <div class="uk-card uk-card-default uk-card-small uk-box-shadow-xlarge uk-overflow-hidden uk-padding-small uk-padding-remove-horizontal uk-padding-remove-bottom">
                                <div class="uk-card-body">
                                    <div class="uk-text-small">
                                        <div class="uk-text-bolder">{{ maxi.name }}</div>
                                        <div>{{ maxi.address3 }}</div>
                                    </div>
                                    <div class="uk-margin-small">
                                        <a class="uk-link-muted uk-text-uppercase tm-link-to-all uk-link-reset" href="/contacts"><span>contacts</span><span uk-icon="icon: chevron-right; ratio: .75;"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <a href="/contacts" onclick="return false">
                            <span class="uk-margin-xsmall-right" uk-icon="icon: clock; ratio: .75;"></span>
                            <span class="tm-pseudo">{{ maxi.time }}</span>
                            <span uk-icon="icon: triangle-down; ratio: .75;"></span>
                        </a>
                        <div class="uk-margin-remove" uk-drop="mode: click; pos: bottom-center;">
                            <div class="uk-card uk-card-default uk-card-small uk-box-shadow-xlarge uk-overflow-hidden uk-padding-small uk-padding-remove-horizontal uk-padding-remove-bottom">
                                <div class="uk-card-body">
                                    <div class="uk-text-small">
                                        <div class="uk-text-bolder">Daily Open At</div>
                                        <div>{{ maxi.time1 }}</div>
                                        <div>{{ maxi.time2 }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>		
                    </li>
                </ul>
              </nav>
            </div>
            <div class="uk-navbar-right">
              <nav>
                <ul class="uk-navbar-nav">
                  <li>
                    <router-link to="/faq">FAQ
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/delivery">Delivery
                    </router-link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div class="uk-navbar-container tm-navbar-container" uk-sticky="cls-active: tm-navbar-container-fixed">
          <div class="uk-container" uk-navbar>
            <div class="uk-navbar-left">
              <button class="uk-navbar-toggle uk-hidden@m" uk-toggle="target: #nav-offcanvas" uk-navbar-toggle-icon>
              </button>
              <router-link class="uk-navbar-item uk-logo" to="/">
                <img src="images/logo.svg" width="90" height="32" alt="Logo">
              </router-link>
              <nav class="uk-visible@m">
                <ul class="uk-navbar-nav">
                  <li>
                    <router-link to="/catalog">Catalog
                      <span class="uk-margin-xsmall-left" uk-icon="icon: chevron-down; ratio: .75;">
                      </span>
                    </router-link>
                    <div class="uk-navbar-dropdown uk-margin-remove uk-padding-remove-vertical" uk-drop="pos: bottom-justify;delay-show: 125;delay-hide: 50;duration: 75;boundary: .tm-navbar-container;boundary-align: true;pos: bottom-justify;flip: x">
                      <div class="uk-container">
                        <ul class="uk-navbar-dropdown-grid uk-child-width-1-5" uk-grid>
                          <!-- Start Catalog -->
                          <li v-for="catalog in maxi.catalogs" :key="catalog.title">
                            <div class="uk-margin-top uk-margin-bottom">
                              <router-link class="uk-link-reset" to="/category">
                                <img class="uk-display-block uk-margin-auto uk-margin-bottom" :src="catalog.src" :alt="catalog.title" width="80" height="80">
                                <div class="uk-text-bolder uk-text-center uk-text-capitalize">{{catalog.title}}
                                </div>
                              </router-link>
                              <ul class="uk-nav uk-nav-default">
                                <li>
                                  <a class="uk-text-capitalize">{{catalog.sub1}}
                                  </a>
                                </li>
                                <li>
                                  <a class="uk-text-capitalize">{{catalog.sub2}}
                                  </a>
                                </li>
                                <li>
                                  <a class="uk-text-capitalize">{{catalog.sub3}}
                                  </a>
                                </li>
                                <li>
                                  <a class="uk-text-capitalize">{{catalog.sub4}}
                                  </a>
                                </li>
                                <li>
                                  <a class="uk-text-capitalize">{{catalog.sub5}}
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <!-- End Catalog -->
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <router-link to="/brands">Brands
                      <span class="uk-margin-xsmall-left" uk-icon="icon: chevron-down; ratio: .75;">
                      </span>
                    </router-link>
                    <div class="uk-navbar-dropdown uk-margin-remove uk-padding-remove-vertical" uk-drop="pos: bottom-justify;delay-show: 125;delay-hide: 50;duration: 75;boundary: .tm-navbar-container;boundary-align: true;pos: bottom-justify;flip: x">
                      <div class="uk-container uk-container-small uk-margin-top uk-margin-bottom">
                        <ul  class="uk-grid-small uk-child-width-1-6" uk-grid>
                          <!-- Start Brands -->
                          <li v-for="brand in maxi.brands" :key="brand.title">
                            <div class="tm-ratio tm-ratio-4-3">
                              <router-link class="uk-link-muted uk-text-center uk-display-block uk-padding-small uk-box-shadow-hover-large tm-media-box" :to="brand.link" :title="brand.title">
                                <figure class="tm-media-box-wrap">
                                  <img :src="brand.src" :alt="brand.title">
                                </figure>
                              </router-link>
                            </div>
                          </li>
                          <!-- End Brands -->
                        </ul>
                        <div class="uk-text-center uk-margin">
                          <router-link class="uk-link-muted uk-text-uppercase tm-link-to-all" to="/brands">
                            <span>See all brands
                            </span>
                            <span uk-icon="icon: chevron-right; ratio: .75;">
                            </span>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a >Pages
                      <span class="uk-margin-xsmall-left" uk-icon="icon: chevron-down; ratio: .75;">
                      </span>
                    </a>
                    <div class="uk-navbar-dropdown uk-margin-remove uk-padding-remove-vertical" uk-drop="pos: bottom-justify;delay-show: 125;delay-hide: 50;duration: 75;boundary: .tm-navbar-container;boundary-align: true;pos: bottom-justify;flip: x">
                      <div class="uk-container uk-container-small uk-margin-top uk-margin-bottom">
                        <ul class="uk-nav uk-nav-default uk-column-1-3">
                          <!-- Start Pages -->
                          <li v-for="page in maxi.pages" :key="page.title">
                            <router-link :to="page.link">{{page.title}}
                            </router-link>
                          </li>
                          <!-- End Pages -->
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <router-link to="/blog">Blog
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/about">About
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/contacts">Contacts
                    </router-link>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="uk-navbar-right">
              <a class="uk-navbar-toggle tm-navbar-button" href="#" uk-search-icon>
              </a>
              <div class="uk-navbar-dropdown uk-padding-small uk-margin-remove" uk-drop="mode: click;cls-drop: uk-navbar-dropdown;boundary: .tm-navbar-container;boundary-align: true;pos: bottom-justify;flip: x">
                <div class="uk-container">
                  <div class="uk-grid-small uk-flex-middle" uk-grid>
                    <div class="uk-width-expand">
                      <form class="uk-search uk-search-navbar uk-width-1-1">
                        <input class="uk-search-input" type="search" placeholder="Search…" autofocus>
                      </form>
                    </div>
                    <div class="uk-width-auto">
                      <a class="uk-navbar-dropdown-close" href="#" uk-close>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- menu befor login -->
              <div v-if="user.uid">
                <a class="uk-navbar-item uk-link-mute tm-navbar-button" uk-icon="user">
                  <span v-show=" finalAccount > 0 " class="uk-badge">{{ finalAccount }}</span>
                </a>
                
                <div class="uk-padding-small uk-margin-remove" uk-dropdown="pos: bottom-right; offset: -10; delay-hide: 200;" style="min-width: 150px;">
                  <ul class="uk-nav uk-dropdown-nav">
                    <!-- <li>
                        <a><span class="uk-text-capitalize" style="font-weight: 700; color: #ce071e;">Welcome, </span><br></a>
                    </li>
                    <li class="uk-nav-divider"></li> -->
                    <li>
                        <a href="/orders"><span uk-icon="list" class="menu"></span> Orders<span> ({{ order }})</span></a>
                    </li>
                    <li>
                        <a href="/favorites"><span uk-icon="heart" class="menu"></span> Favorites<span> ({{ this.$store.getters.totalFavorite }})</span></a>                
                    </li>
                    <li>
                        <a href="/personal"><span uk-icon="settings" class="menu"></span> Personal
                        </a>
                    </li>
                    <li>
                        <a href="/settings"><span uk-icon="cog" class="menu"></span> Settings
                        </a>
                    </li>
                    <li class="uk-nav-divider">
                    </li>
                    <li>
                      <a @click="logout" style="font-weight: 700"><span uk-icon="sign-out" class="menu"></span> Log out</a>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- menu befor login -->
              <div v-else>
                <a class="uk-navbar-item uk-link-muted tm-navbar-button" href="/signin" uk-icon="icon: sign-in; ratio: 1.1"></a>
                <div class="uk-padding-small uk-margin-remove" uk-dropdown="pos: bottom-right; offset: -10; delay-hide: 200;" style="min-width: 150px;">
                  <ul class="uk-nav uk-dropdown-nav">
                    <li>
                      <span style="font-weight: 700; color: #424242;">Please login to</span>
                      <span style="font-weight: 700; color: #ce071e;"> Start Shopping!</span>
                    </li>
                  </ul>
                </div>
              </div>
                  
              <a class="uk-navbar-item uk-link-mute tm-navbar-button" v-if="user" uk-toggle="target: #cart-offcanvas" onclick="return false">
                <span uk-icon="cart"></span>
                <span v-show="this.$store.getters.totalQuantity > 0 " class="uk-badge">{{ this.$store.getters.totalQuantity }}</span>
              </a>
              <a v-else></a>
            </div>
          </div>
        </div></header>

        <!-- menu samping pada tampilan mobile -->
        <side-menu></side-menu>
        <!-- menu cart samping kanan -->
        <livecart></livecart>
  </div>
 
</template>

<script>
import swal from 'sweetalert';
import { mapGetters, mapActions } from 'vuex';
import {fb,db} from "../firebase";

export default {
  name: "navbar",
  props: {
    msg: String
  },
  data() {
    return {
      order: '',
    }
  },
  // get value from local storage
  mounted() {
    this.getMaxi();
    if(localStorage.order) this.order = localStorage.order;
  },
  //hidden menu before login
  created () { 
    this.user = fb.auth().currentUser || false;
  },
  //logout methods
  computed: {
    ...mapGetters(["maxi"]),
    finalAccount() {
      return (parseFloat(this.$store.getters.totalFavorite) + parseFloat(this.order))
    }
  },
  methods: {
    ...mapActions(["getMaxi"]),
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
  },
  

};
</script>
