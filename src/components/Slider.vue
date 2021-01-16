<template>
  <div class="slider">
    <div class="popular-brands">
       <section class="uk-section uk-section-default uk-section-small">
        <div class="uk-container">
            <!-- <h2 class="uk-text-center">Categories</h2> -->
            <div class="uk-margin-medium-top" uk-slider="finite: true">
                <div class="uk-position-relative">
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                        <div class="uk-visible@m">
                            <a href="#" uk-slidenav-previous uk-slider-item="previous"></a>
                        </div>
                        <div class="uk-width-expand uk-slider-container">
                            <ul class="uk-slider-items uk-child-width-1-3 uk-child-width-1-6@s uk-grid uk-grid-large">
                                <!-- start ng repeat Brands -->
                                <li v-for="category in categories" :key="category.title"> 
                                    <div>
                                        <a class="uk-link-mute uk-text-center uk-box-shadow-hover-large" :href="category.link">
                                        <div class="tm-ratio tm-ratio-4-3">
                                            <div class="tm-media-box">
                                            <figure class="tm-media-box-wrap">
                                                <img class="item-brand" :src="category.images" :alt="category.title">
                                            </figure>
                                            </div>
                                        </div>
                                        <div class="uk-margin-small-top">
                                            <div class="uk-text-truncate uk-text-capitalize">{{category.title}}
                                            </div>
                                            <div class="uk-text-meta uk-text-xsmall uk-text-truncate">from {{ category.price | currency('Rp ', 0, { thousandsSeparator: '.' }) }}
                                            </div>
                                        </div>
                                        </a>
                                    </div>
                                </li>
                                <!-- end ng repeat Brands -->
                            </ul>
                        </div>
                        
                        <div class="uk-visible@m">
                            <a href="#" uk-slider-item="next" uk-slidenav-next></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="uk-margin uk-text-center">
                <a class="uk-link-mute uk-text-uppercase tm-link-to-all" href="/brands"><span>see all Categories</span><span uk-icon="icon: chevron-right; ratio: .75;"></span></a>
            </div>
        </div>
      </section>
     </div>
  </div>
</template>

<script>
import {fb,db} from '../firebase'

export default {
  name: "slider",
  props: {
    msg: String
  },
  data () {
      return {
          key:'',
          category: {},
          categories: [],
          ref: fb.firestore().collection('categories').orderBy('title','asc'),
      }
  },
  created () {
    this.ref.onSnapshot((querySnapshot) => {
      this.categories = [];
      querySnapshot.forEach((doc) => {
        this.categories.push({
          key: doc.id,
          title: doc.data().title,
          price: doc.data().price,
          images: doc.data().images,
          link: doc.data().link,
        });
      });
    });
  },
};



    
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
