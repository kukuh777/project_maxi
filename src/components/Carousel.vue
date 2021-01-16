<template>
     <div class="Carousel">
      <!---------------------------------------- CAROUSEL ----------------------------------------->   
      <section class="carousel-margin uk-position-relative uk-visible-toggle uk-light" uk-slideshow="min-height: 100; max-height: 400;">
        <ul class="uk-slideshow-items">
          
          <li class="">
            <a>
              <figure class="uk-container carousel-size uk-height-1-1">
                  <img src="images/promo/maxi.png" alt="iPad" width="1300" height="385" uk-cover>
              </figure>
            </a>
          </li>
          <li>
            <a>
              <figure class="uk-container carousel-size uk-height-1-1">
                  <img v-lazy="maxi2" alt="iPhone" width="1300" height="385" uk-cover>
              </figure>
            </a>
          </li>
        </ul>
        
        <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slideshow-item="previous" uk-slidenav-previous></a>
        <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slideshow-item="next" uk-slidenav-next></a>
        <div class="uk-position-bottom-center uk-position-small">
          <ul class="uk-slideshow-nav uk-dotnav">
          </ul>
        </div>
      </section>
      <!---------------------------------------- CAROUSEL ----------------------------------------->
     </div>
</template>

<script>
export default {
  name: "carousel",
  props: {
    msg: String
  },
  data() {
    return {
      maxi2: 'images/promo/maxi2.png'
    }
  }
};
</script>
<style>
/* iphone 11 */
@media (max-width:896px) {
  .carousel-size img {
    width: 480px !important;
    height: 150px !important;
  }
  .carousel-margin {
    margin-top: -40px !important;
    margin-bottom: -60px !important;
  }
}
</style>
