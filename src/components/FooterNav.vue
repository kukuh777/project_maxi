<template>
     <footer>
        <section class="uk-section uk-section-secondary uk-section-small uk-light">
        <div class="uk-container">
            <div class="uk-grid-medium uk-child-width-1-1 uk-child-width-1-4@m" uk-grid>
            <div>
                <a class="uk-logo" href="/">
                <img src="images/logo-inverse.svg" width="90" height="32" alt="Logo">
                </a>
                <p class="uk-text-small">{{ maxi.descriptions }}</p>
                <ul class="uk-iconnav">
                <li>
                    <a href="#" title="Facebook" uk-icon="facebook">
                    </a>
                </li>
                <li>
                    <a href="#" title="Twitter" uk-icon="twitter">
                    </a>
                </li>
                <li>
                    <a href="#" title="YouTube" uk-icon="youtube">
                    </a>
                </li>
                <li>
                    <a href="#" title="Instagram" uk-icon="instagram">
                    </a>
                </li>
                </ul>
            </div>
            <div>
                <nav class="uk-grid-small uk-child-width-1-2" uk-grid>
                <div>
                  <ul class="uk-nav uk-nav-default">
                     <li v-for="foot1 in maxi.footer1" :key="foot1.title">
                           <a :href="foot1.link">{{ foot1.title }}</a>
                     </li>
                  </ul>
                </div>
                <div>
                  <ul class="uk-nav uk-nav-default">
                     <li v-for="foot2 in maxi.footer2" :key="foot2.title">
                        <a :href="foot2.link">{{ foot2.title }}</a>
                     </li>
                  </ul>
                </div>
                </nav>
            </div>
            <div>
                <ul class="uk-list uk-text-small">
                <li>
                    <a class="uk-link-muted" href="#">
                    <span class="uk-margin-small-right" uk-icon="receiver">
                    </span>
                    <span class="tm-pseudo">{{ maxi.call }}
                    </span>
                    </a>
                </li>
                <li>
                    <a class="uk-link-muted" href="#">
                    <span class="uk-margin-small-right" uk-icon="mail">
                    </span>
                    <span class="tm-pseudo">{{ maxi.email }}
                    </span>
                    </a>
                </li>
                <li>
                    <div class="uk-text-muted">
                    <span class="uk-margin-small-right" uk-icon="location">
                    </span>
                    <span>{{ maxi.address1 }}
                    </span>
                    </div>
                </li>
                <li>
                    <div class="uk-text-muted">
                    <span class="uk-margin-small-right" uk-icon="clock">
                    </span>
                    <span>{{ maxi.time }}
                    </span>
                    </div>
                </li>
                </ul>
            </div>
            <div>
                <form class="uk-form-stacked">
                <label>
                    <div class="uk-form-label uk-text-muted">Subscribe for updates
                    </div>
                    <div class="uk-inline uk-width-1-1">
                    <a class="uk-form-icon uk-form-icon-flip" href="#" uk-icon="mail">
                    </a>
                    <input class="uk-input" type="email" placeholder="Your email" required>
                    </div>
                </label>
                </form>
                <div class="uk-margin uk-text-small uk-text-muted">{{ maxi.tagline }}
                </div>
            </div>
            </div>
        </div>
        </section>
    </footer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "footernav",
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

