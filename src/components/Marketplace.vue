<template>
    
    <section class="uk-section uk-section-default uk-section-small">
        <div class="uk-container">
            <div uk-slider>
                <ul class="uk-slider-items uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-5@m uk-grid">
                    <!-- start ng-repeat Marketplace -->
                    <li v-for="mkt in maxi.marketplace" :key="mkt.id">
                        <div class="uk-grid-small uk-flex-center uk-flex-left@s" uk-grid>
                            <div class="mkt">
                                <a class="uk-link-muted tm-media-box" href="#" :title="mkt.title">
                                    <img v-lazy="mkt.src" :alt="mkt.title"></a>
                            </div>
                            <div class="uk-text-center uk-text-left@s uk-width-expand@s">
                                <span class="mkt-title">Maxi Komputer</span>
                                <div class="uk-text-meta">
                                    <span :class="mkt.alt"><a :href="mkt.link" target="_blank" rel="noreferrer">{{ mkt.desc }}</a></span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <!-- end ng-repeat Marketplace -->
                </ul>
                <div class="uk-slider-nav uk-dotnav uk-flex-center uk-margin-top uk-margin-right"></div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "marketplace",
  props: {
    msg: String
  },
  data() {
      return {

      }
  },
  computed: {
      ...mapGetters(["maxi"])
   },
   methods: {
       ...mapActions(["getMaxi"])
   },
   mounted() {
        this.getMaxi();
    },
 
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
